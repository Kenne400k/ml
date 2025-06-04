  module.exports.config = {
  name: "chillcungtrung",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "trunguwu",// làm j cx được để yên chỗ này...
  description: "video chill",
  commandCategory: "Random Video",
  usages: "chill",
  cooldowns: 0,
  denpendencies: {
    "fs-extra": "",
    "request": ""

  }
};
module.exports.handleEvent = async ({ api, event, Threads }) => {
  if (event.body.indexOf("chill")==0 ||
event.body.indexOf("Chill")==0 ) 
// Thay tên gọi theo ý mn vd như đây là chill do mình làm mn có thể mod thay thành nhiều noprefix khác <3 ( hi tớ là trung )
{
    const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
    var link = [ "https://i.imgur.com/uJBHhtU.mp4",
"https://i.imgur.com/wGCOhXx.mp4",
"https://i.imgur.com/3atYnAs.mp4",
"https://i.imgur.com/V0ueLNf.mp4",
"https://i.imgur.com/ctlwT7C.mp4",
"https://i.imgur.com/atpcTvk.mp4",
"https://i.imgur.com/scTazIt.mp4",
"https://i.imgur.com/DATg80M.mp4",
"https://i.imgur.com/UNqVqMY.mp4",
"https://i.imgur.com/rHAAozk.mp4",
"https://i.imgur.com/8OeZLJ5.mp4",
"https://i.imgur.com/A5f8cIa.mp4",
"https://i.imgur.com/6I2nnEg.mp4",
"https://i.imgur.com/ROg2fGC.mp4",
"https://i.imgur.com/qWujH00.mp4",
"https://i.imgur.com/Q9C9EXi.mp4",
"https://i.imgur.com/g2wbcfA.mp4",
"https://i.imgur.com/RDwW75U.mp4",
"https://i.imgur.com/EIk1hQH.mp4",
"https://i.imgur.com/cGseG1L.mp4",
"https://i.imgur.com/GVZuSdE.mp4",
                "https://i.imgur.com/NJvg3qT.mp4",
                "https://i.imgur.com/J2LnBx0.mp4",
                "https://i.imgur.com/lHVtlO4.mp4",
"https://i.imgur.com/pXg3lRr.mp4",
"https://i.imgur.com/YPevCOC.mp4"
           ];
     var callback = () => api.sendMessage({body:`𝟏 𝐧𝐠𝐚̀𝐲 𝐛𝐮𝐨̂̀𝐧 𝐤𝐡𝐢 𝐤𝐡𝐨̂𝐧𝐠 𝐜𝐨́ 𝐜𝐚̣̂𝐮 𝐨̛̉ 𝐛𝐞̂𝐧…,𝐭𝐨̂𝐢 𝐦𝐮𝐨̂́𝐧 𝐧𝐨́𝐢 𝐯𝐨̛́𝐢 𝐜𝐚̣̂𝐮 𝐫𝐚̆̀𝐧𝐠 𝐭𝐨̂𝐢 𝐲𝐞̂𝐮 𝐜𝐚̣̂𝐮 𝐧𝐡𝐮̛𝐧𝐠 𝐜𝐚̣̂𝐮 𝐛𝐞̂𝐧 𝐧𝐠𝐮̛𝐨̛̀𝐢 𝐤𝐡𝐚́𝐜 𝐦𝐚̂́𝐭 𝐫𝐨̂̀𝐢...`
,attachment: fs.createReadStream(__dirname + "/cache/1.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"), event.messageID);  
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/1.mp4")).on("close",() => callback());
}
                                                                                                         }
module.exports.run = async({api,event,args,Users,Threads,Currencies}) => {

   };
