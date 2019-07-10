import Quantum from "./Quantum";

class QBool extends Quantum {
    constructor(key, value) {
        if(arguments.length === 1) {
            super(Quantum.EnumType.BOOLEAN, { value: key });
            
            this.SetValue(key);
        } else {
            super(Quantum.EnumType.BOOLEAN, { value,  key });

            this.SetValue(value);
        }
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