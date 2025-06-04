const fs = require("fs");
const axios = require("axios");
const path = require("path");
const config = require(path.join(__dirname, "../../config.json"));

const DATA_PATH = path.join(__dirname, "data/bot.json");
const GEMINI_API_KEY = "AIzaSyDV4U_yYa9i-4LGQmoh_qTaFmJR0HJnFcQ";

const ADMIN_ID = [...(config.ADMINBOT || []), ...(config.NDH || [])];

function loadData() {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            fs.writeFileSync(DATA_PATH, JSON.stringify({ conversations: {}, activeThreads: {} }, null, 2));
        }
        return JSON.parse(fs.readFileSync(DATA_PATH, "utf8").trim()) || { conversations: {}, activeThreads: {} };
    } catch (error) {
        console.error("Lỗi đọc file JSON, reset lại!", error);
        fs.writeFileSync(DATA_PATH, JSON.stringify({ conversations: {}, activeThreads: {} }, null, 2));
        return { conversations: {}, activeThreads: {} };
    }
}

let data = loadData();
const saveData = () => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

module.exports.config = {
    name: "sim",
    version: "6.0.0",
    hasPermission: 0,
    credits: "Pcoder",
    description: "Quản lý Sim chatbot + Gemini AI",
    commandCategory: "No prefix",
    usages: "[sim] | [sim list] | [reply để bật/tắt nhóm]",
    cooldowns: 1
};

