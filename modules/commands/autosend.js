const moment = require('moment-timezone');
const axios = require('axios');

module.exports.config = {
 name: 'autosend',
 version: '10.02',
 hasPermission: 3,
 credits: 'DongDev',
 description: 'Tự động gửi tin nhắn theo giờ đã cài!',
 commandCategory: 'Hệ Thống',
 usages: '[]',
 cooldowns: 3,
 images: [],
};

const weather = require('weather-js');
const findWeather = (city, degreeType = 'C') => {
 return new Promise((resolve, reject) => {
 weather.find({ search: city, degreeType }, (err, result) => {
 if (err) {
 reject(err);
 } else {
 resolve(result);
 }
 });
 });
};

const nam = [
 {
 timer: '01:00:00',
 message: ['𝐈𝐭 𝐢𝐬 𝟏 𝐀𝐌, 𝐀 𝐧𝐞𝐰 𝐝𝐚𝐲 𝐡𝐚𝐬 𝐛𝐞𝐠𝐮𝐧.']
 },
 {
 timer: '04:00:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '06:00:00',
 message: ['𝗜𝘁 𝗶𝘀 𝟲 𝗔𝗠, 𝗚𝗼𝗼𝗱 𝗺𝗼𝗿𝗻𝗶𝗻𝗴!']
 },
 {
 timer: '07:00:00',
 message: ['𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝘀𝗮́𝗻𝗴 𝘃𝘂𝗶 𝘃𝗲̉ 😉', '𝗕𝘂𝗼̂̉𝗶 𝘀𝗮́𝗻𝗴 đ𝗮̂̀𝘆 𝗻𝗮̆𝗻𝗴 𝗹𝘂̛𝗼̛̣𝗻𝗴 𝗻𝗵𝗮 𝗰𝗮́𝗰 𝗯𝗮̣𝗻 😙']
 },
 {
 timer: '08:00:00',
 message: ['𝗜𝘁 𝗶𝘀 𝟴 𝗔𝗠, 𝗛𝗮𝘃𝗲 𝗮 𝗴𝗼𝗼𝗱 𝗱𝗮𝘆!']
 },
 {
 timer: '09:00:00',
 message: ['𝗡𝗮̂́𝘂 𝗰𝗼̛𝗺 𝗻𝗵𝗼̛́ 𝗯𝗮̣̂𝘁 𝗻𝘂́𝘁 𝗻𝗵𝗮 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 😙']
 },
 {
 timer: '10:00:00',
 message: ['𝗜𝘁 𝗶𝘀 𝟭𝟬 𝗔𝗠, 𝗛𝗼𝘄 𝗮𝗿𝗲 𝘆𝗼𝘂 𝘁𝗼𝗱𝗮𝘆?']
 },
 {
 timer: '11:00:00',
 message: ['𝗖𝗮̉ 𝘀𝗮́𝗻𝗴 𝗺𝗲̣̂𝘁 𝗺𝗼̉𝗶 𝗿𝘂̀𝗶, 𝗻𝗴𝗵𝗶̉ 𝗻𝗴𝗼̛𝗶 𝗻𝗮̣𝗽 𝗻𝗮̆𝗻𝗴 𝗹𝘂̛𝗼̛̣𝗻𝗴 𝗻𝗮̀𝗼!! 😴']
 },
 {
 timer: '12:00:00',
 message: ['𝗜𝘁 𝗶𝘀 𝟭𝟮 𝗣𝗠, 𝗚𝗼𝗼𝗱 𝗮𝗳𝘁𝗲𝗿𝗻𝗼𝗼𝗻!', '𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗿𝘂̛𝗮 𝘃𝘂𝗶 𝘃𝗲̉ 😋', '𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗿𝘂̛𝗮 𝗻𝗴𝗼𝗻 𝗺𝗶𝗲̣̂𝗻𝗴 😋']
 },
 {
 timer: '13:00:00',
 message: ['\n{thoitiet}']
 },
 {
 timer: '14:00:00',
 message: ['𝗜𝘁 𝗶𝘀 𝟭𝟰 𝗣𝗠, 𝗛𝗮𝘃𝗲 𝗮 𝗻𝗶𝗰𝗲 𝗮𝗳𝘁𝗲𝗿𝗻𝗼𝗼𝗻.']
 },
 {
 timer: '15:00:00',
 message: ['𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝗰𝗵𝗶𝗲̂̀𝘂 đ𝗮̂̀𝘆 𝗻𝗮̆𝗻𝗴 𝗹𝘂̛𝗼̛̣𝗻𝗴 😼', '𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝗰𝗵𝗶𝗲̂̀𝘂 𝘃𝘂𝗶 𝘃𝗲̉ 🙌']
 },
 {
 timer: '16:00:00',
 message: ['𝗜𝘁 𝗶𝘀 𝟭𝟲 𝗣𝗠, 𝗛𝗲𝗹𝗹𝗼 𝗲𝘃𝗲𝗿𝘆𝗼𝗻𝗲, 𝘁𝗵𝗶𝘀 𝗮𝗳𝘁𝗲𝗿𝗻𝗼𝗼𝗻 𝘄𝗮𝘀 𝗴𝗿𝗲𝗮𝘁.']
 },
 {
 timer: '17:00:00',
 message: ['𝗛𝗶𝗵𝗶 𝗰𝗵𝘂𝗮̂̉𝗻 𝗯𝗶̣ 𝗻𝗮̂́𝘂 𝗰𝗼̛𝗺 𝘁𝗵𝘂𝗶 𝗻𝗮̀𝗼 😋']
 },
 {
 timer: '18:00:00',
 message: ['𝗜𝘁 𝗶𝘀 𝟭𝟴 𝗣𝗠, 𝗚𝗼𝗼𝗱 𝗲𝘃𝗲𝗻𝗶𝗻𝗴.']
 },
 {
 timer: '19:00:00',
 message: ['𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶 𝘃𝘂𝗶 𝘃𝗲̉ 🥰', '𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗯𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶 𝗮𝗻 𝗹𝗮̀𝗻𝗵 😘']
 },
 {
 timer: '20:00:00',
 message: ['𝗜𝘁 𝗶𝘀 𝟮𝟬 𝗣𝗠, 𝗜𝘀 𝘆𝗼𝘂𝗿 𝗲𝘃𝗲𝗻𝗶𝗻𝗴 𝗼𝗸𝗮𝘆?']
 },
 {
 timer: '21:00:00',
 message: ['21:00']
 },
 {
 timer: '22:00:00',
 message: ['𝗜𝘁 𝗶𝘀 𝟮𝟮 𝗣𝗠, 𝗚𝗼𝗼𝗱 𝗻𝗶𝗴𝗵𝘁!']
 },
 {
 timer: '23:00:00',
 message: ['𝗖𝗵𝘂́𝗰 𝗺𝗼̣𝗶 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗻𝗴𝘂̉ 𝗻𝗴𝗼𝗻 😴', '𝗞𝗵𝘂𝘆𝗮 𝗿𝘂̀𝗶 𝗻𝗴𝘂̉ 𝗻𝗴𝗼𝗻 𝗻𝗵𝗲́ 𝗰𝗮́𝗰 𝗯𝗮̣𝗻 😇']
 },
 {
 timer: '00:00:00',
 message: ['𝗜𝘁 𝗶𝘀 𝟬𝟬 𝗣𝗠, 𝗚𝗼 𝘁𝗼 𝗯𝗲𝗱 𝗲𝗮𝗿𝗹𝘆 𝘁𝗼 𝗲𝗻𝘀𝘂𝗿𝗲 𝗵𝗲𝗮𝗹𝘁𝗵!']
 }
];

