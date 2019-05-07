import Quantum from "./Quantum";

class QNumeric extends Quantum {
    constructor(key, value) {
        if(arguments.length === 1) {
            super(Quantum.EnumType.INTEGER, { value: key });
            
            this.SetValue(key);
        } else {
            super(Quantum.EnumType.INTEGER, { value,  key });

            this.SetValue(value);
        }
    }

    static Test(value) {
        return (!isNaN(parseFloat(value)) && isFinite(value)) || typeof value === "number";
    }

    SetValue(value) {
        if(QNumeric.Test(value)) {
            super.SetValue.call(this, +value);
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.INTEGER);
    }
}

export default QNumeric;