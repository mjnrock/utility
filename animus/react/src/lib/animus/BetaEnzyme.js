import Enzyme from "./Enzyme";

class BetaEnzyme extends Enzyme {
    constructor(key, fn, ...defaultArgs) {
        super(Enzyme.EnumType.BETA, key, {
            callback: fn,
            args: defaultArgs
        });
    }

    Activate(cell) {
        return cell.Learn(this.State.key, this.State.data.callback, ...this.State.data.args);
    }
}

export default BetaEnzyme;