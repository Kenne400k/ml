module.exports.config = {
    name: 'nasa',
    version: 'beta',
    hasPermssion: 0,
    credits: 'DC-Nam',// thời tiết từ vệ tinh NASA : )
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'Tiện ích',
    usages: '[]',
    cooldowns: 3
};
const nam = [
  {
    timer: '12:05:00 AM',
    message: ['\n{abc}']
  }
];
module.exports.onLoad = o => setInterval(async() => {
    const r = a => a[Math.floor(Math.random()*a.length)];
    if (á = nam.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())){
    const axios = require('axios');
    const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI('Hồ Chí Minh')}`);
  const moment = require("moment-timezone");
  var thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == "Thursday") thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
      const time = moment.tz("Asia/Ho_Chi_Minh").format( "DD/MM/YYYY");
  var lo = `${res.data[0].current.skytext}`
  if (lo == 'Sunny') lo = 'Trời Nắng'
  if (lo == 'Mostly Sunny') lo = 'Nhiều Nắng'
  if (lo == 'Partly Sunny') lo = 'Nắng Vài Nơi'
  if (lo == 'Rain Showers') lo = 'Mưa Rào'  
  if (lo == "T-Storms") lo = 'Có Bão'
  if (lo == 'Light Rain') lo = 'Mưa Nhỏ'
  if (lo == 'Mostly Cloudy') lo = 'Trời Nhiều Mây'
  if (lo == 'Rain') lo = 'Trời Mưa'
  if (lo == 'Heavy T-Storms') lo = 'Bão Lớn'
  if (lo == 'Partly Cloudy') lo = 'Mây Rải Rác'
  if (lo == 'Mostly Clear') lo = 'Trời Trong Xanh'
  if (lo == 'Cloudy') lo = 'Trời Nhiều Mây'
  if (lo == 'Clear') lo = 'Trời Trong Xanh, Không Mây'
      var winddisplay = res.data[0].current.winddisplay.toString().split(" ")[2];
        "Northeast" == winddisplay && (winddisplay = "Hướng Đông Bắc"), "Northwest" == winddisplay && (winddisplay = "Hướng Tây Bắc"), "Southeast" == winddisplay && (winddisplay = "Hướng Đông Nam"), "Southwest" == winddisplay && (winddisplay = "Hướng Tây Nam"), "East" == winddisplay && (winddisplay = "Hướng Đông"), "West" == winddisplay && (winddisplay = "Hướng Tây"), "North" == winddisplay && (winddisplay = "Hướng Bắc"), "South" == winddisplay && (winddisplay = "Hướng Nam");
    var abc = `Cập nhật thời tiết tại ${res.data[0].location.name}\n→ Vào lúc: ${thu} ${time}\n→ Nhiệt độ: ${res.data[0].current.temperature}°${res.data[0].location.degreetype}\n→ Dự báo: ${lo}\n→ Độ ẩm: ${res.data[0].current.humidity}%\n→ Hướng gió: ${res.data[0].current.windspeed} ${winddisplay}\n→ Ghi nhận từ vệ tinh lúc: ${res.data[0].current.observationtime} từ trạm kiểm soát vũ trụ NASA :)\n→ Dùng lệnh nasa + tỉnh/tp để xem chi tiết của những ngày kế tiếp`;
      
   global.data.allThreadID.forEach(i => o.api.sendMessage(r(á.message).replace(/{abc}/g, abc), i));
    };
}, 1000);

module.exports.run = async o => {
  try{
  const axios = global.nodemodule["axios"];
  const fs = global.nodemodule["fs-extra"];
  const request = global.nodemodule["request"];
  const { api, event, args } = o;
	const { threadID, messageID } = event;
  var nasa = args.join(" ");
  if(!nasa) return api.sendMessage("nhập tỉnh/tp cần xem thời tiết", threadID);
  const res = await axios.get(`https://api.popcat.xyz/weather?q=${encodeURI(nasa)}`);
  const nasaa = res.data[0].forecast;
  var text = `Thời tiết của: ${nasa} vào các ngày`;
  for (let i = 0; i < 5; i++) {
      var thu = nasaa[i].day
  if (thu == 'Sunday') thu = 'Chủ Nhật'
  if (thu == 'Monday') thu = 'Thứ Hai'
  if (thu == 'Tuesday') thu = 'Thứ Ba'
  if (thu == 'Wednesday') thu = 'Thứ Tư'
  if (thu == 'Thursday') thu = 'Thứ Năm'
  if (thu == 'Friday') thu = 'Thứ Sáu'
  if (thu == 'Saturday') thu = 'Thứ Bảy'
  var lo = nasaa[i].skytextday
  if (lo == 'Sunny') lo = 'Trời Nắng'
  if (lo == 'Mostly Sunny') lo = 'Nhiều Nắng'
  if (lo == 'Partly Sunny') lo = 'Nắng vài Nơi'
  if (lo == 'Rain Showers') lo = 'Mưa Rào'  
  if (lo == "T-Storms") lo = 'Có Bão'
  if (lo == 'Light Rain') lo = 'Mưa Nhỏ'
  if (lo == 'Mostly Cloudy') lo = 'Trời Nhiều Mây'
  if (lo == 'Rain') lo = 'Trời Mưa'
  if (lo == 'Heavy T-Storms') lo = 'Bão Lớn'
  if (lo == 'Partly Cloudy') lo = 'Mây Rải Rác'
  if (lo == 'Mostly Clear') lo = 'Trời Trong Xanh'
  if (lo == 'Cloudy') lo = 'Trời Nhiều Mây'
  if (lo == 'Clear') lo = 'Trời Trong Xanh, Không Mây'
    text += `\n${i+1}. ${thu} ${nasaa[i].date}\n→ Nhiệt độ dự báo: từ ${nasaa[i].low}°C ➝ ${nasaa[i].high}°C\n→ Dự báo: ${lo}\n→ Tỷ lệ mưa: ${nasaa[i].precip}%\n`
  };
   api.sendMessage(text, threadID, messageID)
  }catch(err){api.sendMessage(`${err}`, threadID)}
  }