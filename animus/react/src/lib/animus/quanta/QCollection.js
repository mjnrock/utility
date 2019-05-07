import Quantum from "./Quantum";
import QNumeric from "./QNumeric";
import QString from "./QString";

class QCollection extends Quantum {
    constructor(key = null, ...children) {
        super(Quantum.EnumType.COLLECTION, { value: {}, key });

        this.Add(children);
    }

    static Test(value) {
        return value instanceof QCollection || (value.type && value.type === Quantum.EnumType.COLLECTION);
    }

    MakeTyped(type) {
        if(QNumeric.Test(type)) {
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

    Add(...quanta) {
        quanta.forEach((quantum, i) => {
            if(quantum instanceof Quantum) {
                this._value[ quantum.GetID() ] = quantum;
            }
        });

        return this;
    }
    Remove(...quanta) {
        quanta.forEach((quantum, i) => {
            if(quantum instanceof Quantum) {
                delete this._value[ quantum.GetID() ];
            } else if(QString.Test(quantum)) {
                if(quantum.match(/\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/gi)) {
                    delete this._value[ quantum ];
                }
            }
        });

        return this;
    }
    Find(value, searchType = Quantum.EnumAttributeType.KEY) {
        for(let i in this._value) {
            let tag = this._value[i];

            switch(searchType) {
                case Quantum.EnumAttributeType.KEY:
                    if(tag.GetKey() === value) {
                        return tag;
                    }
                    break;
                case Quantum.EnumAttributeType.ID:
                    if(tag.GetID() === value) {
                        return tag;
                    }
                    break;
                default:
                    break;
            }
        }
        
        return false;
    }
    Has(value, searchType = Quantum.EnumAttributeType.KEY) {
        return this.Find(value, searchType) instanceof Quantum ? true : false;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.COLLECTION);
    }
}

export default QCollection;