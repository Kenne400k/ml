module.exports.config = {
  name: 'listbox',
  version: '1.0.0',
  credits: 'ManhG',
  hasPermssion: 2,
  description: '[Ban/Unban/Remove] List thread bot đã tham gia',
  commandCategory: 'Admin',
  usages: '[số trang/all]',
  cooldowns: 5
};

module.exports.handleReply = async function({ api, event, args, Threads, handleReply }) {
  const { threadID, messageID } = event;
  if (parseInt(event.senderID) !== parseInt(handleReply.author)) return;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Ho_Chi_minh").format("HH:MM:ss L");
  var arg = event.body.split(" ");
  //var idgr = handleReply.groupid[arg[1] - 1];
  //var groupName = handleReply.groupName[arg[1] - 1];
  switch (handleReply.type) {
      case "reply":
          {
              if (arg[0] == "ban" || arg[0] == "Ban") {
                  var arrnum = event.body.split(" ");
                  var msg = "";
                  var modules = "------- Thực thi Ban -------\n"
                  var nums = arrnum.map(n => parseInt(n));
                  nums.shift();
                  for (let num of nums) {
                      var idgr = handleReply.groupid[num - 1];
                      var groupName = handleReply.groupName[num - 1];

                      const data = (await Threads.getData(idgr)).data || {};
                      data.banned = 1;
                      data.dateAdded = time;
                      var typef = await Threads.setData(idgr, { data });
                      global.data.threadBanned.set(idgr, { dateAdded: data.dateAdded });
                      msg += '🌸 𝗧𝗿𝗮̣𝗻𝗴 𝘁𝗵𝗮́𝗶: ' + typef + '\n' + '💬 𝗕𝗼𝘅: ' + groupName + '\n🔰 𝗧𝗜𝗗: ' + idgr + "\n";
                      console.log(modules, msg)
                  }
                  api.sendMessage(`» 𝗧𝗵𝗼̂𝗻𝗴 𝗕𝗮́𝗼 𝗧𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻 «\n\n𝗡𝗵𝗼́𝗺 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻 𝘃𝘂̛̀𝗮 𝗯𝗶̣ 𝗮𝗱𝗺𝗶𝗻 𝗯𝗮𝗻, 𝗵𝗮̃𝘆 𝘁𝗵𝗲̂̉ 𝗵𝗶𝗲̣̂𝗻 𝘀𝘂̛̣ 𝗵𝗼̂́𝗶 𝗹𝗼̂̃𝗶 𝘁𝗿𝘂̛𝗼̛́𝗰 𝗸𝗵𝗶 𝗾𝘂𝗮́ 𝗺𝘂𝗼̣̂𝗻 𝗻𝗵𝗲́ 😈`, idgr, () =>
                      api.sendMessage(`${global.data.botID}`, () =>
                          api.sendMessage(`===== [ 𝗕𝗔𝗡 𝗕𝗢𝗫 ] =====\n━━━━━━━━━━━━━\n\n${msg}`, threadID, () =>
                              api.unsendMessage(handleReply.messageID))));
                  break;
              }

              if (arg[0] == "unban" || arg[0] == "Unban" || arg[0] == "ub" || arg[0] == "Ub") {
                  var arrnum = event.body.split(" ");
                  var msg = "";
                  var modules = "------- Thực thi Unban -------\n"
                  var nums = arrnum.map(n => parseInt(n));
                  nums.shift();
                  for (let num of nums) {
                      var idgr = handleReply.groupid[num - 1];
                      var groupName = handleReply.groupName[num - 1];

                      const data = (await Threads.getData(idgr)).data || {};
                      data.banned = 0;
                      data.dateAdded = null;
                      var typef = await Threads.setData(idgr, { data });
                      global.data.threadBanned.delete(idgr, 1);
                      msg += '🌸 𝗧𝗿𝗮̣𝗻𝗴 𝘁𝗵𝗮́𝗶: ' + typef + '\n' + '💬 𝗕𝗼𝘅: ' + groupName + '\n🔰 𝗧𝗜𝗗: ' + idgr + "\n";
                      console.log(modules, msg)
                  }
                  api.sendMessage(`» 𝗧𝗵𝗼̂𝗻𝗴 𝗕𝗮́𝗼 𝗧𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻 «\n\n𝗔𝗱𝗺𝗶𝗻 𝘃𝘂̛̀𝗮 𝗴𝗼̛̃ 𝗯𝗮𝗻 𝗰𝗵𝗼 𝗻𝗵𝗼́𝗺 𝗰𝘂̉𝗮 𝗯𝗮̣𝗻, 𝗵𝗮̃𝘆 𝘅𝗮̀𝗶 𝗯𝗼𝘁 𝗺𝗼̣̂𝘁 𝗰𝗮́𝗰𝗵 𝘁𝗵𝗼̂𝗻𝗴 𝗺𝗶𝗻𝗵 𝗵𝗼̛𝗻 𝗻𝗵𝗲́ 😘`, idgr, () =>
                      api.sendMessage(`${global.data.botID}`, () =>
                          api.sendMessage(`==== [ 𝗨𝗡𝗕𝗔𝗡 𝗕𝗢𝗫 ] ====\n━━━━━━━━━━━━━\n\n${msg}`, threadID, () =>
                              api.unsendMessage(handleReply.messageID))));
                  break;
              }

              if (arg[0] == "out" || arg[0] == "Out") {
                  var arrnum = event.body.split(" ");
                  var msg = "";
                  var modules = "------- Thực thi Out -------\n"
                  var nums = arrnum.map(n => parseInt(n));
                  nums.shift();
                  for (let num of nums) {
                      var idgr = handleReply.groupid[num - 1];
                      var groupName = handleReply.groupName[num - 1];
                      var typef = api.removeUserFromGroup(`${api.getCurrentUserID()}`, idgr);
                      msg += '🌸 𝗧𝗿𝗮̣𝗻𝗴 𝘁𝗵𝗮́𝗶: ' + typef + '\n' + '💬 𝗕𝗼𝘅: ' + groupName + '\n🔰 𝗧𝗜𝗗: ' + idgr + "\n";
                      console.log(modules, msg)
                  }
                  api.sendMessage(`» 𝗧𝗵𝗼̂𝗻𝗴 𝗕𝗮́𝗼 𝗧𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻 «\n\n𝗖𝗵𝗮̀𝗼 𝘁𝗮̣𝗺 𝗯𝗶𝗲̣̂𝘁 𝘃𝗮̀ 𝗸𝗵𝗼̂𝗻𝗴 𝗵𝗲̣𝗻 𝗴𝗮̣̆𝗽 𝗹𝗮̣𝗶 𝗻𝗵𝗲́, 𝗸𝗵𝗶 𝗻𝗮̀𝗼 𝗰𝗼́ 𝘆́ 𝘁𝗵𝘂̛́𝗰 𝗵𝗼̛𝗻 𝘁𝗵𝗶̀ 𝗰𝗵𝘂́𝗻𝗴 𝘁𝗮 𝗴𝗮̣̆𝗽 𝗹𝗮̣𝗶 👋`, idgr, () =>
                      api.sendMessage(`${global.data.botID}`, () =>
                          api.sendMessage(`==== [ 𝗢𝗨𝗧 𝗕𝗢𝗫 ] ====\n━━━━━━━━━━━━━\n\n${msg} `, threadID, () =>
                              api.unsendMessage(handleReply.messageID))));
                  break;
              }
          }
  }
};
module.exports.run = async function({ api, event, args }) {
  switch (args[0]) {
      case "all":
          {
              var inbox = await api.getThreadList(100, null, ['INBOX']);
              let list = [...inbox].filter(group => group.isSubscribed && group.isGroup);
              var listthread = [];
              var listbox = [];
              /////////
              for (var groupInfo of list) {
                  //let data = (await api.getThreadInfo(groupInfo.threadID));
                  //const listUserID = event.participantIDs.filter(ID => ID);
                  listthread.push({
                      id: groupInfo.threadID,
                      name: groupInfo.name || "Chưa đặt tên",
                      messageCount: groupInfo.messageCount
                  });
              }
              /////////
              var listbox = listthread.sort((a, b) => {
                  if (a.messageCount > b.messageCount) return -1;
                  if (a.messageCount < b.messageCount) return 1;
              });
              /////////  
              var groupid = [];
              var groupName = [];
              var page = 1;
              page = parseInt(args[0]) || 1;
              page < -1 ? page = 1 : "";
              var limit = 50;
              var msg = "== [ 𝗗𝗔𝗡𝗛 𝗦𝗔́𝗖𝗛 𝗡𝗛𝗢́𝗠 ] ==\n━━━━━━━━━━━━━\n\n";
              var numPage = Math.ceil(listbox.length / limit);

              for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                  if (i >= listbox.length) break;
                  let group = listbox[i];
                  msg += `${i + 1}. ${group.name}\n🔰 𝗧𝗜𝗗: ${group.id}\n📩 𝗦𝗼̂́ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻: ${group.messageCount}\n`;
                  groupid.push(group.id);
                  groupName.push(group.name);
              }
              msg += `\n-------- 𝗧𝗿𝗮𝗻𝗴 ${page}/${numPage} --------\n𝗗𝘂̀𝗻𝗴 ${global.config.PREFIX}listbox all + số trang\n\n`

              api.sendMessage(msg + '👉 𝗥𝗲𝗽𝗹𝘆 𝗢𝘂𝘁, 𝗕𝗮𝗻, 𝗨𝗻𝗯𝗮𝗻 + 𝘀𝗼̂́ 𝘁𝗵𝘂̛́ 𝘁𝘂̛̣, 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗿𝗲𝗽 𝗻𝗵𝗶𝗲̂̀𝘂 𝘀𝗼̂́, 𝗰𝗮́𝗰𝗵 𝗻𝗵𝗮𝘂 𝗯𝗮̆̀𝗻𝗴 𝗱𝗮̂́𝘂 𝗰𝗮́𝗰𝗵 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗢𝘂𝘁, 𝗕𝗮𝗻, 𝗨𝗻𝗯𝗮𝗻 𝗻𝗵𝗼́𝗺 𝗮̂́𝘆', event.threadID, (e, data) =>
                  global.client.handleReply.push({
                      name: this.config.name,
                      author: event.senderID,
                      messageID: data.messageID,
                      groupid,
                      groupName,
                      type: 'reply'
                  })
              )
          }
          break;

      default:
          try {
              var inbox = await api.getThreadList(100, null, ['INBOX']);
              let list = [...inbox].filter(group =>  group.isSubscribed && group.isGroup);
              var listthread = [];
              var listbox = [];
              /////////
              for (var groupInfo of list) {
                  //let data = (await api.getThreadInfo(groupInfo.threadID));
                  //const listUserID = event.participantIDs.filter(ID => ID);
                  listthread.push({
                      id: groupInfo.threadID,
                      name: groupInfo.name || "Chưa đặt tên",
                      messageCount: groupInfo.messageCount
                  });

              } //for
              var listbox = listthread.sort((a, b) => {
                  if (a.messageCount > b.messageCount) return -1;
                  if (a.messageCount < b.messageCount) return 1;
              });
              var groupid = [];
              var groupName = [];
              var page = 1;
              page = parseInt(args[0]) || 1;
              page < -1 ? page = 1 : "";
              var limit = 15;
              var msg = "== [ 𝗗𝗔𝗡𝗛 𝗦𝗔́𝗖𝗛 𝗡𝗛𝗢́𝗠 ] ==\n━━━━━━━━━━━━━\n\n";
              var numPage = Math.ceil(listbox.length / limit);

              for (var i = limit * (page - 1); i < limit * (page - 1) + limit; i++) {
                  if (i >= listbox.length) break;
                  let group = listbox[i];
                  msg += `${i + 1}. ${group.name}\n🔰 𝗧𝗜𝗗: ${group.id}\n📩 𝗦𝗼̂́ 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻: ${group.messageCount}\n`;
                  groupid.push(group.id);
                  groupName.push(group.name);
              }
              msg += `\n-------- Trang ${page}/${numPage} --------\nDùng ${global.config.PREFIX}listbox + số trang/all\n\n`

              api.sendMessage(msg + '👉 𝗥𝗲𝗽𝗹𝘆 𝗢𝘂𝘁, 𝗕𝗮𝗻, 𝗨𝗻𝗯𝗮𝗻 + 𝘀𝗼̂́ 𝘁𝗵𝘂̛́ 𝘁𝘂̛̣, 𝗰𝗼́ 𝘁𝗵𝗲̂̉ 𝗿𝗲𝗽 𝗻𝗵𝗶𝗲̂̀𝘂 𝘀𝗼̂́, 𝗰𝗮́𝗰𝗵 𝗻𝗵𝗮𝘂 𝗯𝗮̆̀𝗻𝗴 𝗱𝗮̂́𝘂 𝗰𝗮́𝗰𝗵 𝗻𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗢𝘂𝘁, 𝗕𝗮𝗻, 𝗨𝗻𝗯𝗮𝗻 𝗻𝗵𝗼́𝗺 𝗮̂́𝘆', event.threadID, (e, data) =>
                  global.client.handleReply.push({
                      name: this.config.name,
                      author: event.senderID,
                      messageID: data.messageID,
                      groupid,
                      groupName,
                      type: 'reply'
                  })
              )
          } catch (e) {
              return console.log(e)
          }
  }
};
