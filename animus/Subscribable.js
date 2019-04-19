import { Subject } from "rxjs";
import { NewUUID } from "./utility/Helper";

class Subscribable {
    constructor(state = {}) {
        this.UUID = NewUUID();
        this.Subject$ = new Subject();
		this.Subscriptions = {};

		this.State = Object.freeze(state);
		
		this._origin = Date.now();
    }

	GetState() {
		return this.State;
	}
	SetState(state) {
		this.Invoke(Subscribable.EnumEventType.UPDATE, {
			OldState: Object.freeze(this.State),
			NewState: Object.freeze(state)
		});

		this.State = Object.freeze(state);

		return this;
	}

	Invoke(type, args = {}) {
		this.Subject$.next({
			type: type,
			caller: this,
			data: {
				...args
			}
		});

		return this;
	}

	Subscribe(subscriber) {
		if(typeof subscriber === "object") {
			this.Subject$.subscribe({
				next: (...args) => subscriber.next(subscriber, ...args),
				error: subscriber.error,
				complete: subscriber.complete
			});

			this.Subscriptions[ subscriber.UUID ] = subscriber;
		}

		this.Invoke(Subscribable.EnumEventType.SUBSCRIBE, {
			Subscriber: subscriber
		});

		return this;
	}
	Unsubscribe(unsubscriber) {
		if(typeof unsubscriber === "string" || unsubscriber instanceof String) {
			this.Subscriptions[ unsubscriber ].unsubscribe();

			delete this.Subscriptions[ unsubscriber ];
		} else {
			this.Subscriptions[ unsubscriber.UUID ].unsubscribe();

			delete this.Subscriptions[ unsubscriber.UUID ];
		}

		this.Invoke(Subscribable.EnumEventType.UNSUBSCRIBE, {
			Unsubscriber: unsubscriber
		});

		return this;
    }

	next(caller, obj) {
		return {
			caller,
			obj
		};
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

        if (json.length == 0) {
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
	UPDATE: "subscribable-onUpdate",
    SUBSCRIBE: "subscribable-onSubscribe",
    UNSUBSCRIBE: "subscribable-onUnsubscribe"
});

export default Subscribable;