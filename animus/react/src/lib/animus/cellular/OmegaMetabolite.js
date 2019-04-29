import Metabolite from "./Metabolite";

class OmegaMetabolite extends Metabolite {
    constructor(key) {
        super(Metabolite.EnumType.OMEGA, key);
    }
    
    Activate(cell) {
        return super.Activate.call(this, cell, () => {
            this.SetData(cell.Behaviors[ this.State.key ]);

            return this.GetData();
        });
    }
}

export default OmegaMetabolite;