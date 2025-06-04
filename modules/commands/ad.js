module.exports.config = {
  name: "ad",
  version: "3.0.0",
  hasPermssion: 0,
  credit: "Kz Khánhh",
  description: "",
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
  if (thu == 'Sunday') thu = '𝐶ℎ𝑢̉ 𝑁ℎ𝑎̣̂𝑡';
  if (thu == 'Monday') thu = '𝑇ℎ𝑢̛́ 𝐻𝑎𝑖';
  if (thu == 'Tuesday') thu = '𝑇ℎ𝑢̛́ 𝐵𝑎';
  if (thu == 'Wednesday') thu = '𝑇ℎ𝑢̛́ 𝑇𝑢̛';
  if (thu == "Thursday") thu = '𝑇ℎ𝑢̛́ 𝑁𝑎̆𝑚';
  if (thu == 'Friday') thu = '𝑇ℎ𝑢̛́ 𝑆𝑎́𝑢';
  if (thu == 'Saturday') thu = '𝑇ℎ𝑢̛́ 𝐵𝑎̉𝑦';

  const KEY = ["bot của ai", "bot ai v", "qbinh", "admin", "Admin", "@quốc bình","qb","qbinh"];


  let thread = global.data.threadData.get(event.threadID) || {};

  if (KEY.includes(event.body.toLowerCase())) {
    let data = ["526214684778630", "526220108111421", "526214684778630", "526220108111421", "526220308111401", "526220484778050", "526220691444696", "526220814778017", "526220978111334", "526221104777988", "526221318111300", "526221564777942", "526221711444594", "526221971444568", "2523892817885618", "2523892964552270", "2523893081218925", "2523893217885578", "2523893384552228", "2523892544552312", "2523892391218994", "2523891461219087", "2523891767885723", "2523891204552446", "2523890691219164", "2523890981219135", "2523890374552529", "2523889681219265", "2523889851219248", "2523890051219228", "2523886944552872", "2523887171219516", "2523888784552688", "2523888217886078", "2523888534552713", "2523887371219496", "2523887771219456", "2523887571219476"];
    let sticker = data[Math.floor(Math.random() * data.length)];
    let data2 = [
      "𝐇𝐚𝐩𝐩𝐲=))", "𝐯𝐮𝐢 𝐯𝐞̉:𝟑", "𝐡𝐚̣𝐧𝐡 𝐩𝐡𝐮́𝐜 ❤", "𝐧𝐡𝐢𝐞̂̀𝐮 𝐧𝐢𝐞̂̀𝐦 𝐯𝐮𝐢 😘"
    ];
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
      "https://i.imgur.com/G0MzuT6.mp4",
      "https://i.imgur.com/D2yGLcQ.mp4",
      "https://i.imgur.com/ko2C706.mp4",
      "https://i.imgur.com/ixsDUWu.mp4",
    ];
    var callback = function () {
      api.sendMessage({
        body: `===『 𝗠𝗘𝗡𝗨 𝗗𝗜̣𝗖𝗛 𝗩𝗨̣ 』===\n━━━━━━━━━━━━━━━━\n→ 𝗫𝗶𝗻 𝗰𝗵𝗮̀𝗼 ${name}\n→ 𝗧𝗶𝗺𝗲:${gio}\n→ 𝗠𝗲𝗻𝘂 𝗮𝗹𝗹 𝗱𝗶̣𝗰𝗵 𝘃𝘂̣ \n→ 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁( 𝗛𝗼̂̉ 𝗧𝗿𝗼̛̣ 𝗔𝗱𝗺𝗶𝗻)\n→ 𝗠𝘂̛𝗼̛̣𝗻 𝗕𝗼𝗱𝗺𝗶𝗻\n→ 𝗡𝗵𝗮̣̂𝗻 𝘁𝗵𝗮𝘆 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗸𝗵𝗶 đ𝗮̃ 𝗺𝘂𝗮 𝗳𝗶𝗹𝗲 𝗯𝗼𝘁 \n━━━━━━━━━━━━━━━━\n=== 𝗧𝗵𝗼̂𝗻𝗴 𝗧𝗶𝗻 𝗔𝗱𝗺𝗶𝗻 ===\n→ 𝗧𝗲̂𝗻: Quốc Bình\n→ 𝗕𝗶𝗲̣̂𝘁 𝗱𝗮𝗻𝗵: qbinh moccutmui\n→ 𝗡𝗴𝗮̀𝘆 𝘀𝗶𝗻𝗵:23/06/2005\n→ 𝗖𝗵𝗶𝗲̂̀𝘂 𝗰𝗮𝗼: 1m66\n→ 𝗖𝗮̂𝗻 𝗻𝗮̣̆𝗻𝗴: 50kg\n→ 𝗙𝗯 𝗔𝗱𝗺𝗶𝗻:\nfb.com/100067191000400
❤️🩹 𝐌𝐨̣̂𝐭 𝐬𝐨̂́ 𝐥𝐮̛𝐮 𝐲́ 𝐤𝐡𝐢 𝐬𝐮̛̉ 𝐝𝐮̣𝐧𝐠 𝐛𝐨𝐭 
→ 𝗖𝗮̉𝗺 𝗼̛𝗻 vì đã đ𝗼̣𝗰`,
        attachment: fs.createReadStream(__dirname + "/cache/ad.mp4")
      }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ad.mp4"));
      api.sendMessage({
        body: ``,
        sticker: sticker
      }, event.threadID, event.messageID);
    };

    return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/ad.mp4")).on("close", () => callback());
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
