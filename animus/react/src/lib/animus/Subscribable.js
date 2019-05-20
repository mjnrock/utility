import { Subject } from "rxjs";
import { NewUUID } from "./utility/Helper";

import Quanta from "./quanta/package";

class Subscribable {
    constructor(state = {}) {
        this._id = NewUUID();
        this._subject$ = new Subject();
		this._subscriptions = {};
		this._origin = Date.now();

		// this._state = Object.freeze(state);
		this._state = new Quanta.QObject(state);
    }

	GetState() {
        if(this._state instanceof Quanta.Quantum) {
            return this._state.GetValue();
        }

		return this._state;
	}
	SetState(state) {
		this.Invoke(Subscribable.EnumEventType.UPDATE, {
			oldState: Object.freeze(this._state),
			state: Object.freeze(state)
		});

		// this._state = Object.freeze(state);
		this._state = new Quanta.QObject(state);

		return this;
	}
	MergeState(addition = {}) {
        //! This construction only works if _state is QObject.  If changed to QCollection, adjust.
        //TODO When a QCollection, add an AQT query parameter to inject where desired
		this.SetState({
            ...this.GetState(),
            ...addition
        });

		return this;
	}

	Invoke(type, args = {}) {
		this._subject$.next({
			type: type,
			scope: this,
			data: args
		});

		return this;
    }

	Subscribe(subscriber) {
		if(typeof subscriber === "object") {
			this._subject$.subscribe({
				next: (payload) => subscriber.next(payload),
				error: subscriber.error,
				complete: subscriber.complete
			});

			this._subscriptions[ subscriber._id ] = subscriber;
		}

		this.Invoke(Subscribable.EnumEventType.SUBSCRIBE, subscriber);

		return this;
	}
	Unsubscribe(unsubscriber) {
		if(typeof unsubscriber === "string" || unsubscriber instanceof String) {
			this._subscriptions[ unsubscriber ].unsubscribe();

			delete this._subscriptions[ unsubscriber ];
		} else {
			this._subscriptions[ unsubscriber._id ].unsubscribe();

			delete this._subscriptions[ unsubscriber._id ];
		}

		this.Invoke(Subscribable.EnumEventType.UNSUBSCRIBE, unsubscriber);

		return this;
    }

	next(payload) {
		return payload;
	}
	error(err) {
		return err;
	}
	complete() {
		return true;
	}
    
    static Hashify(json) {
        while(typeof json === "object") {
            json = JSON.stringify(json);
        }

        let hash = 0;

        if (json.length === 0) {
            return hash;
        }

        for (let i = 0; i < json.length; i++) {
            let char = json.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}

Subscribable.EnumEventType = Object.freeze({
    UPDATE: "state-update",
    
    SUBSCRIBE: "subscription-add",
    UNSUBSCRIBE: "subscription-remove"
});

export default Subscribable;