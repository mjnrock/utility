import Metabolite from "./Metabolite";

class BetaMetabolite extends Metabolite {
    constructor(key, fn, ...defaultArgs) {
        super(Metabolite.EnumType.BETA, key, {
            callback: fn,
            args: defaultArgs
        });
    }
    
    Activate(cell) {
        return super.Activate.call(this, cell, () => {
            cell.Learn(this.State.key, this.State.data.callback, ...this.State.data.args);

            return this;
        });
    }
}

export default BetaMetabolite;