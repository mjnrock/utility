import Quantum from "./Quantum";

class QFunction extends Quantum {
    constructor(key, value) {
        if(arguments.length === 1) {
            super(Quantum.EnumType.FUNCTION, { value: key });
            
            this.SetValue(key);
        } else {
            super(Quantum.EnumType.FUNCTION, { value,  key });

            this.SetValue(value);
        }
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