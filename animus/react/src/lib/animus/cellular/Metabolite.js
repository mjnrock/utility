import { NewUUID } from "../utility/Helper";

class Metabolite {
    constructor(_in, _out, _i) {
        this._id = NewUUID();
        
        this.State = Object.freeze({
            in: _in,
            out: _out,
            i: _i
        });
    }

    GetIn() {
        return this.State.in;
    }
    GetOut() {
        return this.State.out;
    }
    GetStep() {
        return this.State.i;
    }

    GetState() {
        return this.State;
    }

    static Make(_in, _out, _i) {
        return new Metabolite(_in, _out, _i);
    }
}

export default Metabolite;