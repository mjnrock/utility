import Enzyme from "./Enzyme";

class OmegaEnzyme extends Enzyme {
    constructor(key) {
        super(Enzyme.EnumType.OMEGA, key);
    }

    Activate(cell) {
        return cell.Behaviors[ this.State.key ];
    }
}

export default OmegaEnzyme;