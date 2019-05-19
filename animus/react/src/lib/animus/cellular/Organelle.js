import Subscribable from "./../Subscribable";
import Metabolite from "./Metabolite";

//! ZetaEnzyme gets a @flag from this.Conform, thus this.Sequence callback should activate (or not) from @flag (cf. Redux)

class Organelle extends Subscribable {    
    constructor(processType, ...activators) {
        super();

        if(Array.isArray(processType)) {
            this.Type = Organelle.EnumProcessType.FLOW;
            this.Sequence = [ processType, ...activators ];
        } else {
            this.Type = processType || Organelle.EnumProcessType.FLOW;
            this.Sequence = activators;
        }
    }

    Metabolize(payload) {
		this.Invoke(Organelle.EnumEventType.BEGIN, payload);
        
        let output = [];
        for(let i in this.Sequence) {
            i = +i;
            let step = this.Sequence[i],
                metabolite,
                input,
                fn;

            if(typeof step[0] === "function") {
                if(step.length === 2 && step[0](this, payload) === true) {
                    fn = step[1];
                } else if(step.length === 1) {
                    fn = step[0];
                }
            } else if(typeof step[0] === "string" || step[0] instanceof String) {
                if(step[0] === payload.GetKey()) {
                    fn = step[1];
                }
            }

            if(this.Type === Organelle.EnumProcessType.FEED && i > 0) {
                input = output[i - 1].GetOut();
            } else {
                input = payload;
            }
            
            if(typeof fn === "function") {
                metabolite = Metabolite.Make(payload, fn(input), i);

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

    static Package(...activators) {
        return new Organelle(Organelle.EnumProcessType.FLOW, activators);
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