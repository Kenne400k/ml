module.exports.config = {
  name: "sticker",
  version: "1.0.0",
  hasPermssion: 0,
  description: "Lấy ID của sticker khi reply",
  commandCategory: "Tiện ích",
  usages: "[reply sticker]",
  cooldowns: 2
};

module.exports.run = async ({ event, api }) => {
  if (!event.messageReply || !event.messageReply.stickerID) {
    return api.sendMessage("Vui lòng reply một sticker để lấy ID!", event.threadID, event.messageID);
  }

  let stickerID = event.messageReply.stickerID;
  return api.sendMessage(`Sticker ID của bạn là: ${stickerID}`, event.threadID, event.messageID);
};
