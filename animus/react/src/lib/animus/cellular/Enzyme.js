import { NewUUID } from "../utility/Helper";

class Enzyme {
    constructor(type, key, data) {
        this._id = NewUUID();
        this._status = true;
        
        this.State = Object.freeze({
            type,
            key,
            data
        });
    }

    GetType() {
        return this.State.type;
    }

    GetKey() {
        return this.State.key;
    }
    SetKey(key) {
        this.SetState(key, this.GetData());
        
        return this;
    }

    GetData() {
        return this.State.data;
    }
    SetData(data) {
        this.SetState(this.GetKey(), data);
        
        return this;
    }
    
    GetState() {
        return this.State;
    }
    SetState(key, data) {
        this.State = Object.freeze({
            type: this.State.type,
            key,
            data
        });

        return this;
    }

    Activate(cell, hook) {
        if(this._status === true && typeof hook === "function") {
            let ret = hook();

            this._status = false;

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
    //     this.State = Object.freeze(json.State);

    //     return this;
    // }

    // static Generate(json) {
    //     let enz = new Enzyme();

    //     return enz.Deserialize(json);
    // }
}

// Enzyme.EnumType = Object.freeze({
//     OMEGA: NewUUID(),   // GET - Cell Behavior
//     BETA: NewUUID(),   // SET - Cell Behavior
//     GAMMA: NewUUID(),   // INVOKE - Cell Behavior
// });

Enzyme.EnumType = Object.freeze({
    OMEGA: "OMEGA",   // GET - Cell Behavior
    BETA: "BETA",   // SET - Cell Behavior
    GAMMA: "GAMMA",   // INVOKE - Cell Behavior
});

export default Enzyme;