import Quantum from "./Quantum";
import QNumeric from "./QNumeric";
import QString from "./QString";
import Error from "./../error/package";;

class QCollection extends Quantum {
    constructor(key = null, ...children) {
        super(Quantum.EnumType.COLLECTION, { value: {}, key });

        this.Add(children);
    }

    static Test(value) {
        return value instanceof QCollection || (value.type && value.type === Quantum.EnumType.COLLECTION);
    }

    GetContentType() {
        return this._meta._contentType;
    }
    
    IsTyped() {
        return this._meta._contentType !== null && this._meta._contentType !== void 0;
    }
    MakeTyped(type) {
        if(QNumeric.Test(type)) {
            this._meta._contentType = type;

            return this;
        }

        new Error.InvalidEnumeratorError().Warn();

        return this;
    }
    MakeUntyped() {
        delete this._meta._contentType;

        return this;
    }

    Add(...quanta) {
        quanta.forEach((quantum, i) => {
            if(quantum instanceof Quantum) {
                if(this.IsTyped()) {
                    if(quantum.GetType() === this.GetContentType()) {
                        this._value[ quantum.GetId() ] = quantum;
                    } else {
                        new Error.ContentTypeError(this.GetContentType(), quantum.GetType()).Warn();
                    }
                } else {
                    this._value[ quantum.GetId() ] = quantum;
                }
            }
        });

        return this;
    }
    Remove(...quanta) {
        quanta.forEach((quantum, i) => {
            if(quantum instanceof Quantum) {
                delete this._value[ quantum.GetId() ];
            } else if(QString.Test(quantum)) {
                if(quantum.match(/^[0-9A-F]{8}-[0-9A-F]{4}-[\d]{1}[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)) {
                    delete this._value[ quantum ];
                }
            }
        });

        return this;
    }
    Find(value, searchType = Quantum.EnumAttributeType.KEY) {
        for(let i in this._value) {
            try {
                let tag = this._value[i],
                    key = Quantum.ReverseEnum("AttributeType", searchType).toLowerCase();
                    key = key.charAt(0).toUpperCase() + key.slice(1);   // Evaluates to "Key, "Id", "Data", "Meta", etc.

                if(tag[ `Get${ key }` ]() === value) {
                    return tag;
                }
            } catch(e) {
                console.warn(`[Operation Aborted]: Invalid @searchType(${ searchType })`);
            }
        }
        
        return false;
    }
    Has(value, searchType = Quantum.EnumAttributeType.KEY) {
        return this.Find(value, searchType) instanceof Quantum ? true : false;
    }
    Size() {
        return Object.keys(this._value).length;
    }

    Deserialize(json) {
        super.Deserialize.call(this, json);

        this.SetType(Quantum.EnumType.COLLECTION);
    }
}

export default QCollection;