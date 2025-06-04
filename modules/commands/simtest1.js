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
        return api.sendMessage("🚫 | 𝗠𝗮̀𝘆 đ** 𝗰𝗼́ 𝗾𝘂𝘆𝗲̂̀𝗻 𝘅𝗮̀𝗶 𝗹𝗲̣̂𝗻𝗵 𝗻𝗮̀𝘆!", threadID, messageID);
    }

    if (cmd === "on" || cmd === "off") {
        const newState = cmd === "on";
        if (data.activeThreads[threadID] === newState) {
            return api.sendMessage(`⚠️ | 𝗦𝗶𝗺 đ𝗮̃ ${newState ? "🟢 𝗕𝗔̣̂𝗧" : "🔴 𝗧𝗔̆́𝗧"} 𝗿𝗼̂̀𝗶!`, threadID, messageID);
        }
        data.activeThreads[threadID] = newState;
        saveData();
        return api.sendMessage(`✅ | 𝗦𝗶𝗺 đ𝗮̃ ${newState ? "🟢 𝗕𝗔̣̂𝗧" : "🔴 𝗧𝗔̆́𝗧"} 𝘁𝗿𝗼𝗻𝗴 𝗻𝗵𝗼́𝗺 𝗻𝗮̀𝘆!`, threadID);
    }

    if (cmd === "list") {
        const allGroups = Object.keys(data.activeThreads);
        if (!allGroups.length) return api.sendMessage("📌 | 𝗞𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗻𝗵𝗼́𝗺 𝗻𝗮̀𝗼 𝗱𝘂̛𝗼̛̣𝗰 𝗹𝘂̛𝘂 𝘁𝗿𝗼𝗻𝗴 𝗵𝗲̣̂ 𝘁𝗵𝗼̂́𝗻𝗴!", threadID, messageID);

        let list = `🌟━━━━━━[ **𝗗𝗔𝗡𝗛 𝗦𝗔́𝗖𝗛 𝗡𝗛𝗢́𝗠 & 𝗧𝗥𝗔̣𝗡𝗚 𝗧𝗛𝗔́𝗜 𝗦𝗜𝗠** ]━━━━━━🌟\n\n`;
        let count = 0;

        for (const id of allGroups) {
            try {
                const info = await api.getThreadInfo(id);
                const name = info.threadName || "Không có tên";
                const members = info.participantIDs.length;
                const status = data.activeThreads[id] ? "🟢 𝐎𝐍" : "🔴 𝐎𝐅𝐅";
                count++;
                list += `🔹 | **${count}. ${name}**\n📌 | **𝐈𝐃:** ${id}\n👥 | **𝐓𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧:** ${members}\n🔥 | **𝐓𝐫𝐚̣𝐧𝐠 𝐭𝐡𝐚́𝐢:** ${status}\n━━━━━━━━━━━━━━━━━━\n`;
            } catch (error) {
                console.error(`⚠️ | Lỗi lấy thông tin nhóm ${id}:`, error);
            }
        }

        return api.sendMessage(list || "⚠️ | 𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝗹𝗮̂́𝘆 𝘁𝗵𝗼̂𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗼́𝗺!", threadID);
    }
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
        const techKeywords = /code|lệnh|hàm|script|javascript|node\.js|lập trình|bug|sửa lỗi|API|framework|database|SQL|HTML|CSS|Python|C\+\+|Java|debug|fix|config|Linux|server|request|response|JSON|backend|frontend|dev|deploy|github|git|repo|IDE/i;
        const lifeKeywords = /tình yêu|cuộc sống|học hành|lười|game|bạn gái|crush|tiền|giàu|nghèo|ăn chơi|gái|trai|hạnh phúc|buồn|cô đơn|troll|chửi|nói bậy|đời|mạng xã hội|facebook|zalo|tiktok|discord|stream|drama|phốt/i;

        let prompt = `Hãy trả lời như một con người thật sự, nói chuyện tự nhiên, có thể hài hước hoặc mất dạy tùy ngữ cảnh:\n"${text}"`;

        if (techKeywords.test(text)) {
            prompt = `Mày đang hỏi về lập trình phải không? Ok, tao trả lời nghiêm túc nè: "${text}"`;
        } else if (lifeKeywords.test(text)) {
            prompt = `Nói về cuộc sống à? Ok, tao sẽ tư vấn thật trần trụi: "${text}"`;
        }

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
            { contents: [{ parts: [{ text: prompt }] }] },
            { headers: { "Content-Type": "application/json" } }
        );

        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || "Tao đ** biết nói gì luôn á!";
    } catch (err) {
        console.error("❌ **Lỗi gọi API Gemini:**", err.response?.data || err.message);
        return "Mất dạy gì đó, API bị lỗi rồi!";
    }
}


