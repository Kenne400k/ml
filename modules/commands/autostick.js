module.exports.config = {
  name: "stick",
  version: "1.0.3",
  hasPermssion: 0,
  description: "Gửi sticker sau mỗi 7 tin nhắn (chỉ tính tin nhắn từ người dùng, tránh spam)",
  commandCategory: "group",
  cooldowns: 0
};

module.exports.handleEvent = async ({ event, api }) => {
  let thread = global.data.threadData.get(event.threadID) || {};

  // Kiểm tra nếu chưa bật tính năng thì không làm gì hết
  if (!thread.hi) return;

  // Kiểm tra nếu tin nhắn là từ bot thì bỏ qua
  if (event.senderID === api.getCurrentUserID()) return;

  // Danh sách sticker
  let stickerData = [
    "587797676948655", "587795813615508", "587795210282235", "587794826948940",
    "587752050286551", "587751433619946", "587750746953348", "587750060286750",
    "587749530286803", "587748556953567", "587539206974502", "587538733641216",
    "587538183641271", "587537446974678", "587536306974792", "587534000308356",
    "587533183641771", "587532536975169", "587525333642556", "587539740307782"
  ];

  if (!thread.messageCount) thread.messageCount = 0;
  thread.messageCount++;

  // Gửi sticker sau 7 tin nhắn (tránh spam)
  if (thread.messageCount >= 8) {
    setTimeout(() => {
      api.sendMessage({ sticker: stickerData[Math.floor(Math.random() * stickerData.length)] }, event.threadID);
    }, 1000); // Delay 1 giây để tránh queue bị nghẽn
    thread.messageCount = 0;
  }

  global.data.threadData.set(event.threadID, thread);
};

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": "thành công"
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!"
  }
};

module.exports.run = async ({ event, api, Threads, getText }) => {
  let { threadID, messageID } = event;
  let threadData = await Threads.getData(threadID);
  let data = threadData.data || {};

  // Đảo trạng thái bật/tắt
  data.hi = !data.hi;

  await Threads.setData(threadID, { data });
  global.data.threadData.set(threadID, data);

  return api.sendMessage(`${data.hi ? getText("on") : getText("off")} ${getText("successText")}`, threadID, messageID);
};
