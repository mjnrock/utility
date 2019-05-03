import Quantum from "./Quantum";

class QBool extends Quantum {
    constructor(value, key = null) {
        super(Quantum.EnumType.BOOLEAN, value, { key });
    }

    static Test(value) {
        return typeof value === "boolean";
    }

    SetValue(value) {
        if(!!value) {
            super.SetValue.call(this, !!value);
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.BOOLEAN);
    }
}

export default QBool;