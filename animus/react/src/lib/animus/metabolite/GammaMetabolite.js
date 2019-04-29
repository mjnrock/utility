import Metabolite from "./Metabolite";

class GammaMetabolite extends Metabolite {
    constructor(key, ...args) {
        super(Metabolite.EnumType.GAMMA, key, args);
    }

    // Activate(cell) {
    //     if(this.Status === true) {
    //         this.SetData(cell.Perform(this.State.key, ...this.State.data));

    //         return this.GetData();
    //     }
        
    //     return null;
    // }
    Activate(cell) {
        return super.Activate.call(this, cell, () => {
            this.SetData(cell.Perform(this.State.key, ...this.State.data));

            return this.GetData();
        });
    }
}

export default GammaMetabolite;