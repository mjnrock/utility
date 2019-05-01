import Enzyme from "./Enzyme";

class GammaEnzyme extends Enzyme {
    constructor(key, ...args) {
        super(Enzyme.EnumType.GAMMA, key, args);
    }

    Activate(cell) {
        return super.Activate.call(this, cell, () => {
            this.SetData(cell.Perform(this.State.key, ...this.State.data));

            return this.GetData();
        });
    }
}

export default GammaEnzyme;