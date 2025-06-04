const fs = require("fs");
const login = require("../../Fca-Horizon-Remastered-main"); // Import FCA từ thư mục cha
const APPSTATE_PATH = "../../appstate.json"; // Đường dẫn appstate.json

let api = null;

// Đăng nhập Facebook
async function loginFacebook() {
    if (!fs.existsSync(APPSTATE_PATH)) {
        console.error("❌ Không tìm thấy appstate.json!");
        return null;
    }

    try {
        const appState = JSON.parse(fs.readFileSync(APPSTATE_PATH, "utf8"));
        api = await login({ appState });
        console.log("✅ Đăng nhập Facebook thành công!");
        return api;
    } catch (err) {
        console.error("❌ Lỗi đăng nhập Facebook:", err);
        return null;
    }
}

// Lấy danh sách tin nhắn chờ
async function getPendingThreads() {
    if (!api) return { message: "⚠️ Bot chưa đăng nhập Facebook!", data: [] };
    try {
        const pendingThreads = await api.getThreadList(10, null, ["PENDING"]);
        if (pendingThreads.length === 0) return { message: "✅ Không có tin nhắn chờ nào!", data: [] };

        let message = `📌 **Có ${pendingThreads.length} nhóm trong tin nhắn chờ!**\n\n`;
        let indexMap = {};
        pendingThreads.forEach((thread, index) => {
            message += `🔹 **${index + 1}.** ${thread.name || "Không có tên"}\n📍 ID: ${thread.threadID}\n📩 Tin nhắn chờ: ${thread.unreadCount}\n\n`;
            indexMap[index + 1] = thread.threadID;
        });

        return { message, data: indexMap };
    } catch (err) {
        console.error("❌ Lỗi lấy tin nhắn chờ:", err);
        return { message: "⚠️ Lỗi lấy tin nhắn chờ!", data: [] };
    }
}

// Lệnh `/fbbot`
module.exports.config = {
    name: "fbbot",
    version: "2.0.0",
    hasPermission: 2,
    credits: "Pcoder",
    description: "Quản lý Facebook bot",
    commandCategory: "Facebook",
    usages: "/fbbot",
    cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    if (!api) {
        await loginFacebook();
    }

    if (args[0] === "pending") {
        const pendingData = await getPendingThreads();
        if (pendingData.data.length === 0) return api.sendMessage(pendingData.message, threadID, messageID);

        return api.sendMessage(
            pendingData.message + "\n👉 **Reply STT để duyệt nhóm đó hoặc 'duyet' để duyệt tất cả!**",
            threadID,
            (err, info) => {
                global.client.handleReply.push({
                    name: module.exports.config.name,
                    messageID: info.messageID,
                    author: event.senderID,
                    indexMap: pendingData.data
                });
            }
        );
    }

    const message = `🤖 **Tính năng Facebook Bot** 🤖
    
📌 **Danh sách lệnh:**
🔹 /fbbot kb <id> - Kết bạn
🔹 /fbbot avatar <url> - Đổi ảnh đại diện
🔹 /fbbot bio <text> - Đổi tiểu sử
🔹 /fbbot post <text> - Đăng bài viết
🔹 /fbbot pending - Xem tin nhắn chờ
🔹 /fbbot logout - Đăng xuất
    `;

    return api.sendMessage(message, threadID, messageID);
};

// Xử lý duyệt tin nhắn chờ
module.exports.handleReply = async function ({ event, api, handleReply }) {
    const { body, threadID, messageID, senderID } = event;
    if (handleReply.author !== senderID) return;

    if (body.toLowerCase() === "duyet") {
        const threadIDs = Object.values(handleReply.indexMap);
        for (const threadID of threadIDs) {
            await api.sendMessage("✅ Tin nhắn này đã được duyệt!", threadID);
        }
        return api.sendMessage("✅ **Đã duyệt tất cả tin nhắn chờ!**", threadID, messageID);
    }

    const index = parseInt(body);
    if (!handleReply.indexMap[index]) return api.sendMessage("❌ Số thứ tự không hợp lệ!", threadID, messageID);

    const groupID = handleReply.indexMap[index];
    await api.sendMessage("✅ Tin nhắn này đã được duyệt!", groupID);

    return api.sendMessage(`✅ **Đã duyệt nhóm:** ${groupID}`, threadID, messageID);
};

// Tự động login khi bot khởi động
loginFacebook();
