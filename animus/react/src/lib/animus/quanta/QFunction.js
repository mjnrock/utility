import Quantum from "./Quantum";

class QFunction extends Quantum {
    constructor(data, key = null) {
        super(Quantum.EnumType.FUNCTION, data, { key });
    }

    static Test(value) {
        return typeof value === "function";
    }

    SetData(value) {
        if(QFunction.Test(value)) {
            super.SetData.call(this, value);
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.FUNCTION);
    }
}

export default QFunction;