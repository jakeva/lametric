const express = require("express");
const request = require("request");
const router = express.Router();

/**
 * GET Discord Server Member Count
 *
 * @return json object with icon and text for the lametric time clock
 */
router.get("/discord", function(req, res) {
  const icon = req.query.icon || "49467";
  let invite = req.query.invite || "LunarClient";
  const displayOnlineCount = req.query.display_online_count;

  if (invite !== null) {
    if (invite.indexOf("/invite/") > -1) {
      invite = invite.slice(invite.lastIndexOf("/")) + 1;
    } else {
      invite = "INVALID";
    }
  }

  const requestUrl = "https://discord.com/api/v10/invites/" + invite + "?with_counts=true";

  request(requestUrl, (error, response, body) => {
    const json = JSON.parse(body);
    let text;

    if (invite === "INVALID" || (json.content.message === "Unknown Invite" && json.content.code === 10006)) {
      text = "INVALID";
    } else {
      text = ((displayOnlineCount === "true") ? json.approximate_presence_count + "/" : "") + json.approximate_member_count;
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
