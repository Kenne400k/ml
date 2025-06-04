var configCommand = {
    name: 'autodown',
    version: '1.1.1',
    hasPermssion: 2,
    credits: 'DC-Nam mod by DongDev',
    description: 'Tự động tải xuống khi phát hiện liên kết',
    commandCategory: 'Tiện Ích',
    usages: '[]',
    cooldowns: 2,
    images: [],
},
axios = require('axios'),
fse = require('fs-extra'),
path = __dirname+'/data/autodown.json';
let streamURL = (url, ext = 'jpg') => require('axios').get(url, {
    responseType: 'stream',
}).then(res => (res.data.path = `tmp.${ext}`, res.data)).catch(e => null);
function onLoad() {
    if (!fse.existsSync(path)) fse.writeFileSync(path, '{}');
};
function convertSecondsToHMS(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const remainingSeconds = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${remainingSeconds}`;

}
 
 

async function noprefix(arg) {
    const s = JSON.parse(fse.readFileSync(path));
    const moment = require("moment-timezone");
    const time = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss || DD/MM/YYYY");
    const cookiess = require('./../../acc.json');
              

    if (arg.event.senderID == (global.botID || arg.api.getCurrentUserID())) return;
    if ((typeof s[arg.event.threadID] == 'boolean' && !s[arg.event.threadID])) return;
    const out = (a, b, c, d) => arg.api.sendMessage(a, b?b: arg.event.threadID, c?c: null, d?d: arg.event.messageID),
    arr = arg.event.args,
    regEx_tiktok = /(^https:\/\/)((vm|vt|www|v)\.)?(tiktok|douyin)\.com\//,
    regEx_youtube = /(^https:\/\/)((www)\.)?(youtube|youtu)(PP)*\.(com|be)\//,
    regEx_facebook = /(^https:\/\/)(\w+\.)?(facebook|fb)\.(com|watch)\/((story\.php|page\.\w+)(\?|\/))?(story_fbid=|\w+\/)/,
    regEx_stotyfb = /(^https:\/\/)(www\.)?facebook\.com\/(stories|share)\/\d+\/[A-Za-z0-9_-]+=/,
    regEx_reelfb = /^https:\/\/(?:www\.)?facebook\.com\/(reel|share)\/\d+(?:\?mibextid=[\w\d]+)?$/i,
    regEx_fbwatch = /^https:\/\/fb\.watch\/\w+\/(\?\w+=\w+)?$/,
    regEx_threads = /(^https:\/\/)((www)\.)?(threads)\.(net)\//,
    regEx_instagram = /^\u0068\u0074\u0074\u0070\u0073\u003a\/\/(www\.)?instagram\.com\/(reel|p)\/\w+\/\w*/,
    regEx_capcut = /(^https:\/\/)((www)\.)?(capcut)\.(com)\//,
    regEx_imgur = /(^https:\/\/)((www|i)\.)?(imgur)\.(com)\//,
    regEx_soundcloud = /(^https:\/\/)((on)\.)?(soundcloud)\.(com)\//,
    regEx_zingmp3 = /(^https:\/\/)((www|mp3)\.)?(zing)\.(vn)\//,
    regEx_spotify = /(^https:\/\/)((www|open|play)\.)?(spotify)\.(com)\//,
    regEx_twitter = /(^https:\/\/)((www|mobile|web)\.)?(twitter|x)\.(com)\//,
    regEx_mediafire = /(^https:\/\/)((www|download)\.)?(mediafire)\.(com)\//,
    regEx_imgbb = /(^https:\/\/)((i)\.)?(ibb)\.(co)\//,
    regEx_filecatbox = /(^https:\/\/)((files)\.)?(catbox)\.(moe)\//,
    regEx_pinterest = /(^https:\/\/)(pin)\.(it)\//
for (const el of arr) {
  if (regEx_tiktok.test(el)) {
   const platform = el.includes("tiktok") ? "TIKTOK" : "DOUYIN";
   const data = (await axios.post(`https://www.tikwm.com/api/`, { url: el })).data.data;
   out({body: `[ ${platform} ] - Tự Động Tải\n──────────────────\n📝 Tiêu Đề: ${data.title}\n❤️ Lượt Thích: ${data.digg_count}\n🔎 Lượt xem: ${data.play_count}\n💬 Lượt Bình Luận: ${data.comment_count}\n🔁 Lượt Chia Sẻ: ${data.share_count}\n⏳ Thời Lượng: ${data.duration} giây\n👤 Tác giả: ${data.author.nickname} (${data.author.unique_id})\n🎵 Âm nhạc: ${data.music_info.author}\n──────────────────\n👉 Thả cảm xúc "😆" nếu muốn tải nhạc`, attachment: (data.images?await Promise.all(data.images.map($=>streamURL($))):await streamURL(data.play, 'mp4')),}, '', (err, dataMsg) => global.client.handleReaction.push({
                    name: configCommand.name, messageID: dataMsg.messageID, url: data.music
                })); // Video không logo thì sửa "wmplay" -> "play";
        };
        /* END */
