import Quantum from "./Quantum";

class QString extends Quantum {
    constructor(value, key = null) {
        super(Quantum.EnumType.STRING, value, { key });
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