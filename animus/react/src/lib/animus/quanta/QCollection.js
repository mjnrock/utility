import Quantum from "./Quantum";
import QInt from "./QInt";

class QCollection extends Quantum {
    constructor(value, key = null) {
        super(Quantum.EnumType.COLLECTION, value, { key });
    }

    static Test(value) {
        return value instanceof QCollection || (value.type && value.type === Quantum.EnumType.COLLECTION);
    }

    MakeTyped(type) {
        if(QInt.Test(type)) {
            this._meta._typed = type;

            return this;
        }

        console.warn("[Operation Aborted]: Caught non-numeric enumeration as argument.");

        return this;
    }
    MakeUntyped() {
        delete this._meta._typed;

        return this;
    }

    Add(quantum) {

    }
    Remove(quantum) {

    }
    Find(value, searchType = Quantum.EnumAttributeType.KEY) {

    }
    Has(value, searchType = Quantum.EnumAttributeType.KEY) {

    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.COLLECTION);
    }
}

export default QCollection;