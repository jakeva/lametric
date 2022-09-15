const functions = require("firebase-functions");
const express = require("express");
const app = express();

const minecraftServerStatus = require("./api/minecraft_server_stats");
const discordServerStatus = require("./api/discord_server_stats");

app.use(express.json({extended: false}));

app.get("/mc", minecraftServerStatus);
app.get("/discord", discordServerStatus);

exports.app = functions.https.onRequest(app);
