module.exports.config = {
  name: "prefix",  
  version: "3.0.0", 
  hasPermssion: 0,
  credits: "Pcoder Remake",
  description: "Xem hoặc đổi prefix nhóm",
  commandCategory: "Tiện ích",
  usages: "prefix [mới/reset]",
  cooldowns: 3
};

module.exports.handleEvent = async function ({ api, event, Threads }) {
  const moment = require("moment-timezone");
  const { threadID, messageID, body } = event;
  const { PREFIX } = global.config;
  let threadSetting = global.data.threadData.get(threadID) || {};
  let prefix = threadSetting.PREFIX || PREFIX;

  // Định dạng ngày giờ
  const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
  const days = {
    Sunday: "🌞 𝐂𝐡𝐮̉ 𝐍𝐡𝐚̣̂𝐭",
    Monday: "🌙 𝐓𝐡𝐮̛́ 𝐇𝐚𝐢",
    Tuesday: "🔥 𝐓𝐡𝐮̛́ 𝐁𝐚",
    Wednesday: "🌊 𝐓𝐡𝐮̛́ 𝐓𝐮̛",
    Thursday: "🍀 𝐓𝐡𝐮̛́ 𝐍𝐚̆𝐦",
    Friday: "🌟 𝐓𝐡𝐮̛́ 𝐒𝐚́𝐮",
    Saturday: "🎉 𝐓𝐡𝐮̛́ 𝐁𝐚̉𝐲"
  };
  let thu = days[moment.tz("Asia/Ho_Chi_Minh").format("dddd")] || "Unknown";

  if (body.toLowerCase() === "prefix") {
    const threadInfo = await Threads.getInfo(threadID);
    const msg = `
╔══════════════╗
     🚀 𝗣𝗥𝗘𝗙𝗜𝗫 𝗜𝗡𝗙𝗢 🚀
╚══════════════╝
🎭 𝗕𝗼𝘅: ${threadInfo.threadName || "Unknown"}
❗ 𝗣𝗿𝗲𝗳𝗶𝘅 𝗕𝗼𝘅: ${prefix}
🔹 𝗣𝗿𝗲𝗳𝗶𝘅 𝗦𝘆𝘀𝘁𝗲𝗺: ${global.config.PREFIX}
🤖 𝗕𝗼𝘁 𝗡𝗮𝗺𝗲: ${global.config.BOTNAME}
📦 𝗖𝗼𝗺𝗺𝗮𝗻𝗱𝘀: ${client.commands.size} lệnh
🆔 𝗧𝗜𝗗: ${threadID}
⏰ 𝗧𝗶𝗺𝗲: ${time} || ${thu}`;

    api.sendMessage({ body: msg, attachment: global.lekhanh.splice(0, 1) }, threadID, messageID);
  }
};

module.exports.handleReaction = async function({ api, event, Threads, handleReaction }) {
  if (event.userID != handleReaction.author) return;
  const { threadID, messageID } = event;
  let data = (await Threads.getData(String(threadID))).data || {};
  data["PREFIX"] = handleReaction.PREFIX;
  
  await Threads.setData(threadID, { data });
  await global.data.threadData.set(String(threadID), data);

  api.unsendMessage(handleReaction.messageID);
  api.sendMessage(`✅ Đã đổi prefix nhóm thành: ${handleReaction.PREFIX}`, threadID, messageID);
};

module.exports.run = async ({ api, event, args, Threads }) => {
  if (!args[0]) return api.sendMessage("⚠️ Bạn phải nhập prefix cần thay đổi!", event.threadID, event.messageID);

  let prefix = args[0].trim();
  if (prefix === "reset") {
    let data = (await Threads.getData(event.threadID)).data || {};
    data["PREFIX"] = global.config.PREFIX;

    await Threads.setData(event.threadID, { data });
    await global.data.threadData.set(String(event.threadID), data);

    return api.sendMessage(`🔄 Prefix đã được reset về: ${global.config.PREFIX}`, event.threadID, event.messageID);
  }

  api.sendMessage(`❓ Bạn có chắc muốn đổi prefix nhóm thành: "${prefix}"?\n👉 Thả ❤️ để xác nhận`, event.threadID, (error, info) => {
    global.client.handleReaction.push({
      name: this.config.name,
      messageID: info.messageID,
      author: event.senderID,
      PREFIX: prefix
    });
  });
};
