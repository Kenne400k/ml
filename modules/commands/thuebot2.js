const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const crypto = require('crypto');
const cron = require('node-cron');

const RENT_DATA_PATH = path.join(__dirname, '/data/thuebot.json');
const RENT_KEY_PATH = path.join(__dirname, '/data/keys.json');
const TIMEZONE = 'Asia/Ho_Chi_Minh';

let data = fs.existsSync(RENT_DATA_PATH) ? JSON.parse(fs.readFileSync(RENT_DATA_PATH, 'utf8')) : [];
let keys = fs.existsSync(RENT_KEY_PATH) ? JSON.parse(fs.readFileSync(RENT_KEY_PATH, 'utf8')) : {};

const saveData = () => fs.writeFileSync(RENT_DATA_PATH, JSON.stringify(data, null, 2), 'utf8');
const saveKeys = () => fs.writeFileSync(RENT_KEY_PATH, JSON.stringify(keys, null, 2), 'utf8');
const formatDate = input => input.split('/').reverse().join('/');
const isInvalidDate = date => isNaN(new Date(date).getTime());

function generateKey() {
    const randomString = crypto.randomBytes(6).toString('hex').slice(0, 6);
    return `ngon_${randomString}`.toLowerCase();
}

module.exports.config = {
    name: 'thuebot',
    version: '1.4.0',
    hasPermssion: 0,
    credits: 'DC-Nam & DongDev source lại & vdang mod key', // Tham khảo (copy code) và thêm tính năng Key by HungCTer
    description: "thêm thời gian thuê bot của box bạn",
    commandCategory: 'Hệ Thống',
    //usePrefix: false,
    usages: '[]',
    cooldowns: 1
};
module.exports.run = async function (o) {
    const send = (msg, callback) => o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
    const prefix = global.config.PREFIX;
    if (!global.config.ADMINBOT.includes(o.event.senderID)) {
        return send(`⚠️ Chỉ Admin chính mới có thể sử dụng!`);
    }
    
    switch (o.args[0]) {
        case 'add':
            if (!o.args[1]) return send(`❎ Dùng ${prefix}${this.config.name} add + reply tin nhắn người cần thuê`);
            let userId = o.event.senderID;
            if (o.event.type === "message_reply") {
                userId = o.event.messageReply.senderID;
            } else if (Object.keys(o.event.mentions).length > 0) {
                userId = Object.keys(o.event.mentions)[0];
            }
            let t_id = o.event.threadID;
            let time_start = moment.tz(TIMEZONE).format('DD/MM/YYYY');
            let time_end = o.args[1];
            if (o.args.length === 4 && !isNaN(o.args[1]) && !isNaN(o.args[2]) && o.args[3].match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
                t_id = o.args[1];
                userId = o.args[2];
                time_end = o.args[3];
            } else if (o.args.length === 3 && !isNaN(o.args[1]) && o.args[2].match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
                userId = o.args[1];
                time_end = o.args[2];
            }
            if (isNaN(userId) || isNaN(t_id) || isInvalidDate(formatDate(time_start)) || isInvalidDate(formatDate(time_end)))
                return send(`❎ ID hoặc Thời Gian Không Hợp Lệ!`);
            const existingData = data.find(entry => entry.t_id === t_id);
            if (existingData) {
                return send(`⚠️ Nhóm này đã có dữ liệu thuê bot!`);
            }
            data.push({ t_id, id: userId, time_start, time_end });
            send(`✅ Đã thêm dữ liệu thuê bot cho nhóm!`);
            break;

        case 'list':
            if (data.length === 0) {
                send('❎ Không có nhóm nào đang thuê bot!');
                break;
            }
            send(`[ DANH SÁCH THUÊ BOT ]\n\n${data.map((item, i) => {
                const timeStart = new Date(formatDate(item.time_start));
                const timeEnd = new Date(formatDate(item.time_end));
                const isExpired = timeEnd.getTime() < Date.now(); // Kiểm tra xem đã hết hạn hay chưa
                return `${i + 1} Người thuê: ${global.data.userName.get(item.id)}\n📝 Tình trạng: ${isExpired ? 'Đã Hết Hạn ❎' : 'Chưa Hết Hạn ✅'}\n🔰 Nhóm: ${(global.data.threadInfo.get(item.t_id) || {}).threadName}\n⏳ Thời gian thuê: ${timeStart.toLocaleString()} - ${timeEnd.toLocaleString()}`;
            }).join('\n\n')}\n\nReply [ del | out | giahan ] + stt để thực hiện hành động`, (err, res) => {       
                res.name = exports.config.name;
                res.event = o.event;
                res.data = data;
                global.client.handleReply.push({ ...res, type: 'list' });
            });
            break;

        case 'info':
            const rentInfo = data.find(entry => entry.t_id === o.event.threadID); 
            if (!rentInfo) {
                send(`❎ Không có dữ liệu thuê bot cho nhóm này`); 
            } else {
                const keyInfo = Object.entries(keys).find(([key, info]) => info.groupId === rentInfo.t_id) || ['Chưa có key', {}];
                const [key, keyDetails] = keyInfo;
                const timeStart = new Date(formatDate(rentInfo.time_start));
                const timeEnd = new Date(formatDate(rentInfo.time_end));
                send(`[ Thông Tin Thuê Bot ]\n\n👤 Người thuê: ${global.data.userName.get(rentInfo.id)}\n🔗 Link facebook: https://www.facebook.com/profile.php?id=${rentInfo.id}\n🗓️ Ngày Thuê: ${timeStart.toLocaleString()}\n⌛ Hết Hạn: ${timeEnd.toLocaleString()}\n🔑 Key: ${key}\n\n⩺ Còn ${Math.floor((timeEnd.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} ngày ${Math.floor((timeEnd.getTime() - Date.now()) / (1000 * 60 * 60) % 24)} giờ là hết hạn`);
            } 
            break;

        case 'newkey':
            const groupId = o.event.threadID;
            const existingGroupData = data.find(entry => entry.t_id === groupId);
            const expiryDate = o.args[1] || moment.tz(TIMEZONE).add(1, 'month').format('DD/MM/YYYY');
            if (isInvalidDate(formatDate(expiryDate))) {
                return send(`❎ Ngày hết hạn không hợp lệ! Định dạng ngày hợp lệ: DD/MM/YYYY`);
            }
            const generatedKey = generateKey();
            keys[generatedKey] = {
                expiryDate: expiryDate,
                used: false,
                groupId: null
            };
            send(`🔑 New key: ${generatedKey}\n📆 Thời hạn Key: ${expiryDate}`);
            saveKeys();
            break;

        case 'check':
            if (Object.keys(keys).length === 0) {
                send('❎ Không có key nào được tạo!');
                break;
            }
            send(`[ DANH SÁCH KEY ]\n\n${Object.entries(keys).map(([key, info], i) => 
                `${i + 1}. Key: ${key}\n🗓️ Ngày hết hạn: ${info.expiryDate}\n📝 Tình Trạng: ${info.used ? '✅ Đã sử dụng' : '❎ Chưa sử dụng'}📎 ID Nhóm: ${info.groupId || 'Chưa sử dụng'}\n`
            ).join('\n\n')}\n\n\n⩺ Tự Động Làm Mới Vào 00:00 Hàng Ngày!`);
            break;

        default:
            send(`Dùng: ${global.config.PREFIX}thuebot add → Để thêm nhóm vào danh sách thuê bot\nDùng: ${global.config.PREFIX}thuebot list → Để xem danh sách thuê bot\nDùng: ${global.config.PREFIX}thuebot newkey <ngày hết hạn> → Để tạo key thuê bot\n${global.config.PREFIX}thuebot check: xem danh sách key \n𝗛𝗗𝗦𝗗 → ${global.config.PREFIX}thuebot lệnh cần dùng.`);
            break;
    }
    saveData();
};


