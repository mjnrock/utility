import Quantum from "../Quantum";
import QString from "../QString";

class QJSON extends QString {
    constructor(key, value) {
        super(key, value);

        this.SetVariant(Quantum.EnumVariantType.JSON);
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetVariant(Quantum.EnumVariantType.JSON);
    }
}

export default QJSON;