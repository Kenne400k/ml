module.exports.config = {
    name: "antijoin",
    eventType: ["log:subscribe"],
    version: "2.0.0",
    credits: "Remake by ✨ Pcoder ✨",
    description: "🔥 Cấm thành viên mới vào nhóm tự động!"
};

module.exports.run = async function ({ event, api, Threads, Users }) {
    let data = (await Threads.getData(event.threadID)).data;
    if (!data.newMember) return;

    // Kiểm tra nếu bot bị add vào thì không kick
    if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) return;

    let memJoin = event.logMessageData.addedParticipants.map(info => info.userFbId);
    let msg = "🚫 | 𝗔𝗻𝘁𝗶𝗝𝗼𝗶𝗻 𝗔𝗰𝘁𝗶𝘃𝗲!\n\n";

    for (let idUser of memJoin) {
        let userName = await Users.getNameUser(idUser) || "Không xác định";
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        api.removeUserFromGroup(idUser, event.threadID, async function (err) {
            if (err) return data["newMember"] = false;
            await Threads.setData(event.threadID, { data });
            global.data.threadData.set(event.threadID, data);
        });

        msg += `👤 𝗧𝗲̂𝗻: ${userName}\n🆔 𝗜𝗗: ${idUser}\n⚠️ 𝗧𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻 𝗺𝗼̛́𝗶 𝗯𝗶̣ 𝗸𝗶𝗰𝗸!\n\n`;
    }

    msg += "💡 | 𝗡𝗲̂́𝘂 𝗺𝘂𝗼̂́𝗻 𝗯𝗮̣̂𝘁 𝗹𝗮̣𝗶, 𝗱𝘂̀𝗻𝗴: /antijoin off";

    return api.sendMessage(msg, event.threadID);
};