module.exports.handleReply = async function ({ api, event, handleReply }) {
    const { senderID, threadID, messageID, body } = event;

    if (!ADMIN_ID.includes(senderID)) {
        return api.sendMessage("🚫 | 𝐌𝐚̀𝐲 đ** 𝐜𝐨́ 𝐪𝐮𝐲𝐞̂̀𝐧 𝐜𝐡𝐢̉𝐧𝐡 𝐒𝐢𝐦!", threadID, messageID);
    }

    const [replyIndex, ...messageParts] = body.split(" ");
    const customMessage = messageParts.join(" ") || null;

    const allGroups = Object.keys(data.activeThreads);
    if (isNaN(replyIndex) || replyIndex < 1 || replyIndex > allGroups.length) {
        return api.sendMessage("❌ | 𝐒𝐨̂́ 𝐭𝐡𝐮̛́ 𝐭𝐮̛̣ 𝐤𝐡𝐨̂𝐧𝐠 𝐡𝐨̛̣𝐩 𝐥𝐞̣̂!", threadID, messageID);
    }

    const groupID = allGroups[replyIndex - 1];
    const newStatus = !data.activeThreads[groupID];
    data.activeThreads[groupID] = newStatus;
    saveData();

    let groupName = "Không có tên";
    let memberCount = 0;
    try {
        const info = await api.getThreadInfo(groupID);
        groupName = info.threadName || "Không có tên";
        memberCount = info.participantIDs.length;
    } catch (error) {
        console.error(`⚠️ | Lỗi lấy thông tin nhóm ${groupID}:`, error);
    }

    const notifyMessage = `🔹 | **𝐀𝐝𝐦𝐢𝐧 𝐝𝐚̃ ${newStatus ? "𝐁𝐀̣̂𝐓 ✅" : "𝐓𝐀̆́𝐓 ❌"} 𝐒𝐢𝐦**\n📌 | **𝐍𝐡𝐨́𝐦:** ${groupName} (👥 ${memberCount} thành viên)\n${customMessage ? `📢 | **𝐀𝐝𝐦𝐢𝐧:** ${customMessage}` : ""}`;
    api.sendMessage(notifyMessage, groupID);

    // ✅ Cập nhật lại danh sách nhóm & gửi về admin
    let list = `🌟━━━━━[ **𝗗𝗔𝗡𝗛 𝗦𝗔́𝗖𝗛 𝗡𝗛𝗢́𝗠 & 𝗧𝗥𝗔̣𝗡𝗚 𝗧𝗛𝗔́𝗜 𝗦𝗜𝗠** ]━━━━━🌟\n\n`;
    let count = 0;

    for (const id of Object.keys(data.activeThreads)) {
        try {
            const info = await api.getThreadInfo(id);
            const name = info.threadName || "Không có tên";
            const members = info.participantIDs.length;
            const status = data.activeThreads[id] ? "🟢 𝐎𝐍" : "🔴 𝐎𝐅𝐅";
            count++;
            list += `🔹 | **${count}. ${name}**\n📌 | **𝐈𝐃:** ${id}\n👥 | **𝐓𝐡𝐚̀𝐧𝐡 𝐯𝐢𝐞̂𝐧:** ${members}\n🔥 | **𝐓𝐫𝐚̣𝐧𝐠 𝐭𝐡𝐚́𝐢:** ${status}\n━━━━━━━━━━━━━━━\n`;
        } catch (error) {
            console.error(`⚠️ | Lỗi lấy thông tin nhóm ${id}:`, error);
        }
    }

    return api.sendMessage(list || "⚠️ | 𝐊𝐡𝐨̂𝐧𝐠 𝐭𝐡𝐞̂̉ 𝐥𝐚̂́𝐲 𝐭𝐡𝐨̂𝐧𝐠 𝐭𝐢𝐧 𝐧𝐡𝐨́𝐦!", threadID);
};
