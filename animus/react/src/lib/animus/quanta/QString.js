import Quantum from "./Quantum";

class QString extends Quantum {
    constructor(data, key = null) {
        super(Quantum.EnumType.STRING, data, { key });
    }

    static Test(value) {
        return typeof value === "string" || value instanceof String;
    }

    SetData(value) {
        if(QString.Test(value)) {
            super.SetData.call(this, value);
        } else {
            super.SetData.call(this, JSON.stringify(value));
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.STRING);
    }
}

export default QString;