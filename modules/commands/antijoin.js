module.exports.config = {
    name: "antijoin",
    version: "2.0.0",
    credits: "Remake by ✨ Pcoder ✨",
    hasPermssion: 1,
    description: "🔥 Bật/tắt chế độ cấm thành viên mới vào nhóm!",
    usages: "[on/off]",
    commandCategory: "⚙️ Quản lý nhóm",
    cooldowns: 5
};

module.exports.run = async ({ api, event, Threads, args }) => {
    const { threadID, messageID } = event;
    const info = await api.getThreadInfo(threadID);

    // Kiểm tra bot có quyền admin không
    if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) 
        return api.sendMessage("❌ | 𝗕𝗼𝘁 𝗰𝗮̂̀𝗻 𝗾𝘂𝘆𝗲̂̀𝗻 𝗤𝗨𝗔̉𝗡 𝗧𝗥𝗜̣ 𝗩𝗜𝗘̂𝗡 đ𝗲̂̉ 𝘀𝘂̛̉ 𝗱𝘂̣𝗻𝗴 𝗹𝗲̣̂𝗻𝗵 𝗻𝗮̀𝘆!", threadID, messageID);

    let data = (await Threads.getData(threadID)).data || {};

    // Kiểm tra tham số nhập vào
    if (args.length === 0) 
        return api.sendMessage("⚠️ | 𝗖𝘂́ 𝗽𝗵𝗮́𝗽 𝘀𝗮𝗶! 𝗗𝘂̀𝗻𝗴: /antijoin on 𝗵𝗼𝗮̣̆𝗰 /antijoin off", threadID, messageID);

    if (args[0] === "on") {
        data.newMember = true;
    } else if (args[0] === "off") {
        data.newMember = false;
    } else {
        return api.sendMessage("⚠️ | 𝗦𝗮𝗶 𝗰𝘂́ 𝗽𝗵𝗮́𝗽! 𝗗𝘂̀𝗻𝗴: /antijoin on 𝗵𝗼𝗮̣̆𝗰 /antijoin off", threadID, messageID);
    }

    await Threads.setData(threadID, { data });
    global.data.threadData.set(parseInt(threadID), data);

    return api.sendMessage(`🔒 | 𝗖𝗵𝗲̂́ đ𝗼̣̂ 𝗔𝗻𝘁𝗶𝗝𝗼𝗶𝗻 đ𝗮̃ 𝗰𝗵𝘂𝘆𝗲̂̉𝗻 𝘀𝗮𝗻𝗴 𝗺𝗼𝗱𝗲: ${(data.newMember) ? "🟢 𝗕𝗔̣̂𝗧" : "🔴 𝗧𝗔̆́𝗧"}!`, threadID, messageID);
};
