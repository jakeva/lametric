const express = require("express");
const request = require("request");
const router = express.Router();

/**
 * GET Minecraft Server Player Count
 *
 * @return json object with icon and text for the lametric time clock
 */
router.get("/mc", function(req, res) {
  const icon = req.query.icon || "9329";
  let server = req.query.server || "lunar.gg";
  let port;
  const maxPlayers = req.query.max_players_choice;

  if (server.indexOf(":") > -1) {
    server = server.split(":")[0];
    port = server.split(":")[1];
  }

  const requestUrl = "https://api.minetools.eu/ping/" + server + (port ? "/port/" + port : "");

  request(requestUrl, (error, response, body) => {
    const json = JSON.parse(body);
    let text;

    if (json.error) {
      text = "OFFLINE";
    } else {
      text = json.players.online + ((maxPlayers === "true") ? "/" + json.players.max : "");
    }

    const content = {
      "frames": [{
        "icon": icon,
        "text": text,
      }]};

    res.send(content);
  });
});

module.exports = router;
