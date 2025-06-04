const { exec } = require('child_process');
const moment = require('moment-timezone');
const fs = require('fs');

module.exports.config = {
  name: 'autorestart',
  version: '2.0.1',
  hasPermission: 3,
  credits: 'Pcoder',
  description: 'Tự động restart bot vào 12:00 và 00:00 (giờ VN)',
  commandCategory: 'hệ thống',
  usages: '',
  cooldowns: 0
};

function scheduleRestart(timeString, api) {
  const now = moment().tz('Asia/Ho_Chi_Minh');
  const [hour, minute, second] = timeString.split(':').map(Number);
  let target = moment().tz('Asia/Ho_Chi_Minh').set({ hour, minute, second });

  if (now >= target) target.add(1, 'day');

  const delay = target.diff(now);
  console.log(`[AUTO-RESTART] Sẽ restart lúc ${target.format('YYYY-MM-DD HH:mm:ss')}`);

  setTimeout(async () => {
    const logTime = moment().tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD HH:mm:ss');
    const logMessage = `[${logTime}] Restart bot...\n`;
    fs.appendFileSync('restart.log', logMessage);
    console.log(logMessage);

    try {
      const list = await api.getThreadList(100, null, ['INBOX']);
      for (const thread of list) {
        if (!thread.isGroup) continue;
        api.sendMessage('[⚠️] Bot đang tự động khởi động lại để duy trì ổn định...', thread.threadID);
      }
    } catch (e) {
      console.error('[AUTO-RESTART] Không gửi được tin nhắn đến nhóm:', e);
    }

    setTimeout(() => {
      exec('node index.js', err => {
        if (err) {
          fs.appendFileSync('restart.log', `[${logTime}] Lỗi restart: ${err.message}\n`);
          console.error('[AUTO-RESTART]', err);
        }
      });
      process.exit(1);
    }, 2000);

    // Đặt lại lịch cho ngày hôm sau
    scheduleRestart(timeString, api);
  }, delay);
}

module.exports.onLoad = function ({ api }) {
  scheduleRestart('12:00:00', api);  // 12h trưa
  scheduleRestart('00:00:00', api);  // 12h đêm
};
