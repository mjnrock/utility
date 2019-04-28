import Enzyme from "./Enzyme";

class GammaEnzyme extends Enzyme {
    constructor(key, ...args) {
        super(Enzyme.EnumType.GAMMA, key, args);
    }

    Activate(cell) {
        return cell.Perform(this.State.key, ...this.State.data);
    }
}

export default GammaEnzyme;