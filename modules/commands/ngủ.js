module.exports.config = {
	name: "ngủ",
	version: "3.0.0",
	hasPermssion: 0,
	credit: "Kz Khánhh",
	description: "hi gửi sticker and hình ảnh",
	commandCategory: "Nhóm",
	usages: "[text]",
	cooldowns: 2
};

module.exports.handleEvent = async ({ api, event, Threads, Users }) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	const moment = require("moment-timezone");
	const gio = moment.tz("Asia/Ho_Chi_Minh").format("D/MM/YYYY || HH:mm:ss");
	let thu = moment.tz('Asia/Ho_Chi_Minh').format('dddd');
	if (thu == 'Sunday') thu = '𝐶ℎ𝑢̉ 𝑁ℎ𝑎̣̂𝑡'
	if (thu == 'Monday') thu = '𝑇ℎ𝑢̛́ 𝐻𝑎𝑖 '
	if (thu == 'Tuesday') thu = '𝑇ℎ𝑢̛́ 𝐵𝑎'
	if (thu == 'Wednesday') thu = '𝑇ℎ𝑢̛́ 𝑇𝑢̛'
	if (thu == "Thursday") thu = '𝑇ℎ𝑢̛́ 𝑁𝑎̆𝑚'
	if (thu == 'Friday') thu = '𝑇ℎ𝑢̛́ 𝑆𝑎́𝑢'
	if (thu == 'Saturday') thu = '𝑇ℎ𝑢̛́ 𝐵𝑎̉𝑦'

	let KEY = ["ngủ", "ngủ đây nha", "đi ngủ đây", "ngủ đây", "ngủ nha", "ngủ thôi", "ngủ ạ", "đi ngủ thôi", "ngủ đi" ];

	let thread = global.data.threadData.get(event.threadID) || {};
	// Remove the conditional check and execute the code directly
	// if (typeof thread["hi"] === "undefined" || thread["hi"] === false) return;
	// else {
	if (KEY.includes(event.body.toLowerCase())) {
		let data = ["526214684778630", "526220108111421","526214684778630","526220108111421","526220308111401","526220484778050","526220691444696","526220814778017","526220978111334","526221104777988","526221318111300","526221564777942","526221711444594","526221971444568","2523892817885618","2523892964552270","2523893081218925","2523893217885578","2523893384552228","2523892544552312","2523892391218994","2523891461219087","2523891767885723","2523891204552446","2523890691219164","2523890981219135","2523890374552529","2523889681219265","2523889851219248","2523890051219228","2523886944552872","2523887171219516","2523888784552688","2523888217886078","2523888534552713","2523887371219496","2523887771219456","2523887571219476" ];
		let sticker = data[Math.floor(Math.random() * data.length)];
		let data2 = [
			"𝐇𝐚𝐩𝐩𝐲=))", "𝐯𝐮𝐢 𝐯𝐞̉:𝟑", "𝐡𝐚̣𝐧𝐡 𝐩𝐡𝐮́𝐜 ❤", "𝐧𝐡𝐢𝐞̂̀𝐮 𝐧𝐢𝐞̂̀𝐦 𝐯𝐮𝐢 😘"
		];
		let text = data2[Math.floor(Math.random() * data2.length)];

		let hours = parseInt(moment().tz("Asia/Ho_Chi_Minh").format("HH"));
		let session =
			(hours > 0 && hours <= 4 ? "𝐬𝐚́𝐧𝐠 𝐭𝐢𝐧𝐡 𝐦𝐨̛" :
				hours > 4 && hours <= 7 ? "𝐬𝐚́𝐧𝐠 𝐬𝐨̛́𝐦" :
					hours > 7 && hours <= 10 ? "𝐬𝐚́𝐧𝐠" :
						hours > 10 && hours <= 12 ? "𝐭𝐫𝐮̛𝐚" :
							hours > 12 && hours <= 17 ? "𝐜𝐡𝐢𝐞̂̀𝐮" :
								hours > 17 && hours <= 18 ? "𝐜𝐡𝐢𝐞̂̀𝐮 𝐭𝐚̀" :
									hours > 18 && hours <= 21 ? "𝐭𝐨̂́𝐢" :
										hours > 21 && hours <= 24 ? "𝐭𝐨̂́𝐢 𝐦𝐮𝐨̣̂𝐧" :
											"lỗi");

		let name = await Users.getNameUser(event.senderID);
		let mentions = [{
			tag: name,
			id: event.senderID
		}];

		var link = [
			"https://i.imgur.com/zyYDajr.mp4",
			"https://i.imgur.com/I98aB1o.mp4",
			"https://i.imgur.com/6oJIcHq.mp4",

		];
		var callback = function () {
			api.sendMessage({
				body: `💖🏩『 𝐀𝐔𝐓𝐎𝐍𝐎𝐓𝐈 』🏩💖\n━━━━━━━━━━━━━\n[👤] 𝐂𝐡𝐮́𝐜 𝐛𝐛𝐢 ${name} 𝐜𝐮𝐭𝐢 𝐧𝐠𝐮̉ 𝐧𝐠𝐨𝐧 𝐦𝐨̛ đ𝐞̣𝐩 𝐧𝐡𝐨́💤💤\n[⏳] 𝐓𝐡𝐨̛̀𝐢 𝐠𝐢𝐚𝐧: ${thu} ${gio}`,
				attachment: fs.createReadStream(__dirname + "/cache/6.mp3")
			}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/6.mp3"));
			api.sendMessage({
				body: ``,
				sticker: sticker
			}, event.threadID, event.messageID);
		};

		return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/6.mp3")).on("close", () => callback());
	}
	// }
};

module.exports.languages = {
	"vi": {
		"on": "Bật",
		"off": "Tắt",
		"successText": `${this.config.name} thành công`,
	},
	"en": {
		"on": "on",
		"off": "off",
		"successText": "success!",
	}
};

module.exports.run = async ({ event, api, Threads, getText }) => {
	let {
		threadID,
		messageID
	} = event;
	let data = (await Threads.getData(threadID)).data;
	if (typeof data["hi"] === "undefined" || data["hi"] === true) data["hi"] = true;
	else data["hi"] = true;
	await Threads.setData(threadID, {
		data
	});
	global.data.threadData.set(threadID, data);
	return api.sendMessage(`${(data["hi"] === true) ? getText("off") : getText("on")} ${getText("successText")}`, threadID, messageID);
};
