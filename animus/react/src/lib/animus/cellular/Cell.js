
import { cloneDeep } from "lodash";

import Cellular from "./package";
import Subscribable from "./../Subscribable";

class Cell extends Subscribable {
    constructor(state = {}, organelles = []) {
        super(state);

        this._organelles = Object.freeze(organelles);
        this._actions = {};
        this.ƒ = (() => new Proxy(this, {        // ALT+159 = ƒ
            get: function(cell, prop) {
                if(prop in cell) {        
                    return cell[ prop ];
                }
                
                if(prop === "_target") {
                    return cell;
                }
        
                return (...args) => {
                    if(cell._actions[ prop ]) {
                        let ret;

                        if(args.length > 0) {
                            ret = cell._actions[ prop ].callback(...args);
                        } else {
                            ret = cell._actions[ prop ].callback(...cell._actions[ prop ].args);
                        }

                        cell.Invoke(Cell.EnumEventType.ACTION, {
                            action: prop,
                            result: ret
                        });

                        return ret;
                    }
                }
            }
        }))();
    }

    Endogenize(...organelles) {
        let arr = [
            ...this._organelles
        ];

        for(let i in organelles) {
            let organelle = organelles[i];

            arr.push(organelle);
        }

        this._organelles = Object.freeze(arr);

        return this;
    }

    Learn(key, fn, ...defaultArgs) {
        this._actions[key] = Object.freeze({
            key: key,
            callback: fn,
            args: defaultArgs
        });

        return this;
    }
    Unlearn(key) {
        delete this._actions[key];

        return this;
    }
    
    Teach(key, student, pbr = false) {
        if(pbr) {
            student._actions[key] = this._actions[key];
        } else {
            student._actions[key] = cloneDeep(this._actions[key]);
        }

        return this;
    }

	Perform(key, ...args) {
		if(args.length >= 0) {
			return this._actions[key].callback(this, ...args);
        }
        
        return this._actions[key].callback(this, ...this._actions[key].args);            
	}

    Metabolize(...enzymes) {
        this.Invoke(Cell.EnumEventType.BEGIN, enzymes);
        
        let output = [];
        for(let i in enzymes) {
            let enzyme = enzymes[i];
            
            if(enzyme instanceof Cellular.Enzyme && enzyme._status === true) {                
                let result = enzyme.Activate(this);

                output.push([ enzyme.State.type, result ]);

                this.Invoke(Cell.EnumEventType.PROCESS, {
                    enzyme,
                    result
                });
            }
        }

        this.Invoke(Cell.EnumEventType.END, {
            enzymes,
            output
        });

        return enzymes;
    }

    Mitosis(qty = 1) {
        //TODO Make a @qty copies
    }
}

Cell.EnumEventType = Object.freeze({
    ACTION: "invocation-action",

    BEGIN: "metabolism-begin",
    PROCESS: "metabolism-process",
    END: "metabolism-end"
});

export default Cell;