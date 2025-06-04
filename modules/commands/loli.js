module.exports.config = {
  name: "loli",	
  version: "4.0.0", 
  hasPermssion: 0,
  credits: "Vtuan",
  description: "chat loli sẽ random ảnh gái loli", 
  commandCategory: "Random Ảnh",
  usages: "",
  cooldowns: 0
};

module.exports.handleEvent = async function ({ api, event, Threads }) {
  const request = require('request');
  const fs = require("fs");
  var { threadID, messageID, body } = event;
  const tdungs = [
    require('./../../lekhanh/datajson/loil.json'),
    require('./../../lekhanh/datajson/loil.json'),
    require('./../../lekhanh/datajson/loil.json'),
    require('./../../lekhanh/datajson/loil.json'),
    require('./../../lekhanh/datajson/loil.json'),
    require('./../../lekhanh/datajson/loil.json'),
    require('./../../lekhanh/datajson/loil.json'),
    require('./../../lekhanh/datajson/loil.json'),
    require('./../../lekhanh/datajson/loil.json')
  ];

  function vtuanhihi(image, vtuandz, callback) {
    request(image).pipe(fs.createWriteStream(__dirname + `/` + vtuandz)).on("close", callback);
  }

  if (body.toLowerCase() == "loli" || (body.toLowerCase() == "Loli")) {
    const numImages = Math.floor(Math.random() * 15) + 1; // Random từ 1 đến 50
    let imagesDownloaded = 0;
    let attachments = [];

    for (let i = 0; i < numImages; i++) {
      const randomTdung = tdungs[Math.floor(Math.random() * tdungs.length)];
      let image = randomTdung[Math.floor(Math.random() * randomTdung.length)].trim();
      let imgFileName = `image_${i}.png`;
      vtuanhihi(image, imgFileName, () => {
          imagesDownloaded++;
          attachments.push(fs.createReadStream(__dirname + `/${imgFileName}`));
          if (imagesDownloaded === numImages) {
            api.sendMessage({
              body: `Tha hồ ngắm=)))`,
              attachment: attachments
            }, event.threadID, () => {

              for (let img of attachments) {
                fs.unlinkSync(img.path); 
              }
            }, event.messageID);
          }
      });
    }
  }
}

module.exports.run = async function ( { api, event } ) {
api.sendMessage(`chỉ cần nhắn loli, bot auto gửi ảnh chứ ai như loại m`,event.threadID,event.messageID)
}