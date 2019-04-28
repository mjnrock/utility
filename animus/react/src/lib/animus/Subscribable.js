import { Subject } from "rxjs";
import { NewUUID } from "./../utility/Helper";

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
			oldState: Object.freeze(this.State),
			state: Object.freeze(state)
		});

		this.State = Object.freeze(state);

		return this;
	}

	Invoke(type, args = {}) {
		this.Subject$.next({
			type: type,
			scope: this,
			data: args
		});

		return this;
    }

	Subscribe(subscriber) {
		if(typeof subscriber === "object") {
			this.Subject$.subscribe({
				next: (payload) => subscriber.next(payload),
				error: subscriber.error,
				complete: subscriber.complete
			});

			this.Subscriptions[ subscriber.UUID ] = subscriber;
		}

		this.Invoke(Subscribable.EnumEventType.SUBSCRIBE, {
			subscriber: subscriber
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
			unsubscriber: unsubscriber
		});

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