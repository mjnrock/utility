
import { cloneDeep } from "lodash";

import Cellular from "./package";
import Subscribable from "./../Subscribable";

class Cell extends Subscribable {
    constructor(state = {}) {
        super(state);

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

    Metabolize(...metabolites) {
        this.Invoke(Cell.EnumEventType.BEGIN, metabolites);
        
        let output = [];
        for(let i in metabolites) {
            let metabolite = metabolites[i];
            
            if(metabolite instanceof Cellular.Metabolite && metabolite._status === true) {                
                let result = metabolite.Activate(this);

                output.push([ metabolite.State.type, result ]);

                this.Invoke(Cell.EnumEventType.PROCESS, {
                    metabolite,
                    result
                });
            }
        }

        this.Invoke(Cell.EnumEventType.END, {
            metabolites,
            output
        });

        return metabolites;
    }
}

// Cell.EnumEventType = Object.freeze({
//     ACTION: NewUUID(),
//     BEGIN: NewUUID(),
//     PROCESS: NewUUID(),
//     END: NewUUID()
// });

Cell.EnumEventType = Object.freeze({
    ACTION: "ACTION",
    BEGIN: "BEGIN",
    PROCESS: "PROCESS",
    END: "END"
});

export default Cell;