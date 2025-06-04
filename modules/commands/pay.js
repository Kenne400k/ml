module.exports.config = {
    name: "pay",
    version: "1.1.1",
    hasPermssion: 0,
    credits: "Mirai Team",
    description: "Chuyển tiền của bản thân cho ai đó",
    commandCategory: "Người dùng",
    usages: "pay @tag coins",
    cooldowns: 5,
     };

module.exports.run = async ({ event, api, Currencies, args, Users }) => {
let { threadID, messageID, senderID } = event;
if(event.type == "message_reply") { 
mention = event.messageReply.senderID
var name = (await Users.getData(mention)).name
if(!isNaN(args[0])) {
        const coins = parseInt(args[0]);
        let balance = (await Currencies.getData(senderID)).money;
        if (coins <= 0) return api.sendMessage('Số tiền bạn muốn chuyển không hợp lệ',threadID,messageID);
        if (coins > balance) return api.sendMessage('Số tiền bạn muốn chuyển lớn hơn số dư bạn hiện có!',threadID,messageID);
        else {
        return api.sendMessage({ body: `Đã chuyển cho ${name} ${args[0]}$`}, threadID, async () => {
            await Currencies.increaseMoney(mention, parseInt(coins));
                  Currencies.decreaseMoney(senderID, parseInt(coins));
            }, messageID);
        }
    } else return api.sendMessage('Vui lòng nhập số tiền mà bạn muốn chuyển',threadID,messageID); 
}
else {
const mention = Object.keys(event.mentions)[0];
let name = event.mentions[mention].split(" ").length
if(!mention) return api.sendMessage('Vui long tag người mà bạn cần chuyển tiền cho!',threadID,messageID);
else {
	if(!isNaN(args[0+ name])) {
		const coins = parseInt(args[0+ name]);
		let balance = (await Currencies.getData(senderID)).money;
        if (coins <= 0) return api.sendMessage('Số tiền bạn muốn chuyển không hợp lệ',threadID,messageID);
		if (coins > balance) return api.sendMessage('Số tiền của bạn muốn chuyển lớn hơn số dư của bạn hiện có!',threadID,messageID);
		else {
        return api.sendMessage({ body: 'Đã chuyển cho ' + event.mentions[mention].replace(/@/g, "") + ` ${args[0+ name]}$`}, threadID, async () => {
            await Currencies.increaseMoney(mention, parseInt(coins));
                  Currencies.decreaseMoney(senderID, parseInt(coins));
            }, messageID);
		}
	} else return api.sendMessage('Vui lòng nhập số tiền bạn muốn chuyển!',threadID,messageID);
}
}
}