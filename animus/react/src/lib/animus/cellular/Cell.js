
import { cloneDeep } from "lodash";

import Metabolites from "./package";
import Subscribable from "./../hive/Subscribable";

class Cell extends Subscribable {
    constructor(state = {}) {
        super(state);

        this.Behaviors = {};

        // return new Proxy(this, {
        //     get: function(cell, prop) {
        //         if(prop in cell) {        
        //             return cell[prop];
        //         }
                
        //         if(prop === "_target") {
        //             return cell;
        //         }
        
        //         return (...args) => {
        //             let lookup = String(prop).replace("ƒ", "");     // ALT+159 = ƒ
        //             if(cell.Behaviors[lookup]) {
        //                 if(args.length > 1) {
        //                     return cell.Behaviors[lookup].callback(...args);
        //                 }

        //                 return cell.Behaviors[lookup].callback(...cell.Behaviors[lookup].args);
        //             }
        //         }
        //     }
        // });
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

    Metabolize(...metabolites) {
        this.Invoke(Cell.EnumEventType.BEGIN, metabolites);
        
        let output = [];
        for(let i in metabolites) {
            let metabolite = metabolites[i];
            
            if(metabolite instanceof Metabolites.Metabolite && metabolite.Status === true) {                
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
//     BEGIN: NewUUID(),
//     PROCESS: NewUUID(),
//     END: NewUUID()
// });

Cell.EnumEventType = Object.freeze({
    BEGIN: "BEGIN",
    PROCESS: "PROCESS",
    END: "END"
});

export default Cell;