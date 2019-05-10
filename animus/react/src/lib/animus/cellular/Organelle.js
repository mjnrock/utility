import Subscribable from "./../Subscribable";
import Metabolite from "./Metabolite";

//! ZetaEnzyme gets a @flag from this.Conform, thus this.Sequence callback should activate (or not) from @flag (cf. Redux)

class Organelle extends Subscribable {
    constructor(processType, ...callbacks) {
        super();

        if(typeof processType === "function") {
            this.Type = Organelle.EnumProcessType.FLOW;
            this.Sequence = [ processType, ...callbacks ];
        } else {
            this.Type = processType || Organelle.EnumProcessType.FLOW;
            this.Sequence = callbacks;
        }
    }

    Metabolize(payload) {
		this.Invoke(Organelle.EnumEventType.BEGIN, payload);
        
        let output = [];
        for(let i in this.Sequence) {
            i = +i;
            let step = this.Sequence[i],
                metabolite;
            
            if(typeof step === "function") {
                if(this.Type === Organelle.EnumProcessType.FEED && i > 0) {
                    let val = output[i - 1].GetOut();
                    
                    metabolite = Metabolite.Make(val, step(val), i);
                } else {
                    metabolite = Metabolite.Make(payload, step(payload), i);
                }

                output.push(metabolite);   
            } else {
                console.warn("[Operation Aborted]: Sequence contains a non-function");
            }
            
            this.Invoke(Organelle.EnumEventType.PROCESS, metabolite);
        }

		this.Invoke(Organelle.EnumEventType.END, output);

        return output;
    }

    next(payload) {
        return this.Metabolize(payload);
    }

    static Conform(flag, enzyme, cell, args) {
        return {
            flag,
            enzyme,
            cell,
            args
        };
    }
}

Organelle.EnumProcessType = Object.freeze({
    FLOW: "process-flow",    // Perform each this.Sequence[i] by passing "payload"
    FEED: "process-feed"     // Perform each this.Sequence[i] by passing results of "...this.Sequence[i - 1]"
});

Organelle.EnumEventType = Object.freeze({
    BEGIN: "metabolism-begin",
    PROCESS: "metabolism-process",
    END: "metabolism-end"
});

export default Organelle;