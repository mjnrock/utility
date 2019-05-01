import Enzyme from "./Enzyme";

class OmegaEnzyme extends Enzyme {
    constructor(key) {
        super(Enzyme.EnumType.OMEGA, key);
    }
    
    Activate(cell) {
        return super.Activate.call(this, cell, () => {
            this.SetData(cell._actions[ this.State.key ]);

            return this.GetData();
        });
    }
}

export default OmegaEnzyme;