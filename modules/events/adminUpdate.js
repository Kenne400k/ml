module.exports.config = {
  name: "adminUpdate",
  eventType: ["log:thread-admins", "log:thread-name", "log:user-nickname"],
  version: "1.0.1",
  credits: "Mirai Team",
  description: "Cập nhật thông tin nhóm một cách nhanh chóng",
  envConfig: {
    autoUnsend: true,
    sendNoti: true,
    timeToUnsend: 10,
  },
};

module.exports.run = async function ({ event, api, Users, Threads }) {
  const { threadID, logMessageType, logMessageData } = event;
  const { setData, getData } = Threads;

  try {
    let dataThread = (await getData(threadID)) || { threadInfo: {} };

    if (!dataThread.threadInfo.adminIDs) {
      dataThread.threadInfo.adminIDs = [];
    }

    switch (logMessageType) {
      case "log:thread-admins": {
        if (logMessageData.ADMIN_EVENT == "add_admin") {
          dataThread.threadInfo.adminIDs.push({ id: logMessageData.TARGET_ID });
          var name1 = (await Users.getData(logMessageData.TARGET_ID)).name;
          if (global.configModule[this.config.name].sendNoti)
            api.sendMessage(` ༺ღ༒ 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨༒ღ༻ \n${name1} đ𝐚̃ 𝐯𝐢𝐧𝐡 𝐝𝐮̛̣ đ𝐮̛𝐨̛̣𝐜 𝐭𝐡𝐚̆𝐧𝐠 𝐜𝐚̂́𝐩 𝐭𝐡𝐚̀𝐧𝐡 𝐪𝐮𝐚̉𝐧 𝐭𝐫𝐢̣ 𝐯𝐢𝐞̂𝐧 𝐧𝐡𝐨́𝐦 `, threadID, async (error, info) => {
              if (global.configModule[this.config.name].autoUnsend) {
                await new Promise((resolve) => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                return api.unsendMessage(info.messageID);
              } else return;
            });
        } else if (logMessageData.ADMIN_EVENT == "remove_admin") {
          dataThread.threadInfo.adminIDs = dataThread.threadInfo.adminIDs.filter((item) => item.id != logMessageData.TARGET_ID);
          var name2 = (await Users.getData(logMessageData.TARGET_ID)).name;
          if (global.configModule[this.config.name].sendNoti)
            api.sendMessage(`☆彡彡 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨ミミ☆\nĐ𝐚̃ 𝐬𝐞𝐭 𝐜𝐚̂́𝐩 ${name2} 𝐭𝐫𝐨̛̉ 𝐭𝐡𝐚̀𝐧𝐡 𝐦𝐞𝐦𝐛𝐞𝐫`, threadID, async (error, info) => {
              if (global.configModule[this.config.name].autoUnsend) {
                await new Promise((resolve) => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
                return api.unsendMessage(info.messageID);
              } else return;
            });
        }
        break;
      }

      case "log:user-nickname": {
        dataThread.threadInfo.nicknames = dataThread.threadInfo.nicknames || {};
        dataThread.threadInfo.nicknames[logMessageData.participant_id] = logMessageData.nickname;

        var name3 = (await Users.getData(logMessageData.participant_id)).name;

        if (typeof global.configModule["nickname"] != "undefined" && !global.configModule["nickname"].allowChange.includes(threadID) && !dataThread.threadInfo.adminIDs.some((item) => item.id == event.author) || event.author == api.getCurrentUserID()) return;

        if (global.configModule[this.config.name].sendNoti)
          api.sendMessage(`➶➶➶➶ 𝑻𝒉𝒐̂𝒏𝒈 𝑩𝒂́𝐨➷➷➷➷\n${name3} đ𝚊̃ đ𝚘̂̉𝚒 𝚋𝚒𝚎̣̂𝚝 𝚍𝚊𝚗𝚑 𝚝𝚑𝚊̀𝚗𝚑 : ${(logMessageData.nickname.length == 0) ? "tên gốc" : logMessageData.nickname}`, threadID, async (error, info) => {
            if (global.configModule[this.config.name].autoUnsend) {
              await new Promise((resolve) => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
              return api.unsendMessage(info.messageID);
            } else return;
          });
        break;
      }

      case "log:thread-name": {
        dataThread.threadInfo.threadName = event.logMessageData.name || "Không tên";
        if (global.configModule[this.config.name].sendNoti)
          api.sendMessage(`＊*•̩̩͙✩•̩̩͙*˚𝑇ℎ𝑜̂𝑛𝑔 𝐵𝑎́𝑜˚*•̩̩͙✩•̩̩͙*˚＊\n𝐓𝐞̂𝐧 𝐧𝐡𝐨́𝐦 đ𝐚̃ đ𝐮̛𝐨̛̣𝐜 𝐜𝐚̣̂𝐩 𝐧𝐡𝐚̣̂𝐭 𝐭𝐡𝐚̀𝐧𝐡: ${dataThread.threadInfo.threadName}`, threadID, async (error, info) => {
            if (global.configModule[this.config.name].autoUnsend) {
              await new Promise((resolve) => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 1000));
              return api.unsendMessage(info.messageID);
            } else return;
          });
        break;
      }
    }
    await setData(threadID, dataThread);
  } catch (e) {
    console.log(e);
  }
};
