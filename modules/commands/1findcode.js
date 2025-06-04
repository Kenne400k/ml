const fs = require("fs");
const path = require("path");

module.exports.config = {
  name: "findcode",
  version: "3.3.0",
  hasPermssion: 0,
  credits: "Pcoder",
  description: "Tìm nhiều từ khóa trong thư mục chứa file lệnh",
  commandCategory: "Tiện ích",
  usages: "/findcode <từ khóa 1> <từ khóa 2> ...",
  cooldowns: 5
};

// Lấy đường dẫn thư mục chứa file lệnh
const CURRENT_FOLDER = path.resolve(__dirname);

// Hàm kiểm tra file có chứa tất cả từ khóa không
function searchInFile(filePath, keywords) {
    try {
        const content = fs.readFileSync(filePath, "utf-8");
        return keywords.every(keyword => content.includes(keyword)); // Tất cả từ khóa đều phải có trong file
    } catch (err) {
        return false; // Bỏ qua nếu không đọc được file
    }
}

// Hàm tìm kiếm đệ quy trong thư mục
function searchInFolder(folderPath, keywords, results = []) {
    if (!fs.existsSync(folderPath)) return results;

    const files = fs.readdirSync(folderPath);
    for (const file of files) {
        const fullPath = path.join(folderPath, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            // Nếu là thư mục, tìm tiếp trong đó
            searchInFolder(fullPath, keywords, results);
        } else if (stats.isFile()) {
            if (searchInFile(fullPath, keywords)) {
                results.push(fullPath); // Lưu đường dẫn đầy đủ
            }
        }
    }
    return results;
}

module.exports.run = async function({ api, event, args }) {
    if (args.length === 0) return api.sendMessage("⚠️ Vui lòng nhập ít nhất một từ khóa!", event.threadID, event.messageID);

    const keywords = args.map(word => word.trim().toLowerCase());
    const foundFiles = searchInFolder(CURRENT_FOLDER, keywords);

    if (foundFiles.length > 0) {
        let msg = `🔍 Tìm thấy các từ khóa '${keywords.join(", ")}' trong các file:\n\n📂 ${foundFiles.join("\n📂 ")}`;
        if (msg.length > 6000) msg = `🔍 Quá nhiều kết quả! Chỉ hiển thị 50 file đầu:\n\n📂 ${foundFiles.slice(0, 50).join("\n📂 ")}`;
        api.sendMessage(msg, event.threadID, event.messageID);
    } else {
        api.sendMessage(`❌ Không tìm thấy từ khóa '${keywords.join(", ")}' trong thư mục hiện tại!`, event.threadID, event.messageID);
    }
};
