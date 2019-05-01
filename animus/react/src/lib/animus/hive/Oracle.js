import Subscribable from "./../Subscribable";
import Beacon from "./Beacon";

class Oracle extends Subscribable {
    constructor(state = {}, organelles = []) {
        super(state);

        this._beacon = new Beacon();
        this._beacon.Subscribe(this);

        this._organelles = Object.freeze(organelles);
    }

    Endogenize(...organelles) {
        let arr = [
            ...this._organelles
        ];

        for(let i in organelles) {
            let organelle = organelles[i];

            arr.push(organelle);
        }

        this._organelles = Object.freeze(arr);

        return this;
    }
}

export default Oracle;