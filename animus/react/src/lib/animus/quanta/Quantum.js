import { NewUUID } from "./../utility/Helper";

class Quantum {
    constructor(type, { value = void 0,  key = null, uuid = NewUUID(), timestamp = Date.now(), ordinality = null } = {}) {
        this._type = type;
        this._value = value;
        this._meta = {
            _id: uuid,
            _key: key,
            _origin: timestamp,
            _ordinality: ordinality
        };
    }

	GetSchema(id = 1, pid = 0, depth = "") {
		return `${ depth }${ id }.${ pid }.${this.Type}`;
	}

    GetType() {
        return this._type;
    }
    SetType(type) {
        this._type = type;

        return this;
    }

    GetValue() {
        return this._value;
    }
    SetValue(value) {
        this._value = value;

        return this;
    }
    async FetchValue(url) {
        return await fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                while(typeof data === "string" || data instanceof String) {
                    data = JSON.parse(data);
                }

                this.SetValue(data);

                return this;
            })
            .catch((e) => console.warn(e));
    }

    GetMeta() {
        return this._meta;
    }
    SetMeta(meta) {
        this._meta = meta;

        return this;
    }

    GetId() {
        return this._meta._id;
    }
    SetId(id) {
        this._meta._id = id;

        return this;
    }

    GetKey() {
        return this._meta._key;
    }
    SetKey(key) {
        this._meta._key = key;

        return this;
    }

    GetOrigin() {
        return this._meta._origin;
    }
    SetOrigin(origin) {
        this._meta._origin = origin;

        return this;
    }

    GetOrdinality() {
        return this._meta._ordinality;
    }
    SetOrdinality(ordinality) {
        this._meta._ordinality = ordinality;

        return this;
    }

    Serialize() {
        return JSON.stringify(this);
    }
    Deserialize(json) {
        let q = Quantum.Deserialize(json);

        this.SetType(q.GetType());
        this.SetValue(q.GetValue());
        this.SetId(q.GetId());
        this.SetKey(q.GetKey());
        this.SetOrigin(q.GetOrigin());
        this.SetOrdinality(q.GetOrdinality());
    }

    static Deserialize(json) {
        while(typeof json === "string" || json instanceof String) {
            json = JSON.parse(json);
        }

        let q = new Quantum(
            json._type,
            json._value,
            ...json._meta
        );

        return q;
    }
}

Quantum.EnumType = Object.freeze({
    BOOLEAN: 1,
    INTEGER: 2,
    STRING: 3,
    ARRAY: 4,
    OBJECT: 5,
    FUNCTION: 6,
    COLLECTION: 7
});

Quantum.EnumAttributeType = Object.freeze({
    TYPE: 1,
    VALUE: 2,
    META: 3,
    ID: 4,
    KEY: 5,
    ORIGIN: 6,
    ORDINALITY: 7
});

Quantum.ReverseEnum = (_enum, value) => {
    _enum = _enum.replace(/enum/gi, "");
    
    if(_enum.toLowerCase() === "type") {
        let iter = Object.entries(Quantum.EnumType);

        for(let i in iter) {
            if(value === iter[i][1]) {
                return iter[i][0];
            }
        }
    } else if(_enum.toLowerCase() === "attributetype") {
        let iter = Object.entries(Quantum.EnumAttributeType);

        for(let i in iter) {
            if(value === iter[i][1]) {
                return iter[i][0];
            }
        }
    }

    return false;
}

export default Quantum;