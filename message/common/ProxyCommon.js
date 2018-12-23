import ConnectionClient from "./network/ConnectionClient";

class Client {
	constructor(window, server = "localhost", port = 1337, events = null) {
		this.UUID = null;
		this.Window = window;

		this.ConnectionClient = new ConnectionClient(server, port, events);
		this.WebSocket = this.ConnectionClient.WebSocket.GetWebSocket();

		this.ConnectionClient.UUID = this.UUID;
		this.WebSocket.UUID = this.UUID;
	}
}

export default Client;