module.exports.handleEvent = async function (o) {
     const send = (msg, callback) => o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
    const message = o.event.body.toLowerCase();
    const groupId = o.event.threadID;
    const keyMatch = message.match(/ngon_[0-9a-fA-F]{6}/);

    if (keyMatch) {
        const key = keyMatch[0];
        if (keys.hasOwnProperty(key)) {
            const keyInfo = keys[key];
            if (!keyInfo.used) {
                const existingData = data.find(entry => entry.t_id === groupId);
                const time_start = moment.tz(TIMEZONE).format('DD/MM/YYYY');
                const time_end = keyInfo.expiryDate;
                if (existingData) {
                    const existingEndDate = moment(existingData.time_end, 'DD/MM/YYYY');
                    const additionalDays = moment(keyInfo.expiryDate, 'DD/MM/YYYY').diff(moment(time_start, 'DD/MM/YYYY'), 'days');
                    existingData.time_end = existingEndDate.add(additionalDays, 'days').format('DD/MM/YYYY');
                    send(`🔓 Key Hợp Lệ\n📝 Đã cộng thêm ngày thuê bot cho nhóm!`);
                } else {
                    const id = o.event.senderID;
                    data.push({ t_id: groupId, id, time_start, time_end });
                    send(`🔓 Key Hợp Lệ\n📝 Nhóm đã được thêm vào danh sách thuê bot!\n🗓️ Hạn sử dụng bot: ${time_end}`);
                }
                keyInfo.used = true;
                keyInfo.groupId = groupId;
                saveKeys();
                saveData();
            } else {
                send('🔒 Key không hợp lệ hoặc đã được sử dụng!');
            }
        }
    }
};

