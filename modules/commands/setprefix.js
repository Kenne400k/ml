module.exports.config = {
	name: "setprefix",
	version: "1.0.1",
	hasPermssion: 1,
	credits: "Mirai Team",//Mod By Huykaiser❤️
	description: "Quản Trị Viên",//đổi luôn biệt danh bot
	commandCategory: "group",
	usages: "[prefix/reset]",
	cooldowns: 5
};
 
module.exports.languages ={
	"vi": {
		"successChange": "Đã chuyển đổi dấu lệnh của nhóm thành: %1",
		"missingInput": "Phần dấu lệnh cần đặt không được để trống",
		"resetPrefix": "Đã reset dấu lệnh thành mặc định: %1",
		"confirmChange": "Bạn có chắc muốn thay đổi dấu lệnh của nhóm thành: 「 %1 」\nVui lòng thả cảm xúc vào tin nhắn này để đổi dấu lệnh."
	},
	"en": {
		"successChange": "Changed prefix into: %1",
		"missingInput": "Prefix have not to be blank",
		"resetPrefix": "Reset prefix to: %1",
		"confirmChange": "Are you sure that you want to change prefix into: %1"
	}
}
 
module.exports.handleReaction = async function({ api, event, Threads, handleReaction, getText }) {
	try {
		if (event.userID != handleReaction.author) return;
		const { threadID, messageID } = event;
		var data = (await Threads.getData(String(threadID))).data || {};
		data["PREFIX"] = handleReaction.PREFIX;
		await Threads.setData(threadID, { data });
		await global.data.threadData.set(String(threadID), data);
		api.unsendMessage(handleReaction.messageID);
    api.changeNickname(`『 ${handleReaction.PREFIX} 』 ⪼ ${global.config.BOTNAME}`, event.threadID, event.senderID);
		return api.sendMessage(getText("successChange", handleReaction.PREFIX), threadID, messageID);
 
	} catch (e) { return console.log(e) }
}
 
module.exports.run = async ({ api, event, args, Threads , getText }) => {
	if (typeof args[0] == "undefined") return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	let prefix = args[0].trim();
	if (!prefix) return api.sendMessage(getText("missingInput"), event.threadID, event.messageID);
	if (prefix == "reset") {
		var data = (await Threads.getData(event.threadID)).data || {};
		data["PREFIX"] = global.config.PREFIX;
		await Threads.setData(event.threadID, { data });
		await global.data.threadData.set(String(event.threadID), data);
    var uid = api.getCurrentUserID()
    api.changeNickname(`『 ${handleReaction.PREFIX} 』 ⪼ ${global.config.BOTNAME}`,event.threadID, uid);
 
		return api.sendMessage(getText("resetPrefix", global.config.PREFIX), event.threadID, event.messageID);
	} else return api.sendMessage(getText("confirmChange", prefix), event.threadID, (error, info) => {
		global.client.handleReaction.push({
			name: "setprefix",
			messageID: info.messageID,
			author: event.senderID,
			PREFIX: prefix
		})
	})
}