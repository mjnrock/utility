import Quantum from "./Quantum";

class QFunction extends Quantum {
    constructor(value, key = null) {
        super(Quantum.EnumType.FUNCTION, value, { key });
    }

    static Test(value) {
        return typeof value === "function";
    }

    SetValue(value) {
        if(QFunction.Test(value)) {
            super.SetValue.call(this, value);
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.FUNCTION);
    }
}

export default QFunction;