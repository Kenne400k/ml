module.exports.config = {
  name: "anti",
  version: "4.1.5",
  hasPermssion: 1,
  credits: "BraSL",
  description: "ANTI BOX",
  commandCategory: "group",
  usages: "anti dùng để bật tắt",
  cooldowns: 0,
  dependencies: {
    "fs-extra": "",
  },
};

const {
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
  unlinkSync,
} = require("fs");
const axios = require('axios')

module.exports.handleReply = async function ({
  api,
  event,
  args,
  handleReply,
}) {
  const { senderID, threadID, messageID, messageReply } = event;
  const { author, permssion } = handleReply;
  
  const pathData = global.anti;
  const dataAnti = JSON.parse(readFileSync(pathData, "utf8"));

  if(author !== senderID ) return api.sendMessage(`Bạn không phải người dùng lệnh!`,threadID)

  var number = event.args.filter(i=> !isNaN(i))
 for (const num of number){
  switch (num) {
    case "1": {
      //---> CODE ADMIN ONLY<---//
      if (permssion < 1)
        return api.sendMessage(
          "BẠN CHƯA ĐỦ TUỔI ĐỂ DÙNG LỆNH NÀY!",
          threadID,
          messageID
        );
      var NameBox = dataAnti.boxname;
      const antiImage = NameBox.find(
        (item) => item.threadID === threadID
      );
      if (antiImage) {
        dataAnti.boxname = dataAnti.boxname.filter((item) => item.threadID !== threadID);
        api.sendMessage(
          "✅ Tắt thành công chế độ ANTI đổi tên box ",
          threadID,
          messageID
        );
      } else {
        var threadName = (await api.getThreadInfo(event.threadID)).threadName;
        dataAnti.boxname.push({
          threadID,
          name: threadName
        })
        api.sendMessage(
          "✅ Bật thành công chế độ ANTI đổi tên box",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "2": {
      if (permssion < 1)
        return api.sendMessage(
          "BẠN CHƯA ĐỦ TUỔI ĐỂ DÙNG LỆNH NÀY!",
          threadID,
          messageID
        );
      const antiImage = dataAnti.boximage.find(
        (item) => item.threadID === threadID
      );
      if (antiImage) {
        dataAnti.boximage = dataAnti.boximage.filter((item) => item.threadID !== threadID);
        api.sendMessage(
          "✅ Tắt thành công chế độ ANTI đổi ảnh box",
          threadID,
          messageID
        );
      } else {
        var threadInfo = await api.getThreadInfo(event.threadID);
        var options = {
          method: "POST",
          url: "https://api.imgur.com/3/image",
          headers: {
            Authorization: "Client-ID fc9369e9aea767c",
          },
          data: {
            image: threadInfo.imageSrc,
          },
        };
        const res = await axios(options);

        var data = res.data.data;
        var img = data.link;
        dataAnti.boximage.push({
          threadID,
          url: img,
        });
        api.sendMessage(
          "✅ Bật thành công chế độ ANTI đổi ảnh box",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "3": {
      if (permssion < 1)
        return api.sendMessage(
          " BẠN CHƯA ĐỦ TUỔI ĐỂ DÙNG LỆNH NÀY!",
          threadID,
          messageID
        );
      const NickName = dataAnti.antiNickname.find(
        (item) => item.threadID === threadID
      );
      
      if (NickName) {
        dataAnti.antiNickname = dataAnti.antiNickname.filter((item) => item.threadID !== threadID);
        api.sendMessage(
          "✅ Tắt thành công chế độ ANTI đổi biệt danh ",
          threadID,
          messageID
        );
      } else {
        const nickName = (await api.getThreadInfo(event.threadID)).nicknames
        dataAnti.antiNickname.push({
          threadID,
          data: nickName
        });
        api.sendMessage(
          "✅ Bật thành công chế độ ANTI đổi biệt danh",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "4": {
      if (permssion < 1)
        return api.sendMessage(
          " BẠN CHƯA ĐỦ TUỔI ĐỂ DÙNG LỆNH NÀY!",
          threadID,
          messageID
        );
      const antiout = dataAnti.antiout;
      if (antiout[threadID] == true) {
        antiout[threadID] = false;
        api.sendMessage(
          "✅ Tắt thành công chế độ ANTI out! ",
          threadID,
          messageID
        );
      } else {
        antiout[threadID] = true;
        api.sendMessage(
          "✅ Bật thành công chế độ ANTI out!",
          threadID,
          messageID
        );
      }
      writeFileSync(pathData, JSON.stringify(dataAnti, null, 4));
      break;
    }
    case "5": {
      const antiImage = dataAnti.boximage.find(
        (item) => item.threadID === threadID
      );
      const antiBoxname = dataAnti.boxname.find(
        (item) => item.threadID === threadID
      );
      const antiNickname = dataAnti.antiNickname.find(
        (item) => item.threadID === threadID
      );
      return api.sendMessage(
        `---- CHECK ANTI ----\n↪ ANTI AVT BOX: ${
          antiImage ? "Bật" : "Tắt"
        }\n↪ ANTI NAME BOX: ${antiBoxname ? "Bật" : "Tắt"}\n↪ ANTI NICK NAME: ${antiNickname ? "Bật" : "Tắt"}\n↪ ANTI OUT: ${dataAnti.antiout[threadID] ? "Bật" : "Tắt"}`,
        threadID
      );
      break;
    }

    default: {
      return api.sendMessage(
        `Số bạn chọn không có trong danh sách anti!`,
        threadID
      );
    }
  }
 }
};

module.exports.run = async ({ api, event, args, permssion, Threads }) => {
  const { threadID, messageID, senderID } = event;
  const threadSetting = (await Threads.getData(String(threadID))).data || {};
  const prefix = threadSetting.hasOwnProperty("PREFIX")
    ? threadSetting.PREFIX
    : global.config.PREFIX;

  return api.sendMessage(
        `[ Chế Độ Anti Có Thể Đặt ]\n────────────────\n1. anti boxname: Cấm đổi tên nhóm\n2. anti avtbox: Cấm đổi ảnh nhóm\n3. anti name: Cấm đổi biệt danh\n4. anti out: Cấm thoát nhóm\n5. check: Kiểm tra danh sách đã bật anti của box\n\n📌 Phản hồi tin nhắn này kèm số thứ tự mà bạn muốn chọn để bật hoặc tắt!`,
        threadID, (error, info) => {
            if (error) {
              return api.sendMessage("Đã xảy ra lỗi!", threadID);
            } else {
              global.client.handleReply.push({
                name: this.config.name,
                messageID: info.messageID,
                author: senderID,
                permssion
              });
            }
          });
};