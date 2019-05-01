import Subscribable from "./../Subscribable";
import Beacon from "./Beacon";

class Oracle extends Subscribable {
    constructor(state = {}, organelles = {}) {
        super(state);

        this._beacon = new Beacon();
        this._beacon.Subscribe(this);

        this._organelles = Object.freeze(organelles);
    }

    
}

export default Oracle;