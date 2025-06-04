module.exports.config = {
    name: "leave",
    eventType: ["log:unsubscribe"],
    version: "2.0.0",
    credits: "🔥 Remake by Pcoder 🔥",
    description: "Thông báo thành viên rời nhóm kèm random ảnh/GIF/Video.",
    dependencies: {
        "fs-extra": "",
        "path": ""
    }
};

const checkttPath = __dirname + '/../commands/checktuongtac/';

module.exports.onLoad = function () {
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];

    const path = join(__dirname, "cache", "leaveGif");
    if (!existsSync(path)) mkdirSync(path, { recursive: true });

    const path2 = join(path, "randomgif");
    if (!existsSync(path2)) mkdirSync(path2, { recursive: true });
};

module.exports.run = async function ({ api, event, Users, Threads }) {
    if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;
    
    const { createReadStream, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } = global.nodemodule["fs-extra"];
    const { join } = global.nodemodule["path"];
    const { threadID } = event;
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");

    const data = global.data.threadData.get(parseInt(threadID)) || (await Threads.getData(threadID)).data;
    const iduser = event.logMessageData.leftParticipantFbId;
    const name = global.data.userName.get(iduser) || await Users.getNameUser(iduser);
    const type = (event.author == iduser) ? "🌀 𝘁𝘂̛̣ 𝗿𝗼̛̛̀𝗶 𝗸𝗵𝗼̉𝗶 𝗯𝗼𝘅" : "💥 𝗯𝗶̣ 𝗾𝘂𝗮̉𝗻 𝘁𝗿𝗶̣ 𝘀𝘂́𝘁 𝗯𝗮𝘆";

    // Cập nhật dữ liệu tương tác nếu có
    if (existsSync(checkttPath + threadID + '.json')) {
        const threadData = JSON.parse(readFileSync(checkttPath + threadID + '.json'));
        ["week", "day", "total"].forEach(key => {
            const index = threadData[key].findIndex(e => e.id == iduser);
            if (index !== -1) threadData[key].splice(index, 1);
        });
        writeFileSync(checkttPath + threadID + '.json', JSON.stringify(threadData, null, 4));
    }

    // Nội dung thông báo
    const msgTemplate = `
📢 | 『 𝗧𝗛𝗔̀𝗡𝗛 𝗩𝗜𝗘̂𝗡 𝗥𝗢̛̀𝗜 𝗡𝗛𝗢́𝗠 』\n━━━━━━━━━━━━━\n
👤 | 𝗧𝗲̂𝗻: {name}\n🆔 | 𝗜𝗗: {iduser}\n💢 | 𝗧𝗿𝗮̣𝗻𝗴 𝘁𝗵𝗮́𝗶: {type}\n
🔗 | 𝗣𝗿𝗼𝗳𝗶𝗹𝗲: https://m.facebook.com/{iduser}\n
⏰ | 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: {time}\n━━━━━━━━━━━━━\n
🚀 | 𝗖𝗵𝘂́𝗰 𝗯𝗮̣𝗻 𝗰𝗼̂́ 𝗴𝗮̆́𝗻𝗴 𝗴𝗶𝗮̉𝗶 𝗻𝗴𝗵𝗶𝗲̣̂𝗽, 𝗵𝗲𝗻 𝗴𝗮̣̆𝗽 𝗹𝗮̣𝗶 𝗮𝗻𝗵 𝗲𝗺 𝘁𝗿𝗼𝗻𝗴 𝗺𝗼̣̂𝘁 𝗱𝗶̣𝗽 𝗸𝗵𝗮́𝗰! 🍑
`;

    var msg = msgTemplate.replace(/\{name}/g, name).replace(/\{type}/g, type).replace(/\{iduser}/g, iduser).replace(/\{time}/g, time);

    // Lấy random ảnh/GIF/Video
    const path = join(__dirname, "cache", "leaveGif");
    const gifPath = join(path, `${threadID}.gif`);
    const randomPath = readdirSync(join(path, "randomgif"));

    let formPush;
    if (existsSync(gifPath)) formPush = { body: msg, attachment: createReadStream(gifPath) };
    else if (randomPath.length !== 0) {
        const pathRandom = join(path, "randomgif", `${randomPath[Math.floor(Math.random() * randomPath.length)]}`);
        formPush = { body: msg, attachment: createReadStream(pathRandom) };
    } else formPush = { body: msg };

    return api.sendMessage(formPush, threadID);
};
