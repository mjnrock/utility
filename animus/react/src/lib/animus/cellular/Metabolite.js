import { NewUUID } from "../utility/Helper";

class Metabolite {
    constructor(_in, _out, _i) {
        this._id = NewUUID();
        
        this._state = Object.freeze({
            in: _in,
            out: _out,
            i: _i
        });
    }

    GetIn() {
        return this._state.in;
    }
    GetOut() {
        return this._state.out;
    }
    GetStep() {
        return this._state.i;
    }

    GetState() {
        return this._state;
    }

    static Make(_in, _out, _i) {
        return new Metabolite(_in, _out, _i);
    }
}

export default Metabolite;