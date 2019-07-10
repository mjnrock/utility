import Quantum from "./Quantum";

class QString extends Quantum {
    constructor(key, value) {
        if(arguments.length === 1) {
            super(Quantum.EnumType.STRING, { value: key });
            
            this.SetValue(key);
        } else {
            super(Quantum.EnumType.STRING, { value,  key });

            this.SetValue(value);
        }
    }

    static Test(value) {
        return typeof value === "string" || value instanceof String;
    }

    SetValue(value) {
        if(QString.Test(value)) {
            super.SetValue.call(this, value);
        } else {
            super.SetValue.call(this, JSON.stringify(value));
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.STRING);
    }
}

export default QString;