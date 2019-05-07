import Quantum from "./Quantum";
import QString from "./QString";

class QObject extends Quantum {
    constructor(key, value) {
        if(arguments.length === 1) {
            super(Quantum.EnumType.OBJECT, { value: key });
            
            this.SetValue(key);
        } else {
            super(Quantum.EnumType.OBJECT, { value,  key });

            this.SetValue(value);
        }
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