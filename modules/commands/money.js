module.exports.config = {
  name: "money",
  version: "2.2.0",
  hasPermssion: 0,
  credits: "Quất + Pcoder",
  description: "Xem số dư hoặc chỉnh sửa số dư.",
  commandCategory: "Người dùng",
  usages: "/money [ + , - , * , / , +- , pay ]",
  cooldowns: 0,
  usePrefix: false,
};

module.exports.run = async function ({ Currencies, api, event, args, Users, permssion }) {
  const { threadID, senderID, messageID, mentions, type, messageReply } = event;
  let targetID = senderID;
  if (type === 'message_reply') targetID = messageReply.senderID;
  else if (Object.keys(mentions).length > 0) targetID = Object.keys(mentions)[0];

  const name = await Users.getNameUser(targetID);
  let money = Math.round((await Currencies.getData(targetID)).money || 0);

  const formatMoney = (num) => num.toLocaleString("en-US").replace(/,/g, "."); // Format số tiền
  const emojis = ["💰", "💸", "💲", "🤑", "💎", "🏦"];

  if (!args[0]) {
    return api.sendMessage(`━━━━━━━━━━━━━━\n🔹 𝗧𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻: ${name}\n🔹 𝗦𝗼̂́ 𝗱𝘂̛: ${formatMoney(money)}$\n${emojis[Math.floor(Math.random() * emojis.length)]} 𝗛𝗮̃𝘆 𝗾𝘂𝗮̉𝗻 𝗹𝘆́ 𝗵𝗼̛̣𝗽 𝗹𝗶́!\n━━━━━━━━━━━━━━`, threadID, messageID);
  }

  const mon = Math.round(parseFloat(args[1]));
  if (isNaN(mon)) return api.sendMessage("⚠️ Số tiền không hợp lệ!", threadID);

  switch (args[0]) {
    case "+":
      if (permssion < 2) return api.sendMessage("🚫 Bạn không đủ quyền!", threadID);
      await Currencies.increaseMoney(targetID, mon);
      money += mon;
      break;
    case "-":
      if (permssion < 2) return api.sendMessage("🚫 Bạn không đủ quyền!", threadID);
      if (money < mon) return api.sendMessage("⚠️ Không đủ tiền để trừ!", threadID);
      await Currencies.decreaseMoney(targetID, mon);
      money -= mon;
      break;
    case "*":
      if (permssion < 2) return api.sendMessage("🚫 Bạn không đủ quyền!", threadID);
      money *= mon;
      await Currencies.setData(targetID, { money });
      break;
    case "/":
      if (permssion < 2) return api.sendMessage("🚫 Bạn không đủ quyền!", threadID);
      if (mon === 0) return api.sendMessage("⚠️ Không thể chia cho 0!", threadID);
      money = Math.round(money / mon);
      await Currencies.setData(targetID, { money });
      break;
    case "+-":
      if (permssion < 2) return api.sendMessage("🚫 Bạn không đủ quyền!", threadID);
      await Currencies.setData(targetID, { money: mon });
      money = mon;
      break;
    case "pay":
      const senderMoney = Math.round((await Currencies.getData(senderID)).money || 0);
      if (senderMoney < mon) return api.sendMessage("⚠️ Bạn không đủ tiền để chuyển!", threadID);
      await Currencies.decreaseMoney(senderID, mon);
      await Currencies.increaseMoney(targetID, mon);
      return api.sendMessage(`💳 Đã chuyển **${formatMoney(mon)}$** cho **${name}** 💸`, threadID);
    default:
      return api.sendMessage("⚠️ Lệnh không hợp lệ!", threadID);
  }

  return api.sendMessage(`━━━━━━━━━━━━━━\n✅ 𝗖𝗮̣̂𝗽 𝗻𝗵𝗮̣̂𝘁 𝘀𝗼̂́ 𝗱𝘂̛\n🔹 𝗧𝗮̀𝗶 𝗸𝗵𝗼𝗮̉𝗻: ${name}\n🔹 𝗦𝗼̂́ 𝗱𝘂̛: ${formatMoney(money)}$\n${emojis[Math.floor(Math.random() * emojis.length)]} 𝗦𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝘁𝗶𝗲̂̀𝗻 𝗵𝗼̛̣𝗽 𝗹𝗶́!\n━━━━━━━━━━━━━━`, threadID, messageID);
};