module.exports.run = async function ({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    if (!data.activeThreads) data.activeThreads = {};

    // Không có args → Kiểm tra trạng thái Sim trong nhóm hiện tại
    if (!args.length) {
        return api.sendMessage(
            data.activeThreads[threadID]
            ? "🟢 | 𝗦𝗶𝗺 𝗵𝗶𝗲̣̂𝗻 𝗱𝗮𝗻𝗴 𝗛𝗢𝗔̣𝗧 𝗗𝗢̣̂𝗡𝗚!" 
                : "🔴 | 𝗦𝗶𝗺 đ𝗮𝗻𝗴 𝗧𝗔̆́𝗧 𝘁𝗿𝗼𝗻𝗴 𝗻𝗵𝗼́𝗺 𝗻𝗮̀𝘆!",
            threadID, messageID
        );
    }

    const cmd = args[0].toLowerCase();
    if (!ADMIN_ID.includes(senderID)) {
        return api.sendMessage("🚫 | Mày đ** có quyền xài lệnh này!", threadID, messageID);
    }

    if (cmd === "on" || cmd === "off") {
        const newState = cmd === "on";
        if (data.activeThreads[threadID] === newState) {
            return api.sendMessage(`⚠️ | Sim đã ${newState ? "🔛 **bật**" : "⛔ **tắt**"} rồi!`, threadID, messageID);
        }
        data.activeThreads[threadID] = newState;
        saveData();
        return api.sendMessage(`✅ | Sim đã ${newState ? "🔛 **bật**" : "⛔ **tắt**"} cho nhóm này!`, threadID);
    }

    if (cmd === "list") {
        const allGroups = Object.keys(data.activeThreads);
        if (!allGroups.length) return api.sendMessage("📌 | **Không có nhóm nào được lưu trong hệ thống!**", threadID, messageID);

        let list = `🔹━【📜 𝐃𝐀𝐍𝐇 𝐒𝐀́𝐂𝐇 𝐍𝐇𝐎́𝐌 & 𝐓𝐑𝐀̣𝐍𝐆 𝐓𝐇𝐀́𝐈 𝐒𝐈𝐌 📜】━🔹\n\n`;
        let count = 0;
        let groupIndexMap = [];

        for (const id of allGroups) {
            try {
                const info = await api.getThreadInfo(id);
                const name = info.threadName || "❌ Không có tên";
                const members = info.participantIDs.length;
                const status = data.activeThreads[id] ? "🟢 **ON** ✅" : "🔴 **OFF** ❌";
                count++;
                list += `➤ **${count}. 𝑵𝒉𝒐́𝒎:** 『${name}』\n📌 **ID:** ${id}\n👥 **Thành viên:** ${members}\n🔥 **Trạng thái:** ${status}\n\n`;
                groupIndexMap.push({ index: count, id });
            } catch (error) {
                console.error(`❌ Lỗi lấy thông tin nhóm ${id}:`, error);
            }
        }

        api.sendMessage(list || "⚠️ | **Không thể lấy thông tin nhóm!**", threadID, (err, info) => {
            if (!err) {
                global.client.handleReply.push({
                    name: "sim_list_reply",
                    messageID: info.messageID,
                    author: senderID,
                    groupIndexMap
                });
            }
        });

        return;
    }
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const { senderID, threadID, messageID, body } = event;
    if (handleReply.author !== senderID) return;

    const { groupIndexMap } = handleReply;
    const [indexStr, ...messageParts] = body.split(" ");
    const selectedIndex = parseInt(indexStr);
    const customMessage = messageParts.join(" ") || null;

    if (isNaN(selectedIndex) || selectedIndex < 1 || selectedIndex > groupIndexMap.length) {
        return api.sendMessage("❌ | **🔢 Số thứ tự không hợp lệ!**", threadID, messageID);
    }

    const groupID = groupIndexMap[selectedIndex - 1].id;
    const newStatus = !data.activeThreads[groupID];
    data.activeThreads[groupID] = newStatus;
    saveData();

    let groupName = "❌ Không có tên";
    let memberCount = 0;
    try {
        const info = await api.getThreadInfo(groupID);
        groupName = info.threadName || "❌ Không có tên";
        memberCount = info.participantIDs.length;
    } catch (error) {
        console.error(`❌ Lỗi lấy thông tin nhóm ${groupID}:`, error);
    }

    const notifyMessage = `🚀 𝗔𝗗𝗠𝗜𝗡 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗦𝗜𝗠 🚀\n\n📍 𝗡𝗵𝗼́𝗺: 『${groupName}』\n👥 𝗧𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻: ${memberCount}\n🔥 𝗧𝗿𝗮̣𝗻𝗴 𝘁𝗵𝗮́𝗶: ${newStatus ? "🟢 **𝗕𝗔̣̂𝗧** ✅" : "🔴 **𝗧𝗔̆́𝗧** ❌"}\n${customMessage ? `📩 𝗟𝗼̛̀𝗶 𝗻𝗵𝗮̆́𝗻 𝗧𝘂̛̀ 𝗔𝗱𝗺𝗶𝗻: 「${customMessage}」` : ""}`;
    
    api.sendMessage(notifyMessage, groupID);

    // Gửi lại danh sách mới sau khi cập nhật
    const allGroups = Object.keys(data.activeThreads);
    if (!allGroups.length) return api.sendMessage("📌 | **⛔ Không có nhóm nào được lưu trong hệ thống!**", threadID, messageID);

    let list = `🔹━【📜 𝐃𝐀𝐍𝐇 𝐒𝐀́𝐂𝐇 𝐌𝐎̛́𝐈 𝐂𝐀̣̂𝐏 𝐍𝐇𝐀̣̂𝐓 📜】━🔹\n\n`;
    let count = 0;

    for (const id of allGroups) {
        try {
            const info = await api.getThreadInfo(id);
            const name = info.threadName || "❌ Không có tên";
            const members = info.participantIDs.length;
            const status = data.activeThreads[id] ? "🟢 **ON** ✅" : "🔴 **OFF** ❌";
            count++;
            list += `➤ ✨ **${count}. 𝑵𝒉𝒐́𝒎:** 『${name}』\n📌 **ID:** ${id}\n👥 **Thành viên:** ${members}\n🔥 **Trạng thái:** ${status}\n\n`;
        } catch (error) {
            console.error(`❌ Lỗi lấy thông tin nhóm ${id}:`, error);
        }
    }

    return api.sendMessage(list || "⚠️ | **🚧 Không thể lấy thông tin nhóm!**", threadID, messageID);
};


// ✅ Sim chat + Gemini AI
module.exports.handleEvent = async function ({ event, api }) {
    const { body, threadID, messageID, senderID } = event;

    if (!body || senderID === api.getCurrentUserID()) return;
    if (!data.activeThreads[threadID]) return;

    const input = body.trim().toLowerCase();
    if (data.conversations[input]) {
        return api.sendMessage(data.conversations[input], threadID, messageID);
    }

    const response = await askGemini(input);
    if (response) {
        data.conversations[input] = response;
        saveData();
        return api.sendMessage(response, threadID, messageID);
    } else {
        return api.sendMessage("❓ Tao éo biết, dạy tao lẹ!", threadID, messageID);
    }
};

async function askGemini(text) {
    try {
        const isTechQuestion = /code|lệnh|hàm|script|javascript|node\.js|lập trình|bug|sửa lỗi|API|framework|database|SQL|HTML|CSS|Python|C\+\+|Java/i.test(text);
        const prompt = isTechQuestion
            ? `Hãy trả lời một cách nghiêm túc, không tục tĩu, đúng trọng tâm câu hỏi: "${text}"`
            : `Trả lời ngắn gọn, thô tục nhưng không quá tục tĩu: "${text}"`;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] },
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (err) {
        console.error("❌ Lỗi gọi API Gemini:", err.response?.data || err.message);
        return null;
    }
}
