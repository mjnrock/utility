import Quantum from "./Quantum";

class QInt extends Quantum {
    constructor(value, key = null) {
        super(Quantum.EnumType.INTEGER, value, { key });
    }

    static Test(value) {
        return (!isNaN(parseFloat(value)) && isFinite(value)) || typeof value === "number";
    }

    SetValue(value) {
        if(QInt.Test(value)) {
            super.SetValue.call(this, value);
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.INTEGER);
    }
}

export default QInt;