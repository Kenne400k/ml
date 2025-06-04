module.exports.config = {
  name: "hi",
  version: "3.0.0",
  hasPermssion: 0,
  credit: "Miuu Linhh",
  description: "hi gửi sticker and hình ảnh",
  commandCategory: "Nhóm",
  usages: "[text]",
  cooldowns: 5
};

module.exports.handleEvent = async ({ api, event, Threads, Users }) => {
  const axios = require('axios');
  const request = require('request');
  const fs = require("fs");
  const moment = require("moment-timezone");
  const gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
  let thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = '𝐶ℎ𝑢̉ 𝑁ℎ𝑎̣̂𝑡'
if (thu == 'Monday') thu = '𝑇ℎ𝑢̛́ 𝐻𝑎𝑖 '
if (thu == 'Tuesday') thu = '𝑇ℎ𝑢̛́ 𝐵𝑎'
if (thu == 'Wednesday') thu = '𝑇ℎ𝑢̛́ 𝑇𝑢̛'
if (thu == "Thursday") thu = '𝑇ℎ𝑢̛́ 𝑁𝑎̆𝑚'
if (thu == 'Friday') thu = '𝑇ℎ𝑢̛́ 𝑆𝑎́𝑢'
if (thu == 'Saturday') thu = '𝑇ℎ𝑢̛́ 𝐵𝑎̉𝑦'

  let KEY = ["hello", "hi", "hai", "chào", "chao", "hí", "híí", "hì", "hìì", "lô", "hii", "helo", "hê nhô"];

  let thread = global.data.threadData.get(event.threadID) || {};
 // if (typeof thread["hi"] === "undefined" || thread["hi"] === false) return;
 // else {
    if (KEY.includes(event.body.toLowerCase())) {
      let data = ["526214684778630", "526220108111421","526214684778630","526220108111421","526220308111401","526220484778050","526220691444696","526220814778017","526220978111334","526221104777988","526221318111300","526221564777942","526221711444594","526221971444568","2523892817885618","2523892964552270","2523893081218925","2523893217885578","2523893384552228","2523892544552312","2523892391218994","2523891461219087","2523891767885723","2523891204552446","2523890691219164","2523890981219135","2523890374552529","2523889681219265","2523889851219248","2523890051219228","2523886944552872","2523887171219516","2523888784552688","2523888217886078","2523888534552713","2523887371219496","2523887771219456","2523887571219476" ];
      let sticker = data[Math.floor(Math.random() * data.length)];
      let data2 = [
        "𝐇𝐚𝐩𝐩𝐲=))", "𝐯𝐮𝐢 𝐯𝐞̉:𝟑", "𝐡𝐚̣𝐧𝐡 𝐩𝐡𝐮́𝐜 ❤", "𝐧𝐡𝐢𝐞̂̀𝐮 𝐧𝐢𝐞̂̀𝐦 𝐯𝐮𝐢 😘"
      ];
      let tet2 = ["𝐛𝐢̀𝐧𝐡 𝐚𝐧", "𝐚𝐧 𝐥𝐚̀𝐧𝐡", "𝐦𝐚𝐲 𝐦𝐚̆́𝐧"];
      let tet = tet2[Math.floor(Math.random() * tet2.length)];
      let text = data2[Math.floor(Math.random() * data2.length)];

      let hours = parseInt(moment().tz("Asia/Ho_Chi_Minh").format("HH"));
      let session =
        (hours > 0 && hours <= 4 ? "𝐬𝐚́𝐧𝐠 𝐭𝐢𝐧𝐡 𝐦𝐨̛" :
          hours > 4 && hours <= 7 ? "𝐬𝐚́𝐧𝐠 𝐬𝐨̛́𝐦" :
            hours > 7 && hours <= 10 ? "𝐬𝐚́𝐧𝐠" :
              hours > 10 && hours <= 12 ? "𝐭𝐫𝐮̛𝐚" :
                hours > 12 && hours <= 17 ? "𝐜𝐡𝐢𝐞̂̀𝐮" :
                  hours > 17 && hours <= 18 ? "𝐜𝐡𝐢𝐞̂̀𝐮 𝐭𝐚̀" :
                    hours > 18 && hours <= 21 ? "𝐭𝐨̂́𝐢" :
                      hours > 21 && hours <= 24 ? "𝐭𝐨̂́𝐢 𝐦𝐮𝐨̣̂𝐧" :
                        "lỗi");

      let name = await Users.getNameUser(event.senderID);
      let mentions = [{
        tag: name,
        id: event.senderID
      }];

      var link = [
"https://i.imgur.com/6JRdaSg.mp4",
"https://i.imgur.com/Ogs6CZL.mp4",
"https://i.imgur.com/egBmRcy.mp4",
"https://i.imgur.com/SlF6GyD.mp4",
"https://i.imgur.com/d6Lgz4o.mp4",
"https://i.imgur.com/KobrMfL.mp4", "https://i.imgur.com/Z3kBkhP.mp4",
"https://i.imgur.com/pePsSsm.mp4",
"https://i.imgur.com/NdBtTAD.mp4",
        "https://i.imgur.com/Yui0M6w.mp4",
        "https://i.imgur.com/kp03vT9.mp4",
"https://i.imgur.com/NbBmuuj.mp4",
        "https://i.imgur.com/MnlpHth.mp4",
"https://i.imgur.com/L3rndR7.mp4",
        "https://i.imgur.com/f6wNMhB.mp4",
        "https://i.imgur.com/47MkkdC.mp4",
        "https://i.imgur.com/XvfQv60.mp4",
        "https://i.imgur.com/f2nTYCG.mp4",
"https://i.imgur.com/bvXUn6h.mp4",  
"https://i.imgur.com/8XbaNvw.mp4",    "https://i.imgur.com/An9Cs87.mp4",
        "https://i.imgur.com/m0NysAt.mp4",
        "https://i.imgur.com/AbwEfaf.mp4",
        "https://i.imgur.com/T7kXN4I.mp4",
        "https://i.imgur.com/MqESmht.mp4",
        "https://i.imgur.com/mwbcecD.mp4",
        "https://i.imgur.com/Ccg2rr2.mp4",
        "https://i.imgur.com/hR1foVN.mp4",
        "https://i.imgur.com/Q8UDUrv.mp4",
        "https://i.imgur.com/vLg9lUT.mp4",
        "https://i.imgur.com/D5QiMeZ.mp4",
        "https://i.imgur.com/Vqes4h3.mp4",
      ];
      var callback = function () {
        api.sendMessage({
          body: `🎆🎇『 𝐀𝐔𝐓𝐎𝐍𝐎𝐓𝐈 』🎇🎆\n╞═════𖠁🌸𖠁═════╡\n『👤』𝐇𝐞𝐥𝐥𝐨 𝐛𝐞́ ${name} 𝐜𝐮𝐭𝐢\n『🧧』𝐂𝐡𝐮́𝐜 𝐦𝐨̣̂𝐭 𝐛𝐮𝐨̂̉𝐢 ${session} ${text}, 𝐦𝐨̣̂𝐭 𝐧𝐚̆𝐦 𝐦𝐨̛́𝐢 ${tet}🍀\n『⏳』𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${thu} ${gio}`,
          attachment: fs.createReadStream(__dirname + "/cache/5.mp3")
        }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.mp3"));
        api.sendMessage({
          body: ``,
          sticker: sticker
        }, event.threadID, event.messageID);
      };

      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/5.mp3")).on("close", () => callback());
    }

  };

module.exports.languages = {
  "vi": {
    "on": "Bật",
    "off": "Tắt",
    "successText": `${this.config.name} thành công`,
  },
  "en": {
    "on": "on",
    "off": "off",
    "successText": "success!",
  }
};

module.exports.run = async ({ event, api, Threads, getText }) => {
  let {
    threadID,
    messageID
  } = event;
  let data = (await Threads.getData(threadID)).data;
  if (typeof data["hi"] === "undefined" || data["hi"] === true) data["hi"] = false;
  else data["hi"] = true;
  await Threads.setData(threadID, {
    data
  });
  global.data.threadData.set(threadID, data);
  return api.sendMessage(`${(data["hi"] === false) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
