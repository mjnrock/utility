import Quantum from "./Quantum";

class QArray extends Quantum {
    constructor(value, key = null) {
        super(Quantum.EnumType.ARRAY, value, { key });
    }

    static Test(value) {
        return Array.isArray(value);
    }

    SetValue(value) {
        if(QArray.Test(value)) {
            super.SetValue.call(this, value);
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.ARRAY);
    }
}

export default QArray;