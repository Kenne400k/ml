module.exports.config = {
  name: "avtdoi",
  version: "1.0.0", 
  hasPermssion: 0,
  credits: "Trankhuong",
  description: "Ảnh cặp đôi!",
  commandCategory: "game", 
  usages: "@tag", 
  cooldowns: 0
};
module.exports.run = async function({ api, event,Threads, Users }) {
        const axios = global.nodemodule["axios"];
        const fs = global.nodemodule["fs-extra"];
        let name = await Users.getNameUser(event.senderID)
        var mention = Object.keys(event.mentions)[0];
	if (!mention) return api.sendMessage("⚡ Hãy @tag một người!", event.threadID, event.messageID);
        let tag = event.mentions[mention].replace("@", "");
        const res = await axios.get(`https://raw.githubusercontent.com/Trankhuong20723/API-Trankhuong/main/couple.json`);
        const count = res.data.couple.length
        const randomIMG = res.data.couple[Math.floor(Math.random() * count)]

        let love1 = (await axios.get( `${randomIMG.link1}`, { responseType: "arraybuffer" } )).data; 
            fs.writeFileSync( __dirname + "/cache/love1.png", Buffer.from(love1, "utf-8") );
        let love2 = (await axios.get( `${randomIMG.link2}`, { responseType: "arraybuffer" } )).data;
            fs.writeFileSync( __dirname + "/cache/love2.png", Buffer.from(love2, "utf-8") );
        var imglove = [];
              imglove.push(fs.createReadStream(__dirname + "/cache/love1.png"));
              imglove.push(fs.createReadStream(__dirname + "/cache/love2.png"));
        var msg = {body: `[ Ảnh Cặp Đôi Tình Yêu ]\n──────────────────\n💞 Ảnh cặp đôi của ${name} và ${tag} đây\n❤️ Hãy chọn ảnh cặp nào ưng ý để đổi cho bạn và người ấy của bạn nhé!`, mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }], attachment: imglove}
        return api.sendMessage(msg, event.threadID, event.messageID)
}