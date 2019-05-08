import Subscribable from "./../Subscribable";

class Beacon extends Subscribable {
	constructor(state = {}) {
		super(state);

		this._handlers = {};
	}
    
    Attach(event, callback) {
        this._handlers[event] = callback;

        return this;
    }
    Detach(event) {
        delete this._handlers[event];

        return this;
    }

    SubscribeTo(...args) {
        for(let i in args) {
            let subscribable = args[i];

            subscribable.Subscribe(this);
        }
    }
    UnsubscribeTo(...args) {
        for(let i in args) {
            let subscribable = args[i];

            subscribable.Unsubscribe(this);
        }
    }
    
	next(payload) {
        try {
            this._handlers[ payload.type ](payload);
        } catch(e) {
            console.warn(`Nothing attached to "${ payload.type }"`);
        }

		return payload;
	}
}

export default Beacon;