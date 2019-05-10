import Subscribable from "./../Subscribable";
import Beacon from "./Beacon";
import Cell from "../cellular/Cell";
import RegEx from "../utility/RegEx";

class Oracle extends Subscribable {
    constructor(state = {}, organelles = []) {
        super(state);

        this._beacon = new Beacon();
        this._beacon.Subscribe(this);

        this._organelles = Object.freeze(organelles);
        this._cells = {};

        this.ß = (...args) => {
            if(args.length === 2) {
                this._beacon.Attach(args[0], args[1]);
            } else if(args.length === 1) {
                this._beacon.Detach(args[0]);
            }
            
            return this.GetBeacon();
        };
    }

    GetBeacon() {
        return this._beacon;
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

    Register(cell) {
        if(cell instanceof Cell) {
            this._cells[ cell._id ] = cell;
            cell.Subscribe(this._beacon);
        }

        return this;
    }
    Unregister(cell) {
        if(cell instanceof Cell) {
            cell.Unubscribe(this._beacon);
            delete this._cells[ cell._id ];
        } else if((cell instanceof String || typeof cell === "string") && RegEx.UUID(cell)) {
            this._cells[ cell ].Unubscribe(this._beacon);
            delete this._cells[ cell ];
        }

        return this;
    }
    Spawn() {
        let cell = new Cell();
        this.Register(cell);

        return cell;
    }

    next(...args) {
        // console.log(...args);
    }
}

export default Oracle;