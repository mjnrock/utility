import { NewUUID } from "../../utility/Helper";

class Metabolite {
    constructor(type, key, data) {
        this.UUID = NewUUID();
        this.Status = true;
        this.State = Object.freeze({
            type,
            key,
            data
        });
    }

    MakeDirty() {
        this.Status = false;

        return this;
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
        if(this.Status === true && typeof hook === "function") {
            let ret = hook();

            this.Status = false;

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

    //     this.UUID = json.UUID || NewUUID();
    //     this.State = Object.freeze(json.State);

    //     return this;
    // }

    // static Generate(json) {
    //     let enz = new Metabolite();

    //     return enz.Deserialize(json);
    // }
}

// Metabolite.EnumType = Object.freeze({
//     OMEGA: NewUUID(),   // GET - Cell Behavior
//     BETA: NewUUID(),   // SET - Cell Behavior
//     GAMMA: NewUUID(),   // INVOKE - Cell Behavior
// });

Metabolite.EnumType = Object.freeze({
    OMEGA: "OMEGA",   // GET - Cell Behavior
    BETA: "BETA",   // SET - Cell Behavior
    GAMMA: "GAMMA",   // INVOKE - Cell Behavior
});

export default Metabolite;