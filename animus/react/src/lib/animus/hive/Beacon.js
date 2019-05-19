import Subscribable from "./../Subscribable";

class Beacon extends Subscribable {
	constructor(state = {}) {
		super(state);

        this._handlers = {};
	}
    
    Attach(event, callback) {
        if(!(event in this._handlers)) {
            this._handlers[event] = [];
        }

        this._handlers[event].push(callback);

        return this;
    }
    Unhandle(event) {
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
        if(payload.type in this._handlers) {
            let handlers = this._handlers[ payload.type ];

            handlers.forEach(handler => {
                handler(payload);
            
                this.Invoke(Beacon.EnumEventType.HANDLE, {
                    handlers,
                    data: payload
                });
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