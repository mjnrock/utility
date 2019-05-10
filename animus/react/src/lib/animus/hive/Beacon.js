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
        let handler = this._handlers[ payload.type ];

        if(handler) {
            handler(payload);
            
            this.Invoke(Beacon.EnumEventType.HANDLE, {
                handler,
                data: payload
            });
        } else {        
            this.Invoke(Beacon.EnumEventType.HANDLE_ERROR, {
                scope: this,
                message: `Nothing attached to <${ payload.type }>`
            });
        }

		return payload;
	}
}

Beacon.EnumEventType = Object.freeze({
    HANDLE: "event-handle",
    HANDLE_ERROR: "event-handle-error",
});

export default Beacon;