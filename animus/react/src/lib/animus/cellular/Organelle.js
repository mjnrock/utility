import Subscribable from "./../Subscribable";
import Metabolite from "./Metabolite";

//! ZetaEnzyme gets a @flag from this.Conform, thus this._sequence callback should activate (or not) from @flag (cf. Redux)

class Organelle extends Subscribable {    
    constructor(...activators) {
        super();

        this._type = Organelle.EnumProcessType.FLOW;
        this._sequence = [];

        activators.forEach(act => {
            if(Array.isArray(act) || typeof act === "function") {
                this._sequence.push(act);
            } else if(typeof act === "string" || act instanceof String) {
                this._type = act;
            }
        });
    }

    Metabolize(payload) {
		this.Invoke(Organelle.EnumEventType.BEGIN, payload);
        
        let output = [];        
        this._sequence.forEach((step, i) => {
            let metabolite,
                input,
                fn;

            console.log("-------");
            console.log(payload, this._sequence, step);
            console.log("-------");

            if(this._type === Organelle.EnumProcessType.FEED && i > 0) {
                input = output[i - 1].GetOut();
            } else {
                input = payload;
            }

            if(typeof step === "function") {
                fn = step;
            } else if(typeof step[0] === "function") {
                if(step.length === 2) {
                    if(step[0](this, payload) === true) {
                        fn = step[1];
                    } else {
                        fn = false;
                    }
                } else if(step.length === 1) {
                    fn = step[0];
                }
            } else if(typeof step[0] === "string" || step[0] instanceof String) {
                if(step[0] === payload.flag) {
                    fn = step[1];
                } else {
                    fn = false;
                }
            }
            
            if(fn === false) {
                console.info("[Skipped Iteration]: Activation condition was not met");
            } else if(typeof fn === "function") {
                metabolite = Metabolite.Make(payload, fn(input), i);

                output.push(metabolite);
            } else {
                console.warn("[Operation Aborted]: Sequence contains a non-function");
            }
            
            this.Invoke(Organelle.EnumEventType.PROCESSED, metabolite);
        });

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

    static Make(...activators) {
        return new Organelle(...activators);
    }
}

Organelle.EnumProcessType = Object.freeze({
    FLOW: "process-flow",    // Perform each this._sequence[i] by passing "payload"
    FEED: "process-feed"     // Perform each this._sequence[i] by passing results of "...this._sequence[i - 1]"
});

Organelle.EnumEventType = Object.freeze({
    BEGIN: "metabolism-begin",
    PROCESSED: "metabolism-processed",
    END: "metabolism-end"
});

export default Organelle;