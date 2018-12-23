import WebSocketHelper from "./WebSocketHelper.js";

class ConnectionClient {
	constructor(server = "localhost", port = 1337, events = null) {
		this.UUID = null;

		this.Server = server;
		this.Port = port;

		this.WebSocket = new WebSocketHelper(`ws://${this.Server}:${this.Port}/ws`, events);
	}
}

export default ConnectionClient;