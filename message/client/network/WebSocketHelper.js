class WebSocketHelper {
	constructor(url = `ws://localhost:1337/ws`, events = null) {
		this.UUID = null;

		this.ws = new WebSocket(url);
		this.ws.onopen = (e) => this.OnOpen(e);
		this.ws.onmessage = (e) => this.OnMessage(e);
		this.ws.onclose = (e) => this.OnClose(e);

		if(events !== null) {
			if(events.onopen) {
				this.ws.onopen = (e) => events.onopen(e);
			} else if(events.onmessage) {
				this.ws.onmessage = (e) => events.onmessage(e);
			} else if(events.onclose) {
				this.ws.onclose = (e) => events.onclose(e);
			} 
		} 
	}

	GetWebSocket() {
		return this.ws;
	}

	ConnectionWrapper(socket, callback) {
		let timeout = 250;

		setTimeout(() => {
			if(socket.readyState === 1) {
				if(typeof callback === "function") {
					callback();
				}
			} else {
				this.ConnectionWrapper(socket, callback);
			}
		}, timeout);
	}

	Send(message) {
		// console.log("Sending message to the server...");
		try {
			this.ConnectionWrapper(this.ws, () =>
				this.ws.send(
					JSON.stringify(message)
				)
			);

			return true;
		} catch (e) {
			return false;
		}
	}

	OnOpen(e) {
		console.log("[Opened] WebSocket Connection");
		// this.ws.send("Hey!");
	}

	OnMessage(e) {
		if(e.isTrusted) {
			//TODO
		}
	}

	OnClose(e) {
		// console.log(e);
	}
}

export default WebSocketHelper;