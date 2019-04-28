import Subscribable from "./Subscribable";
import { NewUUID } from "../utility/Helper";
import { cloneDeep } from "lodash";

import Enzyme from "./Enzyme";
import OmegaEnzyme from "./OmegaEnzyme";
import BetaEnzyme from "./BetaEnzyme";
import GammaEnzyme from "./GammaEnzyme";

class Cell extends Subscribable {
    constructor(state = {}) {
        super(state);

        this.Behaviors = {};

        return new Proxy(this, {
            get: function(cell, prop) {
                if(prop in cell) {        
                    return cell[prop];
                }
        
                return (...args) => {
                    let lookup = prop.replace("ƒ", "");     // ALT+159 = ƒ
                    if(cell.Behaviors[lookup]) {
                        if(args.length > 1) {
                            return cell.Behaviors[lookup].callback(...args);
                        }

                        return cell.Behaviors[lookup].callback(...cell.Behaviors[lookup].args);
                    }
                }
            }
        });
    }

    Learn(key, fn, ...defaultArgs) {
        this.Behaviors[key] = Object.freeze({
            key: key,
            callback: fn,
            args: defaultArgs
        });

        return this;
    }
    Unlearn(key) {
        delete this.Behaviors[key];

        return this;
    }
    
    Teach(key, student, pbr = false) {
        if(pbr) {
            student.Behaviors[key] = this.Behaviors[key];
        } else {
            student.Behaviors[key] = cloneDeep(this.Behaviors[key]);
        }

        return this;
    }

	Perform(key, ...args) {
		if(args.length >= 0) {
			return this.Behaviors[key].callback(this, ...args);
        }
        
        return this.Behaviors[key].callback(this, ...this.Behaviors[key].args);            
	}

    //TODO Invoke events here
    Metabolize(...enzymes) {
        this.Invoke(Cell.EnumEventType.BEGIN, enzymes);
        
        for(let i in enzymes) {
            let enzyme = enzymes[i];
            
            if(enzyme instanceof Enzyme) {
                let result = enzyme.Activate(this);

                // if(enzyme instanceof OmegaEnzyme || enzyme.Type === Enzyme.EnumType.OMEGA) {
                //     //  TODO
                // } else if(enzyme instanceof BetaEnzyme || enzyme.Type === Enzyme.EnumType.BETA) {
                //     //  TODO
                // } else if(enzyme instanceof GammaEnzyme || enzyme.Type === Enzyme.EnumType.GAMMA) {
                //     //  TODO
                // }
                
                this.Invoke(Cell.EnumEventType.PROCESS, result);
            }
        }

        this.Invoke(Cell.EnumEventType.END, this);
    }
}

Cell.EnumEventType = Object.freeze({
    BEGIN: NewUUID(),
    PROCESS: NewUUID(),
    END: NewUUID()
});

export default Cell;