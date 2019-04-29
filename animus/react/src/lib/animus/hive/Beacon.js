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
        console.log(payload);
    }

    //TODO Make this work for new version (De/Attach alter default event handlers/routers)
	// next(caller, obj) {
    //     try {
    //         this._registry[ obj.type ](obj);
    //     } catch(e) {
    //         console.warn(`Nothing attached to "${ obj.type }"`);
    //     }

	// 	return obj;
	// }
}

export default Beacon;