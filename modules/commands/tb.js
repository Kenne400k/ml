const fs = require('fs');
const request = require('request');

module.exports.config = {
    name: "tb",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "TruongMini mod by Ryo",
    description: "",
    commandCategory: "Admin",
    usages: "",
    cooldowns: 5,
}

let atmDir = [];

const getAtm = (atm, body) => new Promise(async (resolve) => {
    let msg = {}, attachment = [];
    msg.body = body;
    for(let eachAtm of atm) {
        await new Promise(async (resolve) => {
            try {
                let response =  await request.get(eachAtm.url),
                    pathName = response.uri.pathname,
                    ext = pathName.substring(pathName.lastIndexOf(".") + 1),
                    path = __dirname + `/cache/${eachAtm.filename}.${ext}`
                response
                    .pipe(fs.createWriteStream(path))
                    .on("close", () => {
                        attachment.push(fs.createReadStream(path));
                        atmDir.push(path);
                        resolve();
                    })
            } catch(e) { console.log(e); }
        })
    }
    msg.attachment = attachment;
    resolve(msg);
})

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads }) {
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, body } = event;
    let name = await Users.getNameUser(senderID);
    switch (handleReply.type) {
        case "sendnoti": {
            let text = `[❗] • 𝐑𝐞𝐩𝐥𝐲 𝐓𝐮̛̀ 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠\n\n▱▱▱▱▱▱▱▱\n[ 👤 ] ➝ ${name}\n[ 🏢 ] ➝ ${(await Threads.getInfo(threadID)).threadName || "Unknow"};\n\n${body}\n\n[ 𝐓𝐆 ] ➝ ${gio}\n▱▱▱▱▱▱▱▱\n[❗] • 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐒𝐞̃ 𝐐𝐮𝐚 𝐔𝐬𝐞𝐫 𝐍𝐞̂́𝐮 𝐁𝐚̣𝐧 𝐑𝐞𝐩𝐥𝐲 !`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `[❗] • 𝐑𝐞𝐩𝐥𝐲 𝐓𝐮̛̀ 𝐍𝐠𝐮̛𝐨̛̀𝐢 𝐃𝐮̀𝐧𝐠\n\n▱▱▱▱▱▱▱▱\n[ 👤 ] ➝ ${name}\n[ 🏢 ] ➝ ${(await Threads.getInfo(threadID)).threadName || "Unknow"};\n\n${body}\n\n[ 𝐓𝐆 ] ➝ ${gio}\n▱▱▱▱▱▱▱▱\n[❗] • 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐒𝐞̃ 𝐐𝐮𝐚 𝐔𝐬𝐞𝐫 𝐍𝐞̂́𝐮 𝐁𝐚̣𝐧 𝐑𝐞𝐩𝐥𝐲 !`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "reply",
                    messageID: info.messageID,
                    messID: messageID,
                    threadID
                })
            });
            break;
        }
        case "reply": {
            let text = `[❗] • 𝐑𝐞𝐩𝐥𝐲 𝐓𝐮̛̀ 𝐀𝐝𝐦𝐢𝐧\n\n▱▱▱▱▱▱▱▱\n[ 👤 ] ➝ ${name}${body}\n[ 🏢 ] ➝ ${(await Threads.getInfo(threadID)).threadName || "Unknow"};\n\n${body}\n\n[ 𝐓𝐆 ] ➝ ${gio}\n▱▱▱▱▱▱▱▱\n[❗] • 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐒𝐞̃ 𝐐𝐮𝐚 𝐔𝐬𝐞𝐫 𝐍𝐞̂́𝐮 𝐁𝐚̣𝐧 𝐑𝐞𝐩𝐥𝐲 !`;
            if(event.attachments.length > 0) text = await getAtm(event.attachments, `${body}[❗] • 𝐑𝐞𝐩𝐥𝐲 𝐓𝐮̛̀ 𝐀𝐝𝐦𝐢𝐧\n\n▱▱▱▱▱▱▱▱\n[ 👤 ] ➝ ${name}${body}\n[ 🏢 ] ➝ ${(await Threads.getInfo(threadID)).threadName || "Unknow"};\n\n${body}\n\n[ 𝐓𝐆 ] ➝ ${gio}\n▱▱▱▱▱▱▱▱\n[❗] • 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐒𝐞̃ 𝐐𝐮𝐚 𝐔𝐬𝐞𝐫 𝐍𝐞̂́𝐮 𝐁𝐚̣𝐧 𝐑𝐞𝐩𝐥𝐲 !`);
            api.sendMessage(text, handleReply.threadID, (err, info) => {
                atmDir.forEach(each => fs.unlinkSync(each))
                atmDir = [];
                global.client.handleReply.push({
                    name: this.config.name,
                    type: "sendnoti",
                    messageID: info.messageID,
                    threadID
                })
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.run = async ({ api, event, args, getText, Users }) => {
  const permission = ["","100078366524561","100067191000400"]; //nếu muốn thêm uid thì thêm ,"uid" sau mỗi hàng
             if (!permission.includes(event.senderID))
             return api.sendMessage("[❗] ➝ 𝐇𝐢𝐞̣̂𝐧 𝐓𝐚̣𝐢 𝐁𝐚̣𝐧 𝐊𝐡𝐨̂𝐧𝐠 𝐂𝐨́ 𝐐𝐮𝐲𝐞̂̀𝐧 𝐒𝐮̛̉ 𝐃𝐮̣𝐧𝐠 [ tb ]\n• 𝐍𝐚̂𝐧𝐠 𝐐𝐮𝐲𝐞̂̀𝐧 𝐇𝐚̣𝐧 𝐋𝐢𝐞̂𝐧 𝐇𝐞̣̂ 𝐀𝐝𝐦𝐢𝐧 !!!\n• 𝐅𝐁   ➝ https://www.facebook.com/binkoi2306", event.threadID, event.messageID); // get tn
  const name = await Users.getNameUser(event.senderID)
    const moment = require("moment-timezone");
      var gio = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY - HH:mm:s");
    const { threadID, messageID, senderID, messageReply } = event;
    if (!args[0]) return api.sendMessage("Please input message", threadID);
    let allThread = global.data.allThreadID || [];
    let can = 0, canNot = 0;
    let text = `[❗] • 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐓𝐮̛̀ 𝐀𝐝𝐦𝐢𝐧\n\n▱▱▱▱▱▱▱▱\n[ 𝐀𝐃 ] ➝ ${await Users.getNameUser(senderID)}\n\n\n${args.join(" ")}\n\n[ 𝐓𝐆 ] ➝ ${gio}\n▱▱▱▱▱▱▱▱\n[❗] • 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐒𝐞̃ 𝐐𝐮𝐚 𝐀𝐝𝐦𝐢𝐧 𝐍𝐞̂́𝐮 𝐁𝐚̣𝐧 𝐑𝐞𝐩𝐥𝐲 !`;
    if(event.type == "message_reply") text = await getAtm(messageReply.attachments, `[❗] • 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐓𝐮̛̀ 𝐀𝐝𝐦𝐢𝐧\n\n▱▱▱▱▱▱▱▱\n[ 𝐀𝐃 ] ➝ ${await Users.getNameUser(senderID)}\n\n\n${args.join(" ")}\n\n[ 𝐓𝐆 ] ➝ ${gio}\n▱▱▱▱▱▱▱▱\n[❗] • 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐒𝐞̃ 𝐐𝐮𝐚 𝐀𝐝𝐦𝐢𝐧 𝐍𝐞̂́𝐮 𝐁𝐚̣𝐧 𝐑𝐞𝐩𝐥𝐲 !`);
    await new Promise(resolve => {
        allThread.forEach((each) => {
            try {
                api.sendMessage(text, each, (err, info) => {
                    if(err) { canNot++; }
                    else {
                        can++;
                        atmDir.forEach(each => fs.unlinkSync(each))
                        atmDir = [];
                        global.client.handleReply.push({
                            name: this.config.name,
                            type: "sendnoti",
                            messageID: info.messageID,
                            messID: messageID,
                            threadID
                        })
                        resolve();
                    }
                })
            } catch(e) { console.log(e) }
        })
    })
    api.sendMessage(`𝐆𝐮̛̉𝐢 𝐓𝐡𝐚̀𝐧𝐡 𝐂𝐨̂𝐧𝐠 𝐓𝐢𝐧 𝐍𝐡𝐚̆́𝐧 𝐂𝐡𝐨 𝐀𝐥𝐥 𝐁𝐨𝐱 🐲`, threadID);
} 
// mod