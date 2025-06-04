module.exports.config = {
  name: "tx",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "D-Jukie fix Kadeer mod by Hercules",//fix lỗi vặt by tdung ;-;
  description: "Chơi tài xỉu",
  commandCategory: "giải trí",
  usages: "[tài/xỉu]",
  cooldowns: 5
};
var abc = ["https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/3", "https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/4", "https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/5", "https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/6", "https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/7", "https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/8", "https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/9", "https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/10", "https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/11", "https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/12",
"https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/13",
"https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/14",
"https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/15",
"https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/16",
"https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/17",
"https://raw.githubusercontent.com/BuiLeBaoLuanProCoder/masoi/main/18"]
module.exports.run = async function ({ api, event, args, Currencies, Users }) {
  const { senderID, messageID, threadID } = event;
  const axios = require('axios');
  const fs = require("fs-extra");
  const dataMoney = await Currencies.getData(senderID);
  const moneyUser = dataMoney.money;
const thinh = ["Cờ bạc là bác thằng bần", "Bạn chơi, bạn thắng, bạn chơi, bạn thua. Bạn lại tiếp tục chơi.", "Người không chơi là người không bao giờ thắng", "Bạn không bao giờ biết điều gì tồi tệ hơn vận xui mà bạn có.", "Cách an toàn nhất để nhân đôi số tiền của bạn là gấp nó lại 1 lần và để vào túi.", "Cờ bạc là nguyên tắc vốn có của bản chất con người.", "Đánh đề thì chỉ có ra đê mà ở", "Cách tốt nhất để Ném xúc xắc là ném chúng đi và đừng chơi nữa.", "Ăn tiền cược của bạn nhưng đừng cược tiền ăn", "Áo quần bán hết, ngồi trần tô hô", "Đánh bạc quen tay, ngủ ngày quen mắt, ăn vặt quen mồm.", "Cược càng ít, khi thắng bạn càng thua nhiều", "Cờ bạc, khiến chúng ta mất hai thứ quý giá nhất của đời người. Đó là thời gian và tiền bạc", "Cờ bạc ai thua, ai thắng, ai không thắng để rồi lại sẽ thua.", "Cờ bạc có thắng có thua, thắng thì ít mà thua thì nhiều."];
  var name = await Users.getNameUser(senderID)
  if (!args[0]) return api.sendMessage("Bạn phải cược tài hoặc xỉu...", threadID, messageID);
  const choose = args[0]
  if (choose.toLowerCase() != 'tài' && choose.toLowerCase() != 'xỉu') return api.sendMessage("Chỉ đặt cược tài hoặc xỉu!", threadID, messageID)
  const money = args[1]
  if (money < 500 || isNaN(money)) return api.sendMessage("Mức đặt cược của bạn không phù hợp hoặc dưới 50000$!!!", threadID, messageID);
  if (moneyUser < money) return api.sendMessage(`Bạn hiện tại không đủ ${money}$ để có thể chơi\nSố tiền hiện tại của bạn đang có là ${moneyUser}$`, threadID, messageID);
      try {
      const res = await axios.get(`${abc[Math.floor(Math.random() * abc.length)]}`)
const ketqua = res.data.total;
      const images = [];
      const result = res.data.result;
      for (var i in res.data.images) {
let path = __dirname + `/cache/${i}.png`;
let imgs = (await axios.get(`${res.data.images[i]}`, { responseType: "arraybuffer" })).data;
          fs.writeFileSync(path, Buffer.from(imgs, "utf-8"));
          images.push(fs.createReadStream(path));
      }
  if (choose == result) {
await Currencies.increaseMoney(senderID, parseInt(money * 1));
api.sendMessage({
  attachment: images,
    body: `=== [ KẾT QUẢ TÀI XỈU ] ===\n→ Người chơi: ${name}\n→ Kết quả: ${result}\n→ Tổng xúc xắc: ${ketqua}\n→ Bạn chọn: ${args[0].toLocaleLowerCase()}\n→ Bạn đã thắng và nhận được: ${money*1}$\n→ Trạng thái: Đã trả thưởng\n──────────────────\n→ Số dư hiện tại: ${[moneyUser + money*1]}$\n→ Lời khuyên: ${thinh[Math.floor(Math.random() * thinh.length)]}`},threadID, messageID);
}
else {
      await Currencies.decreaseMoney(senderID, parseInt(money));
api.sendMessage({
  attachment: images,
    body: `=== [ KẾT QUẢ TÀI XỈU ] ===\n→ Người chơi: ${name}\n→ Kết quả: ${result}\n→ Tổng xúc xắc: ${ketqua}\n→ Bạn chọn: ${args[0].toLocaleLowerCase()}\n→ Bạn đã thua và mất đi: ${money*1}$\n→ Trạng thái: Đã trừ tiền\n──────────────────\n→ Số dư hiện tại: ${[moneyUser - money*1]}$\n→ Lời khuyên: ${thinh[Math.floor(Math.random() * thinh.length)]}`},threadID, messageID);
for(let i = 0; i < images.length; i++) {
          fs.unlinkSync(__dirname + `/cache/${i}.png`);
}
}
} catch (err) {
      console.log(err)
      return api.sendMessage("Đã xảy ra lỗi", event.threadID);
  }
}