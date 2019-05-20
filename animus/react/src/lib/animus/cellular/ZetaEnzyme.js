import Enzyme from "./Enzyme";
import Organelle from "./Organelle";

class ZetaEnzyme extends Enzyme {
    constructor(flag, ...args) {
        super(Enzyme.EnumType.ZETA, flag, args);
    }

    //? Organelles can be endogenized by more than just Cells (e.g. Oracles), thus @entity is used
    Activate(entity) {
        return super.Activate.call(this, entity, () => {
            entity._organelles.forEach(org => {
                if(org instanceof Organelle) {
                    org.Metabolize(
                        Organelle.Conform(
                            this.State.key,
                            this,
                            entity,
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