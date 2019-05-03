import Quantum from "./Quantum";
import QString from "./QString";

class QObject extends Quantum {
    constructor(value, key = null) {
        super(Quantum.EnumType.OBJECT, value, { key });
    }

    static Test(value) {
        return typeof value === "object";
    }

    SetValue(value) {
        if(QObject.Test(value)) {
            super.SetValue.call(this, value);
        } else if(QString.Test(value)) {
            try {
                super.SetValue.call(this, JSON.parse(value));
            } catch(e) {
                console.warn(e);
            }
        }

        return this;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.OBJECT);
    }
}

export default QObject;