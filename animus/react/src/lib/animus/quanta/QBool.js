import Quantum from "./Quantum";

class QBool extends Quantum {
    constructor(data, key = null) {
        super(Quantum.EnumType.BOOLEAN, data, { key });
    }

    static Test(value) {
        return typeof value === "boolean";
    }

    SetData(value) {
        if(!!value) {
            super.SetData.call(this, !!value);
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.BOOLEAN);
    }
}

export default QBool;