if (regEx_facebook.test(el)) {
    const fbdl = require('./../../lib/fbdlpost.js');
    const cookie = cookiess.cookie;
    const url = el;

 

    fbdl.fbflpost(url, cookie, (error, res) => {
      if (error) {
    } else {
            let vd = res.attachment.filter($ => $.__typename == 'Video');
            let pt = res.attachment.filter($ => $.__typename == 'Photo');
            let s = attachment => out({
                body: `[ FACEBOOK ] - Tự Động Tải\n\n📝 Tiêu đề: ${res.message}\n⏰ Time: ${time}\n\n──────────────────\n📺 Đây là tính năng tự động tải khi phát hiện link` + '',
                attachment,

            }, '', (err, dataMsg) => global.client.handleReaction.push({
                name: configCommand.name,
                messageID: dataMsg.messageID,
                url_audio: null
            }));

            Promise.all(vd.map($ => streamURL($.browser_native_sd_url, 'mp4')))
                .then(r => r.filter($ => !!$).length > 0 ? s(r) : '');
            Promise.all(pt.map($ => streamURL(($.image || $.photo_image).uri, 'jpg')))
                .then(r => r.filter($ => !!$).length > 0 ? s(r) : '');

        }
    });
};
   /* END */
/* Tự Động Tải Video YouTube */

if (regEx_youtube.test(el)) {
    const ytdl = require('@distube/ytdl-core');
    const info = await ytdl.getInfo(el);
    const format = info.formats.find((f) => f.qualityLabel && f.qualityLabel.includes('360p') && f.audioBitrate);
    const formatvd = ytdl.chooseFormat(info.formats, { quality: '18' });
    const formatmp3 = ytdl.chooseFormat(info.formats, { quality: '140' });
const formattedTime = convertSecondsToHMS(info.videoDetails.lengthSeconds);
const inputTime = info.videoDetails.uploadDate;
const outputTimeZone = 'Asia/Ho_Chi_Minh';
const convertedTime = moment(inputTime).tz(outputTimeZone).format('DD/MM/YYYY');

  

    if (format) {
        const response = await axios.get(formatvd.url, { responseType: 'stream' });
   const attachmentData = response.data;
      out({
            body: `[ YOUTUBE ] - Tự Động Tải\n\n📝 Tiêu đề: ${info.videoDetails.title}\n⏳ Thời lượng: ${formattedTime}\n👤 Tên kênh: ${info.videoDetails.ownerChannelName}\n📅 Ngày tải lên: ${convertedTime}\n🔎 Lượt xem: ${info.videoDetails.viewCount}\n──────────────────\n👉 Thả cảm xúc "😆" nếu muốn tải nhạc`,
            attachment: attachmentData,
        }, '', (err, dataMsg) => global.client.handleReaction.push({
            name: configCommand.name,
            messageID: dataMsg.messageID,
            url: formatmp3.url,
        }));
    }
};

  /* END */
            /* 𝙏𝙪̛̣ 𝙙𝙤̣̂𝙣𝙜 𝙩𝙖̉𝙞 Video twitter 🌹*/
      if (regEx_twitter.test(el)) out({
          attachment: await streamURL((fdl = (await axios.get(`${global.config.configApi.link[1]}/api/twitterDL?url=${el}&apikey=${global.config.configApi.key[1]}`)).data.result, fdl.HD), 'mp4'), body: `[ TWITTER ] - Tự Động Tải\n\n📝 Tiêu đề: ${fdl.desc}\n──────────────────\n📺 Đây là tính năng tự động tải khi phát hiện link`
      }, '', (err, dataMsg) => global.client.handleReaction.push({
              name: configCommand.name, messageID: dataMsg.messageID, url: fdl.audio

          }));

      /* END */

/* TỰ ĐỘNG TẢI VD STORY FACEBOOK */
if (regEx_reelfb.test(el)) {
  const fbvideo = require("./../../lib/fbvideo.js");
  const cookie = cookiess.cookie;
  const videoUrl = el;
  const result = await fbvideo(videoUrl, cookie);
  const res = result.link;
  const title = result.title;
  const response = await axios.get(res, { responseType: 'stream' });
  out({
    body: `[ FACEBOOK ] - Tự Động Tải\n\n📝 Title: ${title}\n⏰ Time: ${time}\n──────────────────\n📺 Đây là tính năng tự động tải khi phát hiện link`,
    attachment: response.data
    });
};

