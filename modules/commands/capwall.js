const axios = require("axios");
const fs = require("fs");
module.exports.config = {
    name: "capwall",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Thiệu Trung Kiên",
    description: "Chụp ảnh profile của người dùng",
    commandCategory: "Tiện ích",
    usages: "",
    cooldowns: 5
}
module.exports.run = async function ({ api,Users,event, args }) {
  const name = await Users.getNameUser(event.senderID)
    api.sendMessage(`Đợi tý đi ${name}!!`, event.threadID, event.messageID);
    var uid = String(args[0]);
    isNaN(uid) && (uid = Object.keys(event.mentions)[0], "message_reply" == event.type ? uid = event.messageReply.senderID : uid = event.senderID);
    var cookies = `
`,
    vaildItems = ['sb', 'datr', 'c_user', 'xs', 'm_pixel_ratio', 'locale', 'wd', 'fr', 'presence', 'xs', 'm_page_voice', 'fbl_st', 'fbl_ci', 'fbl_cs', 'vpd', 'wd', 'fr', 'presence'];
    var cookie = `sb=vNFCZgHIixD_tcbgEKGb5Zfj;datr=vNFCZoHRAoz40KZGkPs-_D4s;ps_l=1;ps_n=1;locale=en_GB;c_user=100002410780054;xs=35%3AlxwH6Iz7vkEaLQ%3A2%3A1717655026%3A-1%3A-1%3A%3AAcV8ADMpOuxaAGV9yjSGKNiZcSSW4JQ54W8wQGPQvg;fr=1otHiXLRgTxyoWwPE.AWXPRiHXs4DS9mtpyhfSacOOtCo.BmYZBf..AAA.0.0.BmYZBf.AWVIDIStb-4;wd=1536x716;presence=C%7B%22t3%22%3A%5B%5D%2C%22utc3%22%3A1717669989818%2C%22v%22%3A1%7D;`;
    cookies.split(';').forEach(item => {
        var data = item.split('=');
        if (vaildItems.includes(data[0])) cookie += `${data[0]}=${data[1]};`;
    });
    var url = encodeURI(encodeURI((`https://cap-2flm.onrender.com/screenshot/${uid}/${cookie}`))),
        path = __dirname + `/cache/${uid}.png`;
    axios({
        method: "GET",
        url: `https://api.screenshotmachine.com/?key=1438aa&url=${url}&dimension=1024x768`,
        responseType: "arraybuffer"
    }).then(res => {
        fs.writeFileSync(path, Buffer.from(res.data, "utf-8"));
        api.sendMessage({ 	body: `Ây dô xong rồi nè ${name}`,
                         attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
    }).catch(err => console.log(err));
          }