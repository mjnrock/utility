import Subscribable from "./../Subscribable";

class Beacon extends Subscribable {
	constructor(state = {}) {
		super(state);

		this.Registry = {};
	}
    
    Attach(_enum, callback) {
        this.Registry[_enum] = callback;

        return this;
    }
    Detach(_enum) {
        delete this.Registry[_enum];

        return this;
    }

	next(caller, obj) {
        try {
            this.Registry[obj.type](obj);
        } catch(e) {
            console.warn(`Nothing attached to "${ obj.type }"`);
        }

		return obj;
	}
}

export default Beacon;