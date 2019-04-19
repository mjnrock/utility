import { NewUUID } from "./utility/Helper.js";
import Subscribable from "./Subscribable.js";

class Organelle extends Subscribable {
    constructor(type, ...callbacks) {
        this.Type = type || Organelle.EnumProcessType.FEED;
        this.Sequence = callbacks;
    }

    Metabolize(payload) {
        let output = [];
        for(let i in this.Sequence) {
            i = +i;
            let step = this.Sequence[i];
            
            if(typeof step === "function") {
                if(this.Type === Organelle.EnumProcessType.FEED) {
                    if(i === 0) {
                        output.push([ payload, step(payload), i ]);    
                    } else {
                        output.push([ output[i - 1][1], step(...output[i - 1][1]), i ]);
                    }
                } else if(this.Type === Organelle.EnumProcessType.FLOW) {
                    output.push([ payload, step(payload), i ]);
                }
            } else {
                console.warn("[Operation Aborted]: Sequence contains a non-function");
            }
        }

        return output;
    }
}

Organelle.EnumProcessType = Object.freeze({
    FLOW: NewUUID(),    // Perform each this.Sequence[i] by passing "payload"
    FEED: NewUUID()     // Perform each this.Sequence[i] by passing results of "...this.Sequence[i - 1]"
});

Organelle.EnumEventType = Object.freeze({
    BEGIN: NewUUID(),
    PROCESS: NewUUID(),
    END: NewUUID()
});

export default Organelle;