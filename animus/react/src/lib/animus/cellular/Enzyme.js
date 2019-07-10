import { NewUUID } from "../utility/Helper";

class Enzyme {
    constructor(type, key, data) {
        this._id = NewUUID();
        this._status = true;
        
        this._state = Object.freeze({
            type,
            key,
            data
        });
    }

    Recycle() {
        this._status = true;

        return this;
    }
    Purge() {
        this._status = false;

        return this;
    }

    GetType() {
        return this._state.type;
    }

    GetKey() {
        return this._state.key;
    }
    SetKey(key) {
        this.SetState(key, this.GetData());
        
        return this;
    }

    GetData() {
        return this._state.data;
    }
    SetData(data) {
        this.SetState(this.GetKey(), data);
        
        return this;
    }
    
    GetState() {
        return this._state;
    }
    SetState(key, data) {
        this._state = Object.freeze({
            type: this._state.type,
            key,
            data
        });

        return this;
    }

    Activate(cell, hook) {
        if(this._status === true && typeof hook === "function") {
            let ret = hook();

            this.Purge();

            return ret !== void 0 ? ret : cell;
        }
        
        return null;
    }

    // Serialize() {
    //     return JSON.stringify(this);
    // }
    // Deserialize(json) {
    //     while(typeof json === "string" || json instanceof String) {
    //         json = JSON.parse(json);
    //     }

    //     this._id = json._id || NewUUID();
    //     this._state = Object.freeze(json._state);

    //     return this;
    // }

    // static Generate(json) {
    //     let enz = new Enzyme();

    //     return enz.Deserialize(json);
    // }
}

Enzyme.EnumType = Object.freeze({
    OMEGA: "OMEGA",   // GET - Cell Behavior
    BETA: "BETA",   // SET - Cell Behavior (cell.Learn)
    GAMMA: "GAMMA",   // INVOKE - Cell Behavior (cell.Perform)

    ZETA: "ZETA",   // INVOKE - Organelle (organelle.metabolize)

    MU: "MU"    // INVOKE - Custom Event (cell.Invoke)
});

export default Enzyme;