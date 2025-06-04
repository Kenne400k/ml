module.exports.config = {
    name: "botMonitor",
    version: "1.3.1",
    hasPermssion: 0,
    credits: "Pcoder",
    description: "Theo dõi bot bị kick, được thêm vào nhóm hoặc khi admin bị tag",
    commandCategory: "Hệ thống",
    usages: "[list]",
    cooldowns: 5,
};

const fs = require("fs");
const configPath = "./config.json";
const dataPath = "./data/botMonitor.json";

// 🛠️ **Hàm khởi tạo data nếu chưa có**
function initData() {
    if (!fs.existsSync("./data")) fs.mkdirSync("./data");
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, JSON.stringify({ groups: {} }, null, 4));
        console.log("✅ Đã tạo file `botMonitor.json`!");
    }
}

// 🏷️ **Đọc danh sách admin từ `config.json`**
function getAdmins() {
    if (!fs.existsSync(configPath)) return { ADMINBOT: [], NDH: [] };
    return JSON.parse(fs.readFileSync(configPath));
}

// 🔄 **Khởi tạo data trước khi chạy**
initData();

module.exports.handleEvent = async function ({ api, event }) {
    const { threadID, senderID, mentions, logMessageType, logMessageData } = event;
    const configData = getAdmins();
    const ADMIN_ID = [...configData.ADMINBOT, ...configData.NDH].filter(uid => uid);

    let data = JSON.parse(fs.readFileSync(dataPath));

    // 🏷️ **Khi ai đó tag admin**
    if (mentions && Object.keys(mentions).length > 0) {
        const taggedAdmins = ADMIN_ID.filter(id => Object.keys(mentions).includes(id));
        if (taggedAdmins.length > 0) {
            taggedAdmins.forEach(admin => {
                api.sendMessage(
                    `⚠️ **Có người tag mày trong nhóm ID: ${threadID}**\n📝 **Nội dung:** "${event.body}"`,
                    admin
                );
            });
        }
    }

    // ➕ **Khi bot được thêm vào nhóm**
    if (logMessageType === "log:subscribe" && logMessageData.addedParticipants.some(user => user.userFbId == api.getCurrentUserID())) {
        const groupInfo = await api.getThreadInfo(threadID);
        const adderID = senderID;
        let adderName = "Không rõ";

        try {
            const userInfo = await api.getUserInfo(adderID);
            adderName = userInfo[adderID]?.name || "Không rõ";
        } catch (err) {
            console.error(`❌ Lỗi lấy tên người thêm bot:`, err);
        }

        data.groups[threadID] = {
            name: groupInfo.threadName || "Không có tên",
            members: groupInfo.participantIDs.length,
            addedBy: { id: adderID, name: adderName },
            lastEvent: "Bot được thêm vào"
        };
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));

        ADMIN_ID.forEach(admin => {
            api.sendMessage(
                `➕ **Bot vừa được thêm vào nhóm**\n🏷️ **Tên:** ${groupInfo.threadName}\n📌 **ID nhóm:** ${threadID}\n👥 **Số thành viên:** ${groupInfo.participantIDs.length}\n👤 **Người thêm:** ${adderName} (${adderID})`,
                admin
            );
        });
    }

    // ❌ **Khi bot bị kick khỏi nhóm**
    if (logMessageType === "log:unsubscribe" && logMessageData.leftParticipantFbId == api.getCurrentUserID()) {
        const groupName = data.groups[threadID]?.name || "Không có tên";
        data.groups[threadID] = {
            name: groupName,
            lastEvent: "Bot bị kick"
        };
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));

        ADMIN_ID.forEach(admin => {
            api.sendMessage(
                `❌ **Bot bị kick khỏi nhóm**\n🏷️ **Tên nhóm:** ${groupName}\n📌 **ID nhóm:** ${threadID}\n👤 **Người kick:** ${senderID}`,
                admin
            );
        });
    }
};

// 📝 **Lệnh xem danh sách nhóm**
module.exports.run = async function ({ api, event }) {
    const { threadID, senderID } = event;
    const configData = getAdmins();
    const ADMIN_ID = [...configData.ADMINBOT, ...configData.NDH].filter(uid => uid);

    if (!ADMIN_ID.includes(senderID)) return api.sendMessage("🚫 **Mày đ** có quyền xài lệnh này!**", threadID);

    const data = JSON.parse(fs.readFileSync(dataPath));
    const groups = Object.keys(data.groups);

    if (!groups.length) return api.sendMessage("📌 | **Không có nhóm nào được lưu trong hệ thống!**", threadID);

    let list = `📜 **DANH SÁCH NHÓM BOT ĐANG Ở** 📜\n\n`;
    let count = 0;

    for (const id of groups) {
        const group = data.groups[id];
        count++;
        list += `➤ **${count}. 𝑵𝒉𝒐́𝒎:** 『${group.name}』\n📌 **ID:** ${id}\n👥 **Thành viên:** ${group.members || "Không rõ"}\n👤 **Người thêm:** ${group.addedBy?.name || "Không rõ"} (${group.addedBy?.id || "???"})\n🔥 **Trạng thái:** ${group.lastEvent}\n\n`;
    }

    return api.sendMessage(list, threadID);
};
