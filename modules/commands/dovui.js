module.exports.config = {
    name: 'dovui',
    version: '10.02',
    hasPermssion: 0,
    credits: 'DC-Nam',
    description: '',
    commandCategory: 'game',
    usages: '[]',
    cooldowns: 3,
    dependencies: {
        'axios': ''
    }
};
const $$ = {
    max: 0x2710-0x1,
    min: 0x400-0x18
};
const localeNum = n => ((+n).toLocaleString()).replace(/,/g, '.');
const {
    get
} = require('axios');
module.exports.run = function({
    api, event
}) {
    runRiddle({
        api, event, autoNext: false, author: event.senderID
    });
};
module.exports.handleReaction = function({
    handleReaction: $, api, event
}) {
    if (event.userID != $.author) return;; runRiddle({
        api, event, autoNext: event.reaction == '👍' ? ( $.autoNext ? false: true): false, author: $.author
    });
};
module.exports.handleReply = function({
    handleReply: $, api, event, Currencies: $_
}) {
    const index = $.data.option[(+event.args[0])-0x1];
    if (event.senderID != $.author || isNaN(event.args[0]) || !index) return;
    api.unsendMessage($.messageID);
    const ans = index == $.data.correct;
    const money = {
        type: `${ans ? 'increaseMoney': 'decreaseMoney'}`,
        num: randomNumber($$)};
    api.sendMessage(`→ Đáp Án: ${$.data.correct}\n→ ${ans ? `Lựa chọn của bạn là chính xác + ${localeNum(money.num)}`: `Rất tiếc lựa chọn của bạn đã sai (- ${localeNum(money.num)}`}$)\n→ Reaction để chơi tiếp ! hoặc Reaction 👍 ${$.autoNext ? 'tắt': 'bật'} auto chuyển câu hỏi ! `, event.threadID, (err, msg) => {
        global.client.handleReaction.push({
            name: 'dovui', messageID: msg.messageID, autoNext: $.autoNext, author: $.author
        });
        if ($.autoNext) runRiddle({ api, event, autoNext: true, author: event.senderID });
        $_[money.type](event.senderID, +money.num);
    }, event.messageID);
};
function runRiddle({
    api, event, autoNext, author
}) {
    get(`https://api-trankhuong.trankhuong-tk-jiang-2000.repl.co/game/dovui`).then(response => {
        const {
            question, option, correct
        } = response.data.data;
        var count = 0x0;
        api.sendMessage(`===== ĐỐ VUI =====\n→ Câu Đố: ${question}\n━━━━━━━━━━━━━━━━━━\n${option.map(i => `${++count}. ${i}`).join('\n')}\n━━━━━━━━━━━━━━━━━━\n→ Reply chọn 1 trong số các đáp án bên trên !\n→ Auto Next: ${autoNext ? 'bật': 'tắt'}`, event.threadID, (err, msg) => global.client.handleReply.push({
            name: 'dovui', messageID: msg.messageID, author, autoNext, data: response.data.data
        }));
    });
};
function randomNumber({
    min = 0x0, max = 0x0
}) {
    return Math.floor(Math.random()*(max-min+0x1))+min;
};