module.exports.handleReply = async function (o) {
    const send = (msg, callback) => o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
    const { type, data } = o.handleReply;
    const args = o.event.body.split(' ');
    const command = args.shift().toLowerCase();
    const index = parseInt(command);

    if (isNaN(index)) {
        switch (command) {
            case 'del':
                args.sort((a, b) => b - a).forEach($ => {
                    const groupId = data[$ - 1].t_id;
                    data.splice($ - 1, 1);
                });
                send('✅ Đã xóa thành công!');
                break;
            case 'out':
                for (const i of args) {
                    await o.api.removeUserFromGroup(o.api.getCurrentUserID(), data[i - 1].t_id);
                }
                send('✅ Đã out nhóm theo yêu cầu');
                break;
            case 'giahan':
                const [STT, time_end] = args;
                if (isInvalidDate(formatDate(time_end))) return send('❎ Thời Gian Không Hợp Lệ!');
                if (!data[STT - 1]) return send('❎ Số thứ tự không tồn tại');
                const time_start = moment.tz(TIMEZONE).format('DD/MM/YYYY');
                Object.assign(data[STT - 1], { time_start, time_end });
                send('✅ Gia hạn nhóm thành công!');
                break;
            default:
                send('❎ Lệnh không hợp lệ!');
                break;
        }
    } else {
        if (type === 'list') {
            if (index < 1 || index > data.length) {
                return send('❎ Số thứ tự không hợp lệ!');
            }
            const entry = data[index - 1];
            send(`[ Thông Tin Thuê Bot ]\n\n👤 Người thuê: ${global.data.userName.get(entry.id)}\n🔗 Link facebook: https://www.facebook.com/profile.php?id=${entry.id}\n🗓️ Ngày Thuê: ${entry.time_start}\n⌛ Hết Hạn: ${entry.time_end}\n\n🕒 Còn ${Math.floor((new Date(formatDate(entry.time_end)).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} ngày ${Math.floor((new Date(formatDate(entry.time_end)).getTime() - Date.now()) / (1000 * 60 * 60) % 24)} giờ là hết hạn`);
        }
    }
    saveData();
    saveKeys();
};

cron.schedule('0 0 * * *', () => {
    keys = {};
    saveKeys();
});