module.exports.config = {
  name: "qrscan",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Khoa x Nam",
  description: "Đọc qrcode!",
  commandCategory: "Tiện ích",
  usages: "Phản hồi",
  cooldowns: 0,
  dependencies: {
    "jimp": "",
    "qrcode-reader": "",
    "image-downloader": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  const fs = require('fs');
  const jimp = require('jimp');
  const QrCode = require('qrcode-reader');
  const path = __dirname + "/cache/qrcode.png";

  const { threadID, messageID, type, messageReply } = event;
  if (type != "message_reply" || messageReply.attachments.length > 1) return api.sendMessage("⚡ Bạn phải phản hồi ảnh qrcode cần quét!", threadID, messageID);

  if (messageReply.attachments[0].type == 'photo') {
    await require("image-downloader").image({ url: messageReply.attachments[0].url, dest: path })
    const img = await jimp.read(fs.readFileSync(path));
    const qr = new QrCode();
    const value = await new Promise((resolve, reject) => {
      qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
      qr.decode(img.bitmap);
    });
    return api.sendMessage({
    body:`[ Kết Quả Quét Từ Mã Qr ]\n──────────────────\n🖨️ Mã qr: ${value.result}`,
     attachment: (await require('axios').get('https://i.imgur.com/Uo69tpe.jpg', {
          responseType: 'stream'
      })).data
 },
event.threadID, event.messageID);
  }
  return api.sendMessage("⚡ Đã xảy ra lỗi!", threadID, messageID);
}