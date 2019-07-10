import Quantum from "./Quantum";

class QArray extends Quantum {
    constructor(key, value) {
        if(arguments.length === 1) {
            super(Quantum.EnumType.ARRAY, { value: key });
            
            this.SetValue(key);
        } else {
            super(Quantum.EnumType.ARRAY, { value,  key });

            this.SetValue(value);
        }
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