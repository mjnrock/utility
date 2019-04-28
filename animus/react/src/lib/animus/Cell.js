import Subscribable from "./Subscribable";
import { NewUUID } from "../utility/Helper";
import { cloneDeep } from "lodash";

class Cell extends Subscribable {
    constructor(state = {}) {
        super(state);

        this.Organelles = {};
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

    Metabolize(...enzymes) {

    }
}

export default Cell;