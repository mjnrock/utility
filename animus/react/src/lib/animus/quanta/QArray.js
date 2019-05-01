import Quantum from "./Quantum";

class QArray extends Quantum {
    constructor(data, key = null) {
        super(Quantum.EnumType.ARRAY, data, { key });
    }

    static Test(value) {
        return Array.isArray(value);
    }

    SetData(value) {
        if(QArray.Test(value)) {
            super.SetData.call(this, value);
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.ARRAY);
    }
}

export default QArray;