import Enzyme from "./Enzyme";

class MuEnzyme extends Enzyme {
    constructor(eventName, payload) {
        super(Enzyme.EnumType.MU, eventName, payload);
    }
    
    Activate(cell) {
        return super.Activate.call(this, cell, () => {
            cell.Invoke(this._state.key, this._state.data);

            return this;
        });
    }
}

export default MuEnzyme;