const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const expressWS = require("express-ws")(express());
const app = expressWS.app;

const PORT = 3087;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(express.static(path.join(__dirname)));
// app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
	console.log(`Animus API is now listening on port: ${ PORT }`);
});

app.get("/", (req, res) => {
    res.sendfile("index.html");
});

app.get("/validate", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
	res.set("Content-Type", "Application/json");
});