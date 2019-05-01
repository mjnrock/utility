import Enzyme from "./Enzyme";
import Organelle from "./Organelle";

class ZetaEnzyme extends Enzyme {
    constructor(flag, ...args) {
        super(Enzyme.EnumType.ZETA, flag, args);
    }

    Activate(cell) {
        return super.Activate.call(this, cell, () => {
            cell._organelles.forEach(org => {
                if(org instanceof Organelle) {
                    org.Metabolize(
                        Organelle.Conform(
                            this.State.key,
                            this,
                            cell,
                            this.State.data
                        )
                    );
                }
            });

            return this;
        });
    }
}

export default ZetaEnzyme;