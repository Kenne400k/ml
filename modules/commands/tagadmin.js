const fs = require('fs');
const moment = require('moment-timezone');
module.exports.config = {
    name: "tagadmin", // Tên lệnh, được sử dụng trong việc gọi lệnh
    version: "1.0.0", // phiên bản của module này
    hasPermssion: 1, // Quyền hạn sử dụng, với 0 là toàn bộ thành viên, 1 là quản trị viên trở lên, 2 là admin/owner
    credits: "hi<@shibaSama>", // TruongMini
    description: "Tag!!", // Thông tin chi tiết về lệnh
    commandCategory: "Tiện ích", // Thuộc vào nhóm nào: system, other, game-sp, game-mp, random-img, edit-img, media, economy, ...
    usages: "[msg]", // Cách sử dụng lệnh
    cooldowns: 5 // Thời gian một người có thể lặp lại lệnh
};  

module.exports.handleReply = async function ({ api, event, handleReply, Users, Threads, args }) {
let uid = event.senderID;
var msg = [`ljkj`];
    const { threadID, messageID, body } = event;
    switch (handleReply.type) {
        case "tagadmin": {
            let name = await Users.getNameUser(handleReply.author);
            api.sendMessage(`==== [ Admin Phản Hồi ] ==== \n──────────────────\n💬 Nội dung: ${body}\n👤 Admin: ${name || "Người dùng facebook"}\n🌐 Facebook: https://www.facebook.com/profile.php?id=${event.senderID}\n👑 Nơi gửi: ${event.isGroup == true ? 'Nhóm ' + global.data.threadInfo.get(event.threadID).threadName: 'từ cuộc trò chuyện riêng với bot '} \n⏰ Time: ${moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY")}\n→ Reply tin nhắn ( Phản hồi ) về admin `, handleReply.threadID, (err, info) => {
                if(err) console.log(err)
                else {
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: "reply",
                        messageID: info.messageID,
                        messID: messageID,
                        threadID
                    })
                }
            }, handleReply.messID);
            break;
        }
        case "reply": {
            let name = await Users.getNameUser(event.senderID);
            api.sendMessage(`===== 𝗨𝗦𝗘𝗥 𝗙𝗘𝗘𝗗𝗕𝗔𝗖𝗞 =====\n──────────────────\n💬 Nội dung: ${body}\n👤 Tên: ${name || "Người dùng facebook"}\n🌐 Link fb: https://www.facebook.com/profile.php?id=${event.senderID}\n👨‍👩‍👧‍👦 Box : ${(await Threads.getInfo(threadID)).threadName || "Tên nhóm không tồn tại"}\n⏰ Time: ${moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY")}\n→ Reply tin nhắn ( phản hồi ) lại người tag`, handleReply.threadID, (err, info) => {
                if(err) console.log(err)
                else {
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: "tagadmin",
                        messageID: info.messageID,
                        messID: messageID,
                        threadID
                    })
                }
            }, handleReply.messID);
            break;
        }
    }
}

module.exports.handleEvent = async ({ api, event, Users, Threads, args }) => {
    const { threadID, messageID, body, mentions, senderID } = event;
    let path = __dirname + "/cache/tagadmin.json";
    if(!fs.existsSync(path)) fs.writeFileSync(path, "{}");
    let data = JSON.parse(fs.readFileSync(path));
    if(!data[threadID]) data[threadID] = true;
    if(!mentions || !data[threadID]) return;
    let mentionsKey = Object.keys(mentions);
    let allAdmin = global.config.ADMINBOT;
    mentionsKey.forEach(async (each) => {
        if(each == api.getCurrentUserID()) return;
        if(allAdmin.includes(each)) {
            let userName = await Users.getNameUser(senderID);
            let threadName = await Threads.getInfo(threadID).threadName;
            api.sendMessage(`===== [ 𝗧𝗔𝗚 𝗔𝗗𝗠𝗜𝗡 ] =====\n──────────────────\n👤 Người tag: ${userName}\n🌐 Link fb: https://www.facebook.com/profile.php?id=${event.senderID}\n👨‍👩‍👧‍👦 Box: ${(await Threads.getInfo(threadID)).threadName || "Tên nhóm không tồn tại"}\n💬 Nội dung: ${body}\n⏰ Time: ${moment().tz("Asia/Ho_Chi_Minh").format("HH:mm:ss - DD/MM/YYYY")}\n→ Reply tin nhắn ( Phản hồi ) lại người tag`,each, (err, info) => {
                if(err) console.log(err)
                else {
                    global.client.handleReply.push({
                        name: this.config.name,
                        type: "tagadmin",
                        messageID: info.messageID,
                        messID: messageID,
                        author: each,
                        threadID
                    })
                }
            })
        }
    })
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
}

module.exports.run = async ({ api, event, args }) => {
const fs = require("fs");
    const { threadID } = event;
    let path = __dirname + "/cache/tagadmin.json";
    if(!fs.existsSync(path)) fs.writeFileSync(path, "{}");
    let data = JSON.parse(fs.readFileSync(path));
    if(!data[threadID]) data[threadID] = true;
    if(args[0] == "off") data[threadID] = false;
    else if(args[0] == "on") data[threadID] = true;
    else return api.sendMessage(`Vui lòng bật tagadmin On hoặc Off`, event.threadID, event.messageID);
    fs.writeFileSync(path, JSON.stringify(data, null, 4));
    return api.sendMessage(`Tag Admin đã được ${data[threadID] ? "Bật" : "Tắt"}`, event.threadID, event.messageID);
}