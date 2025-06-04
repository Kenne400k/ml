exports.config = {
  name: 'setname', // Tên lệnh
  version: '4.0', // Phiên bản của lệnh
  hasPermssion: 0, // Quyền hạn sử dụng
  credits: 'DC-Nam', // Code được lên ý tưởng từ Nguyễn Lê Quốc Huy (Táo)
  description: '',
  commandCategory: 'group', // Nhóm lệnh
  usages: '[]',
  cooldowns: 3
};
let stream_url = url=>require('axios').get((url), {
  responseType: 'stream',
}).then(res=>res.data);

exports.run = async o=> {
  try {
    let {
      threadID: tid,
      senderID: sid,
      mentions = {},
      messageReply: msgr = {},
      participantIDs,
      args,
    } = o.event;
    let name_input = o.args.slice(1).join(' ');
    let prefix = args[0].replace(exports.config.name, '');
    var send = msg => o.api.sendMessage(msg, tid, o.event.messageID);
    let thread = await o.Threads.getData(tid) || {};
    let asnn = thread.data.auto_set_nickname;
    let nicknames = Object.entries(thread.threadInfo.nicknames || {}).filter($=>participantIDs.map($=>''+$).includes($[0]+''));

    if (!asnn)asnn = thread.data.auto_set_nickname = {};

    switch (o.args[0]) {
      case 'add': {
        if (!name_input)return send(`Hướng dẫn đặt autosetname:\n1. \${full_name} → Hiển thị tên đầy đủ của thành viên mới\n\n2. \${short_name} → Hiển thị tên ngắn của thành viên mới\n\n3. \${time_join} → Hiển thị thời gian tham gia nhóm\n\n📌 VD: ${args[0]} add <name cần đặt> \${short_name}`);
        
        asnn.all = name_input;

        send(`Đã thiết lập thành công auto setname cho thành viên mới!`);
      };
        break;
      case 'remove': {
        asnn.all = null;

        send(`Đã xóa thành công auto setname khi có thành viên mới!`);
      };
        break;
      case 'bd': {
        let mention = Object.entries(mentions)[0] || [];
        let target_id = msgr.senderID || mention[0] || sid;
        o.api.changeNickname(mention[1]?name_input.replace(mention[1], ''):name_input, tid, target_id, async(err, res)=> {
          if (!!err)return send({
            body: `⚠️ Đã xảy ra lỗi! (có thể do nhóm đã bật link liên kết tham gia nên bot không thể đổi biệt danh được)\n⚠ Có thể facebook đã chặn tính năng nên bot không thể đặt biệt danh được trong 1 khoảng thời gian.`,
            attachment: await stream_url('https://i.imgur.com/jHqgpGk.jpeg'),
            });
        });
      };
        break;
      case 'all': {
        if (!name_input)return send(`Hướng dẫn:\n1. \${full_name} → lấy tên đầy đủ thành viên\n2. \${short_name} → lấy tên ngắn của thành viên (không lấy họ)\n\n📌 VD: ${args[0]} all <name cần đặt> \${full_name}`);
        
        let userInfo = (await o.api.getThreadInfo(tid)).userInfo;
        let count_error = 0;
        for (let id of participantIDs.filter($=>$ != o.api.getCurrentUserID()))try {
          let get_info = userInfo.find($=>$.id==id);
          let full_name = get_info.name//(await o.Users.getData(id) || {}).name || '';
          let short_name = get_info.firstName//full_name.split(' ')[0];
          let name_set = name_input.replace(/\${full_name}/g, full_name).replace(/\${short_name}/g, short_name);

          await new Promise((resolve, reject)=>o.api.changeNickname(name_set, tid, id, (err, res)=>err?reject(err): resolve(res)));
        }catch(e) {
          ++count_error;
          console.log(e);
        };

        send(`Đổi Tên Tất Cả Thất Bại ${count_error}/${participantIDs.length}`);
      };
        break;
      case 'list': {
        send(`[ Danh Sách Biệt Danh ]\n\n${nicknames.map(($, i)=>`${i+1}. ${global.data.userName.get($[0])}\n→ ${$[1] || null}\n${'─'.repeat(15)}`).join('\n')}\n\n📌 Hiện tại có ${nicknames.filter($=>!$[1]).length} thành viên chưa đặt biệt danh!`);
      };
        break;
      case 'check': {
        let nicknames = Object.entries((await o.api.getThreadInfo(tid)).nicknames);
        send(`[ Danh Sách Chưa Đổi Biệt Danh ]\n\n${nicknames.filter($=>!$[1]).map(($, i)=>`${i+1}. ${global.data.userName.get($[0])}\n${'─'.repeat(15)}`).join('\n')}`);
      };
        break;
      
      default: {
        send(`[ Thay Đổi Biệt Danh ]
─────────────\n📌 Hướng dẫn sử dụng:\n\nDùng: ${args[0]} add → Tự động đặt biệt danh khi có thành viên mới.\n\nDùng: ${args[0]} remove → Xóa tự động đặt biệt danh cũ.\n\nDùng: ${args[0]} bd <name cần đặt> → Đặt biệt danh cho bản thân có thể dùng @tag hoặc reply tin nhắn của người khác để đặt biệt danh.\n\nDùng: ${args[0]} all → Để đặt biệt danh cho tất cả thành viên.\n\nDùng: ${args[0]} list → Để xem danh sách biệt danh của thành viên.\n\nDùng: ${args[0]} check → Xem danh sách những thành viên chưa đổi biệt danh.`);
      };
        break;
    };

    o.Threads.setData(tid, thread);
  } catch(e) {
    console.log(e);
    send(e.toString());
  };
};