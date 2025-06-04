const fs = require("fs");

module.exports.config = {
  name: "hetcuu",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "trunguwu", 
  description: "noprefix",
  commandCategory: "Tiện ích",
  usages: "hetcuu",
  cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event }) {
  const { threadID, messageID, body } = event;
  const trigger = ["hết cứu", "hetcuu", "het cuu"];

  if (!body) return;

  const matched = trigger.some(t => body.toLowerCase().startsWith(t));
  if (matched) {
    const msg = {
      body: "bot cũng ko cứu nổi",
      attachment: fs.createReadStream(__dirname + `/noprefix/hetcuu.mp3`)
    };
    api.sendMessage(msg, threadID, messageID);
  }
};

module.exports.run = function() {};
