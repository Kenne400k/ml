module.exports.config = {
    name: "out",
    version: "2.0.0",
    hasPermission: 2,
    credits: "Sang Nguyễn (mod by Pcoder)",
    description: "🚪 Lệnh rời nhóm một cách gọn gàng",
    commandCategory: "⚙️ Admin",
    usages: "/out [tid]",
    cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_Minh").format("🕒 HH:mm:ss || 📅 DD/MM/YYYY");
    
    let id = args[0] ? parseInt(args[0]) : event.threadID;

    const outMsg = `🚪 『 𝗧𝗛𝗢𝗔́𝗧 𝗡𝗛𝗢́𝗠 』 🚪
━━━━━━━━━━━━━━━
🎯 𝗬𝗲̂𝘂 𝗰𝗮̂̀𝘂 𝘁𝘂̛̀: 𝗔𝗱𝗺𝗶𝗻  
🆔 𝗜𝗗 𝗻𝗵𝗼́𝗺: ${id}
🕒 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${time}
━━━━━━━━━━━━━━━`;

    api.sendMessage(outMsg, id, () => {
        api.removeUserFromGroup(api.getCurrentUserID(), id);
        api.sendMessage(`💨 『 𝗧𝗛𝗢𝗔́𝗧 𝗡𝗛𝗢́𝗠 𝗧𝗛𝗔̀𝗡𝗛 𝗖𝗢̂𝗡𝗚 』 💨\n🆔 𝗜𝗗: ${id}\n🕒 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: ${time}`, event.threadID, event.messageID);
    });
};
