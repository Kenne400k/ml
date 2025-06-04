module.exports.config = {
 name: "antiout",
 eventType: ["log:unsubscribe"],
 version: "0.0.1",
 credits: "DungUwU",
 description: "Listen events"
};

module.exports.run = async({ event, api, Threads, Users }) => {
   const moment = require("moment-timezone");
  var timeNow = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
 let data = (await Threads.getData(event.threadID)).data || {};
 if (data.antiout == false) return;
 if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
 const name = global.data.userName.get(event.logMessageData.leftParticipantFbId) || await Users.getNameUser(event.logMessageData.leftParticipantFbId);
 const type = (event.author == event.logMessageData.leftParticipantFbId) ? "tự rời" : "bị quản trị viên đá";
 if (type == "tự rời") {
  api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`==== [ 𝐁𝐚́𝐨 𝐂𝐚́𝐨 ] ====\n➣ Đ𝐚̃ 𝐩𝐡𝐚́𝐭 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨𝐧 𝐯𝐨̛̣ 𝐜𝐨́ 𝐭𝐞̂𝐧 ${name}\n➣ Đ𝐚̃ đ𝐚̀𝐨 𝐭𝐚̂̉𝐮 𝐭𝐫𝐨̂́𝐧 𝐭𝐡𝐨𝐚́𝐭 𝐤𝐡𝐨̉𝐢 𝐛𝐨𝐱 𝐜𝐡𝐚𝐭 𝐯𝐚̀ 𝐛𝐨𝐭 đ𝐚̃ 𝐤𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐛𝐚̆́𝐭 𝐧𝐨́ 𝐯𝐚̀𝐨 𝐥𝐚̣𝐢 đ𝐮̛𝐨̛̣𝐜 \n➣ 𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧 𝐦𝐚̀ 𝐧𝐨́ đ𝐚̃ 𝐭𝐫𝐨̂́𝐧 𝐭𝐡𝐨𝐚́𝐭 đ𝐮̛𝐨̛̣𝐜 𝐯𝐚̀𝐨 𝐥𝐮́𝐜: ${timeNow} `, event.threadID)
   } else api.sendMessage(`==== [ 𝐁𝐚́𝐨 𝐂𝐚́𝐨 ] ====\n Đ𝐚̃ 𝐩𝐡𝐚́𝐭 𝐡𝐢𝐞̣̂𝐧 𝐜𝐨𝐧 𝐯𝐨̛̣ 𝐜𝐨́ 𝐭𝐞̂𝐧 ${name}\n➣ Đ𝐚̃ 𝐜𝐨̂́ 𝐲́ 𝐯𝐮̛𝐨̛̣𝐭 𝐧𝐠𝐮̣𝐜 𝐧𝐡𝐮̛𝐧𝐠 𝐦𝐚̀ 𝐦𝐚̀𝐲 𝐭𝐮𝐨̂̉𝐢 𝐜𝐨𝐧 𝐜𝐚̣̆𝐜 𝐧𝐞̂𝐧 đ𝐚̃ 𝐛𝐢̣ 𝐁𝐨𝐭 𝐛𝐚̆́𝐭 𝐥𝐚̣𝐢 \n➣ 𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧 𝐦𝐚̀ 𝐧𝐨́ đ𝐚̃ 𝐜𝐨̂́ 𝐭𝐢̀𝐧𝐡 𝐭𝐫𝐨̂́𝐧 𝐭𝐡𝐨𝐚́𝐭 𝐯𝐚̀𝐨 𝐥𝐮́𝐜: ${timeNow}\n➣ 𝐍𝐨́𝐢 𝐧𝐡𝐨̉ 𝐧𝐠𝐡𝐞 𝐧𝐞̀, 𝐦𝐚̀𝐲 𝐜𝐨́ 𝐜𝐨𝐧 𝐜𝐚̣̆𝐜 𝐦𝐚̀ 𝐨𝐮𝐭 đ𝐮̛𝐨̛̣𝐜 𝐧𝐡𝐞́ 🐸🚬`, event.threadID);
  })
 }
}