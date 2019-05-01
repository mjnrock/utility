import Quantum from "./Quantum";

class QInt extends Quantum {
    constructor(data, key = null) {
        super(Quantum.EnumType.INTEGER, data, { key });
    }

    static Test(value) {
        return (!isNaN(parseFloat(value)) && isFinite(value)) || typeof value === "number";
    }

    SetData(value) {
        if(QInt.Test(value)) {
            super.SetData.call(this, value);
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.INTEGER);
    }
}

export default QInt;