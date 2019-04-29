import Subscribable from "./../hive/Subscribable";
import { NewUUID } from "./../../utility/Helper";

class Organelle extends Subscribable {
    constructor(type, ...callbacks) {
        super();

        if(typeof type === "function") {
            this.Type = Organelle.EnumProcessType.FLOW;
            this.Sequence = [ type, ...callbacks ];
        } else {
            this.Type = type || Organelle.EnumProcessType.FLOW;
            this.Sequence = callbacks;
        }
    }

    PackageMetabolite(_in, _out, _i) {
        return {
            in: _in,
            out: _out,
            i: _i
        };
    }

    Metabolize(payload) {
		this.Invoke(Organelle.EnumEventType.BEGIN, payload);
        
        let output = [];
        for(let i in this.Sequence) {
            i = +i;
            let step = this.Sequence[i],
                result;
            
            if(typeof step === "function") {
                if(this.Type === Organelle.EnumProcessType.FEED) {
                    if(i === 0) {
                        result = step(payload);
                        output.push(this.PackageMetabolite(payload, result, i));   
                    } else {
                        let val = output[i - 1].out,
                            result = step(val);
                        output.push(this.PackageMetabolite(val, result, i));   
                    }
                } else if(this.Type === Organelle.EnumProcessType.FLOW) {
                    result = step(payload);
                    output.push(this.PackageMetabolite(payload, result, i));   
                }
            } else {
                console.warn("[Operation Aborted]: Sequence contains a non-function");
            }

            
            this.Invoke(Organelle.EnumEventType.PROCESS, result);
        }

		this.Invoke(Organelle.EnumEventType.END, output);

        return output;
    }

    next(payload) {
        this.Metabolize(payload);
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