/* END */
   /* 𝙏𝙪̛̣ 𝙙𝙤̣̂𝙣𝙜 𝙩𝙖̉𝙞 link mediafire 🌹*/
   if (regEx_mediafire.test(el)) {
            const res = (await axios.get(`${global.config.configApi.link[1]}/api/mediafireDL?url=${el}/file&apikey=${global.config.configApi.key[1]}`)).data.result;
            out({body: `[ MEDIAFIRE ] - Tự Động Tải\n\n📝 Title: ${res.title}\n🔁 Kích thước: ${res.size}\n📎 Link download: ${res.link}\n──────────────────\n📺 Đây là tính năng tự động tải khi phát hiện link`
        })
      };

      /* END */

    /* Tự động tải Ảnh Imgbb*/

   /*       if (regEx_imgbb.test(el)) {

let data = (await axios.get(el, { responseType: "stream" })).data;

            out({body: `━━━〖 𝗔𝗨𝗧𝗢𝗗𝗢𝗪𝗡 𝗜𝗕𝗕 〗━━━\n────────────────────\n\n➩ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶́𝗻𝗵 𝗻𝗮̆𝗻𝗴 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝘁𝗮̉𝗶 𝗮̉𝗻𝗵 𝗸𝗵𝗶 𝗽𝗵𝗮́𝘁 𝗵𝗶𝗲̣̂𝗻 𝗹𝗶𝗻𝗸`, attachment: data

           })     

      };*/

     /* END */

if (regEx_fbwatch.test(el)) {
 const res = await axios.get(`https://thenamk3.net/api/autolink.json?link=${el}&apikey=bGCz9cFa`);
   out({body: `[ FACEBOOK ] - Tự Động Tải\n\n📝 Tiêu đề: ${res.videos[0].title}\n⏰ Time: ${time}\n──────────────────\n📺 Đây là tính năng tự động tải khi phát hiện link`, attachment: await streamURL(res.videos[0].url, 'mp4')});
  };

  /* Tự động tải ảnh pinterest*/

  if (regEx_pinterest.test(el)) {
 const res = await axios.get(`https://api.imgbb.com/1/upload?key=588779c93c7187148b4fa9b7e9815da9&image=${el}`);
   out({body: `[ PINTEREST ] - Tự Động Tải\n\n📎 Link ảnh: ${res.data.data.image.url}\n──────────────────\n📺 Đây là tính năng tự động tải khi phát hiện link`, attachment: await streamURL(res.data.data.image.url, 'jpg')});

  };

        /* Tự động tải Ảnh hoặc vd imgur*/

     /*     if (regEx_imgur.test(el)) {

let data = (await axios.get(el, { responseType: "stream" })).data;

            out({body: `━━〖 𝗔𝗨𝗧𝗢𝗗𝗢𝗪𝗡 𝗜𝗠𝗚𝗨𝗥 〗━━\n────────────────────\n\n➩ Đ𝗮̂𝘆 𝗹𝗮̀ 𝘁𝗶́𝗻𝗵 𝗻𝗮̆𝗻𝗴 𝘁𝘂̛̣ đ𝗼̣̂𝗻𝗴 𝘁𝗮̉𝗶 𝗮̉𝗻𝗵 𝗵𝗼𝗮̣̆𝗰 𝘃𝗶𝗱𝗲𝗼 𝗸𝗵𝗶 𝗽𝗵𝗮́𝘁 𝗵𝗶𝗲̣̂𝗻 𝗹𝗶𝗻𝗸`, attachment: data

           })     

      };*/

  /* END */

  /* Tự động tải ảnh hoặc vd file catbox*/

          if (regEx_filecatbox.test(el)) {
let data = (await axios.get(el, { responseType: "stream" })).data;
            out({body: `[ FILECATBOX ] - Tự Động Tải\n\n──────────────────\n📺 Đây là tính năng tự động tải khi phát hiện link`, attachment: data

           })     

      };

      /* END */

/*tự động tải nhạc SoundCloud*/