module.exports.onLoad = o => setInterval(async () => {
 const r = a => a[Math.floor(Math.random() * a.length)];
 const currentTime = moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss');

 if (á = nam.find(i => i.timer === currentTime)) {
 const gio = moment().tz('Asia/Ho_Chi_Minh').format('HH:mm:ss || DD/MM/YYYY');

var msg = r(á.message);
var tinh = [
"Cần Thơ"
];
const city = tinh[Math.floor(Math.random() * tinh.length)];
 const result = await findWeather(city);
 var currentDay = result[0].current.day.replace(/Friday/g, "Thứ 6").replace(/Saturday/g, "Thứ 7").replace(/Sunday/g, "Chủ nhật").replace(/Monday/g, "Thứ 2").replace(/Tuesday/g, "Thứ 3").replace(/Wednesday/g, "Thứ 4").replace(/Thursday/g, "Thứ 5");
 var date = result[0].current.date;
 var dateFormat = `Ngày ${date.split("-")[2]}-${date.split("-")[1]}-${date.split("-")[0]}`;
 var skytext = result[0].current.skytext.toString()
 "Cloudy" == skytext ? skytext = "Mây" : "Sunny" == skytext ? skytext = "Nắng" : "Partly Cloudy" == skytext ? skytext = "Mây một phần" : "Mostly Cloudy" == skytext ? skytext = "Mây rất nhiều" : "Rain" == skytext ? skytext = "Mưa" : "Thunderstorm" == skytext ? skytext = "Bão" : "Snow" == skytext ? skytext = "Tuyết" : "Fog" == skytext || "Haze" == skytext ? skytext = "Sương mù" : "Clear" == skytext ? skytext = "Trời trong" : "Light Rain" == skytext ? skytext = "Mưa nhẹ" : "Mostly Clear" == skytext && (skytext = "Trời trong rất nhiều");
 var winddisplay = result[0].current.winddisplay.toString().split(" ")[2];
 "Northeast" == winddisplay && (winddisplay = "Hướng Đông Bắc"), "Northwest" == winddisplay && (winddisplay = "Hướng Tây Bắc"), "Southeast" == winddisplay && (winddisplay = "Hướng Đông Nam"), "Southwest" == winddisplay && (winddisplay = "Hướng Tây Nam"), "East" == winddisplay && (winddisplay = "Hướng Đông"), "West" == winddisplay && (winddisplay = "Hướng Tây"), "North" == winddisplay && (winddisplay = "Hướng Bắc"), "South" == winddisplay && (winddisplay = "Hướng Nam");
 var thoitiet = `(~~[ ${gio} ]~~)\n──────────────────\n[🗺️] →⁠ Cập nhật thời tiết tại: ${result[0].location.name}\n[🌡] →⁠ Nhiệt độ: ${result[0].current.temperature}°${result[0].location.degreetype}\n[✏️] →⁠ Mô tả: ${skytext}\n[♒] →⁠ Độ ẩm: ${result[0].current.humidity}%\n[💨] →⁠ Hướng gió: ${result[0].current.windspeed} ${winddisplay}\n[⏰] →⁠ Ghi nhận vào: ${result[0].current.observationtime}\n[🗺️] →⁠ Từ trạm ${result[0].current.observationpoint}\n────────────────────\n🔄 Đây Là Tin Nhắn Tự Động`;

 msg = msg.replace(/{thoitiet}/, thoitiet);

 msg = {
 body: msg,
 };

 global.data.allThreadID.forEach(i => o.api.sendMessage(msg, i));
 }
}, 1000);

module.exports.run = () => {};