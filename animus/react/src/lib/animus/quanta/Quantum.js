import { NewUUID } from "./../utility/Helper";

class Quantum {
    constructor(type, data, { key = null, uuid = NewUUID(), timestamp = Date.now() } = {}) {
        this._type = type;
        this._data = data;
        this._meta = {
            _id: uuid,
            _key: key,
            _origin: timestamp
        };
    }

    GetType() {
        return this._type;
    }
    SetType(type) {
        this._type = type;

        return this;
    }

    GetData() {
        return this._data;
    }
    SetData(data) {
        this._data = data;

        return this;
    }
    async FetchData(url) {
        return await fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                while(typeof data === "string" || data instanceof String) {
                    data = JSON.parse(data);
                }

                this.SetData(data);

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

    GetID() {
        return this._meta._id;
    }
    SetID(id) {
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

    Serialize() {
        return JSON.stringify(this);
    }
    Deserialize(json) {
        let q = Quantum.Deserialize(json);

        this.SetType(q.GetType());
        this.SetData(q.GetData());
        this.SetID(q.GetID());
        this.SetKey(q.GetKey());
        this.SetOrigin(q.GetOrigin());
    }

    static Deserialize(json) {
        while(typeof json === "string" || json instanceof String) {
            json = JSON.parse(json);
        }

        let q = new Quantum(
            json._type,
            json._data,
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
    DATA: 2,
    META: 3,
    ID: 4,
    KEY: 5,
    ORIGIN: 6
});

export default Quantum;