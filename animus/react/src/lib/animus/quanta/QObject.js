import Quantum from "./Quantum";
import QString from "./QString";

class QObject extends Quantum {
    constructor(data, key = null) {
        super(Quantum.EnumType.OBJECT, data, { key });
    }

    static Test(value) {
        return typeof value === "object";
    }

    SetData(value) {
        if(QObject.Test(value)) {
            super.SetData.call(this, value);
        } else if(QString.Test(value)) {
            try {
                super.SetData.call(this, JSON.parse(value));
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