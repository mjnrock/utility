import EnumPacketType from "./../../enum/PacketType.js";

import { Packet } from "./Packet.js";
import { PacketServer } from "./PacketServer.js";
import { PacketClient } from "./PacketClient.js";
import { PacketBroadcast } from "./PacketBroadcast.js";

class PacketManager {
	constructor(server, packets = []) {
		this.Server = server;
		this.Packets = packets;
	}

	ExtractMessage(pkt) {
		let packet = typeof pkt == "string" || pkt instanceof String ? JSON.parse(pkt) : pkt;

		if(packet) {
			//TODO

			let msg = packet["Message"] ? packet.Message : packet;

			msg.Sender = packet.Sender;
			// return this.FuzzyKnights.Common.Message.MessageManager.Receive(msg);
			return this.Server.MessageManager.Receive(msg);
		}
	}

	UpgradeMessage(packetType, msg, receiver = null) {
		let sender;

		switch(packetType) {
			case EnumPacketType.SERVER:
				return new PacketServer(msg, sender);
			case EnumPacketType.CLIENT:
				return new PacketClient(msg, sender, receiver);
			case EnumPacketType.BROADCAST:
				return new PacketBroadcast(msg, sender);
			default:
				return null;
		}
	}
	
	Spawn(packetType, msg, receiver) {
		return this.Receive(this.UpgradeMessage(packetType, msg, receiver));
	}	
	SpawnServer(msg) {
		return this.Spawn(EnumPacketType.SERVER, msg);
	}
	SpawnClient(msg, uuid) {
		return this.Spawn(EnumPacketType.CLIENT, msg, uuid);
	}
	SpawnBroadcast(msg) {
		return this.Spawn(EnumPacketType.BROADCAST, msg);
	}

	Receive(packet) {
		if(packet instanceof Packet) {
			this.Enqueue(packet);

			return packet;
		}

		return false;
	}

	Enqueue(packet) {
		this.Packets.push(packet);

		return this;
	}
	Dequeue() {
		if(this.Packets.length > 0) {
			return this.Packets.splice(0, 1)[0];
		}

		return false;
	}

	SendToClient(packet) {
		this.Server.WebSocket.clients.forEach((client) => {
			if(client.UUID == packet.Receiver) {
				client.send(JSON.stringify(packet));
			}
		});
	}
	SendToAllClients(packet) {
		if(this.Server.IsServer) {
			this.Server.WebSocket.clients.forEach((client) => {
				client.send(JSON.stringify(packet));
			});
		}
	}
	SendToServer(packet) {
		this.Server.WebSocket.send(JSON.stringify(packet));
	}
	
	Dispatch(packet, time = null) {
		if(this.Server.IsServer) {
			console.log(`[PACKET DISPATCHED]: ${packet.PacketType}`);
		} else {
			console.log(`[PACKET DISPATCHED]: ${packet.PacketType}`, packet);
		}

		switch(packet.PacketType) {
			case EnumPacketType.SERVER:
				this.SendToServer(packet);
				return true;
			case EnumPacketType.CLIENT:
				// this.SendToClient(packet, packet.Clients);
				this.SendToClient(packet);
				return true;
			case EnumPacketType.BROADCAST:
				this.SendToAllClients(packet);
				return true;
			default:
				return false;
		}
	}

	OnTick(time) {
		let start = Date.now(),
			timeout = 2000;

		while(this.Packets.length > 0 || (Date.now() - start >= timeout)) {
			this.Dispatch(this.Dequeue(), time);
		}
	}
}

export default PacketManager;