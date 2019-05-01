import Quantum from "./Quantum";

class QCollection extends Quantum {
    constructor(data, key = null) {
        super(Quantum.EnumType.COLLECTION, data, { key });
    }

    static Test(value) {
        return value instanceof QCollection || (value.type && value.type === Quantum.EnumType.COLLECTION);
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