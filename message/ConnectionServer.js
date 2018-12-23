const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const expressWS = require("express-ws")(express());
const app = expressWS.app;

const PORT = 1337;
const STDIN = process.openStdin();

function NewUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
		return v.toString(16);
	});
};

const Connection = {
	IsServer: true,
	Server: {
		Main: app,
		WebSocket: expressWS.getWss()
	},
	UUID: NewUUID()
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.static(path.join(__dirname, "public")));


//TODO Build "Debug Logger" class that, by a CONFIG FS file, will or will not send parameter input into "console.log"
//TODO	DebugLogger.Cout(`[CLIENT CONNECTED]: { Timestamp: ${Date.now()}, IP: ${req.connection.remoteAddress} }`);
//TODO	DebugLogger.HandlerReceive(this.constructor.name as name, msg) ===> `[MESSAGE RECEIVED - ${name}]: ${msg.MessageType}`;
const DebugLogger = {
	IsDebugMode: true,
	Log: (...input) => DebugLogger.IsDebugMode ? console.log(...input) : null
}

app.ws("/ws", function (client, req) {
	DebugLogger.Log(`[CLIENT CONNECTED]: { Timestamp: ${Date.now()}, IP: ${req.connection.remoteAddress} }`);
	client.UUID = NewUUID();
	
	FuzzyKnights.Common.Event.Spawn.PlayerConnectEvent(client.UUID);

	client.on("message", function(msg) {
		try {
			const packet = JSON.parse(msg);

			//!	Debugging
			// console.log(client._socket.address());
			// console.log(client.clients);
			DebugLogger.Log(`[PACKET RECEIVED]: { Timestamp: ${Date.now()}, IP: ${req.connection.remoteAddress} }`);

			if(packet["Message"] !== null && packet["Message"] !== void 0) {
				FuzzyKnights.Common.Message.Packet.PacketManager.ExtractMessage(packet);
			}
		} catch (e) {
			DebugLogger.Log("[PACKET FAILURE]: Message could not be extracted");
			DebugLogger.Log(e);
		}
	});

	client.on("close", function() {
		DebugLogger.Log(`[CLIENT DISCONNECTED]: { Timestamp: ${Date.now()}, IP: ${req.connection.remoteAddress} }`);
	});
});

app.listen(PORT, () => {
	console.log(`FuzzyKnights API is now listening on port: ${PORT}`);
});