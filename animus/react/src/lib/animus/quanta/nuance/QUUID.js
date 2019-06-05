import Quantum from "../Quantum";
import QString from "../QString";
import RegEx from "../../utility/RegEx"

class QUUID extends QString {
    constructor(key, value) {
        super(key, value);

        this.SetVariant(Quantum.EnumVariantType.UUID);
    }

    static Test(value) {
        return RegEx.UUID(value);
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetVariant(Quantum.EnumVariantType.UUID);
    }
}

export default QUUID;