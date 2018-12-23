class MessageManager {
	constructor(msgs) {
		this.Messages = msgs || [];
	}

	Size() {
		return this.Messages.length;
	}
	GetMessages() {
		return this.Messages;
	}
	SetMessages(msgs) {
		this.Messages = msgs;

		return this;
	}

	Receive(msg) {
		//TODO
	}

	Enqueue(msg) {
		this.Messages.push(msg);

		return this;
	}
	Dequeue() {
		if(this.Messages.length > 0) {
			return this.Messages.splice(0, 1)[0];
		}

		return false;
	}

	Dispatch(msg) {
		//TODO

		return false;
	}

	OnTick(time) {
		let start = Date.now(),
			timeout = 2000;

		while(this.Messages.length > 0 || (Date.now() - start >= timeout)) {
			this.Dispatch(this.Dequeue(), time);
		}
	}
}

export default MessageManager;