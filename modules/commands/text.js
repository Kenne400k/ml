const tesseract = require("tesseract.js");

module.exports.config = {
  name: "text",
  version: "1.0.2",
  hasPermission: 0,
  credits: "BraSL",
  description: "subgiare",
  commandCategory: "Tiện ích",
  usages: "[Script]",
  cooldowns: 0
};

module.exports.run = async function ({ api, event, args, Threads, Users, Currencies, models }) {
  const { messageReply, threadID } = event;

  if (event.type !== "message_reply") {
    return api.sendMessage("❌ Bạn phải reply một ảnh nào đó", event.threadID, event.messageID);
  }

  if (!event.messageReply.attachments || event.messageReply.attachments.length == 0) {
    return api.sendMessage("❌ Bạn phải reply một ảnh nào đó", event.threadID, event.messageID);
  }

  const language = args[0];
  const imageLink = messageReply.attachments[0].url;

  try {
    const { data: { text } } = await tesseract.recognize(imageLink, language, { logger: m => console.log(m) });

    const message = `🔥 Lấy Thành Công Nội Dung từ Ảnh
📌 Nội dung: ${text}`;

    api.sendMessage(message, event.threadID);
  } catch (error) {
    console.error('Error occurred:', error);
    api.sendMessage("❌ Có lỗi xảy ra khi nhận dạng văn bản từ ảnh", event.threadID);
  }
};