if (regEx_soundcloud.test(el)) {
    axios.get(`https://apibot.sumiproject.io.vn/soundcloud/dowload?link=${el}`)
        .then(async (response) => {
            const data = response.data;

 

            // Extract necessary information

            const {
                audio: [{ url: mp3Url, durationText: duration }],
                title,
                likeCount,
                playCount,
                commentCount
            } = data;
 

            const messageBody = `[ SOUNDCLOUD ] - Tự Động Tải\n\n📝 Tiêu đề:  ${title}\n⏳ Thời lượng: ${duration}\n🧡 Lượt thích: ${likeCount}\n🎧 Lượt nghe: ${playCount}\n\n──────────────────\n📺 Đây là tính năng tự động tải khi phát hiện link`;
            out({
                attachment: await streamURL(mp3Url, 'mp3'),
                body: messageBody
            }, '', (err, dataMsg) => {
                if (err) {
                    console.error("Error sending message:", err);
                    return;
                }
                global.client.handleReaction.push({
                    name: configCommand.name,
                    messageID: dataMsg.messageID,
                    url: mp3Url
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching or processing SoundCloud API response:", error);
        });
}

 

/* Tự động tải vd capcut */

if (regEx_capcut.test(el)) {
    const capcutdl = require('./../../lib/capcut.js');
    const url = el;
    const result = await capcutdl(url);
    const videoURL = result[0].video; 
        out({
          body: `[ CAPCUT ] - Tự Động Tải\n\n📝 Tiêu đề: ${result[0].title}\n😻 Mô tả: ${result[0].description}\n🌸 Lượt dùng: ${result[0].usage}\n🧸 Link mẫu: ${result[0].urlVideo}\n──────────────────\n👉 Bạn muốn edit video thì ấn vào link mẫu ở trên để edit nha\n📺 Đây là tính năng tự động tải khi phát hiện link`, attachment: await streamURL(videoURL, 'mp4')});
   };

 

/* Tự động tải post Threads */

    if (regEx_threads.test(el)) {
    const headers = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.63 Safari/537.36',
        'Cookie': '_uafec=Mozilla%2F5.0%20(Linux%3B%20Android%2010%3B%20K)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F120.0.0.0%20Mobile%20Safari%2F537.36;',
        'Accept-Language': 'vi-VN, en-US'

    };

 
    axios.get(`https://api.threadsphotodownloader.com/v2/media?url=${el}`, { headers })
        .then(async (res) => {
            const data = res.data;
            const attachment = data.image_urls && data.image_urls.length > 0
                ? await Promise.all(data.image_urls.map(url => streamURL(url, 'jpg')))
                : (data.video_urls && data.video_urls.length > 0
                    ? await streamURL(data.video_urls[0].download_url, 'mp4')
                    : null);
           out({
                body: `[ THREADS ] - Tự Động Tải\n\n⏰ Time: ${time}\n──────────────────\n📺 Đây là tính năng tự động tải khi phát hiện link`,
                attachment
            });
      });
};
/* Tự động tải Post Instagram*/
    if (regEx_instagram.test(el)) {
    const { igdl } = require('./../../lib/igdl.js');
    const url = el;
    const res = await igdl(url);
    let vd = res.filter($ => $.type === 'video');
    let pt = res.filter($ => $.type === 'image');

 

    let s = attachment => out({ body: `[ INSTAGRAM ] - Tự Động Tải\n\n⏰ Time: ${time}\n\n──────────────────\n📺 Đây là tính năng tự động tải khi phát hiện link`, attachment,}, '', (err, dataMsg) => global.client.handleReaction.push({
        name: configCommand.name, messageID: dataMsg.messageID, url_audio: null
   }));

    Promise.all(vd.map($ => streamURL($.url, 'mp4'))).then(r => r.filter($ => !!$).length > 0 ? s(r) : '');
    Promise.all(pt.map($ => streamURL($.url, 'jpg'))).then(r => r.filter($ => !!$).length > 0 ? s(r) : '');
      }
   }
};

/* END */

async function reactionMsg(arg) {
  if(arg.event.reaction == '😆'){
    const out = (a, b, c, d) => arg.api.sendMessage(a, b?b: arg.event.threadID, c?c: null, d),
    _ = arg.handleReaction;
    if ('url'in _) out({
        body: `[ MP3 DOWNLOAD ] - Down mp3 từ video\n\n🎶 Âm thanh từ video mà bạn yêu cầu nè\n✏️ Đây là tính năng tự động down mp3 khi bạn thả cảm xúc ( 😆 ) vào video`, attachment: await streamURL(_.url, 'mp3')}, '', '', _.messageID);
     }
};

function runCommand(arg) {
    const out = (a, b, c, d) => arg.api.sendMessage(a, b?b: arg.event.threadID, c?c: null, d?d: arg.event.messageID);
    const data = JSON.parse(fse.readFileSync(path));
    s = data[arg.event.threadID] = typeof data[arg.event.threadID] != 'boolean'||!!data[arg.event.threadID]?false: true;
    fse.writeFileSync(path, JSON.stringify(data, 0, 4));
    out((s?'Bật': 'Tắt')+' '+configCommand.name);
};

 

module.exports = {
    config: configCommand,
    onLoad,
    run: runCommand,
    handleEvent: noprefix,
    handleReaction: reactionMsg

};