module.exports.config = {
  name: "time",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "TuanDz",
  description: "Xem ngày giờ",
  commandCategory: "Tiện ích",
  usages: "",
  cooldowns: 0,
  dependencies: []
};

module.exports.run = async function ({ api, event, args, Currencies, Users }) {
  const moment = require("moment-timezone");
  var ngay = moment.tz('Asia/Ho_Chi_Minh').format('D/MM/YYYY');
  var gio = moment.tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
  let name = await Users.getNameUser(event.senderID);
  return api.sendMessage(`🎀───── •🌸• ─────🎀\n👋 𝗛𝗲𝗹𝗹𝗼, ${name}\n𝗖𝗵𝘂́𝗰 𝗯𝗮̣𝗻 𝟭 𝗻𝗴𝗮̀𝘆 𝘁𝗼̂́𝘁 𝗹𝗮̀𝗻𝗵\n𝗕𝗮̂𝘆 𝗴𝗶𝗼̛̀ 𝗹𝗮̀: ${gio} ⏰\n📅 𝐍𝐠𝐚̀𝐲: ${ngay} (${thu})\n💟 𝗧𝗵𝗶́𝗻𝗵: 𝗖𝘂, 𝗖𝘂𝗖𝗹𝟮 𝘃𝗮̀ 𝗙𝗲𝟯𝗼𝟰 𝘁𝗵𝗶̀ 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗸𝗲̂́𝘁 𝘁𝘂̉𝗮\n𝗖𝗼̀𝗻 𝗮𝗻𝗵 𝘃𝗮̀ 𝗲𝗺 𝘁𝗵𝗶̀ 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗸𝗲̂́𝘁 𝗵𝗼̂𝗻\n🎀───── •🌸• ─────🎀`, event.threadID, event.messageID)
}