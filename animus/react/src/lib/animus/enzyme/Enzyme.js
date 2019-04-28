import { NewUUID } from "./../../utility/Helper";

class Enzyme {
    constructor(type, key, data) {
        this.UUID = NewUUID();
        this.State = Object.freeze({
            type,
            key,
            data
        });
    }

    Activate(cell) {
        return cell;
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