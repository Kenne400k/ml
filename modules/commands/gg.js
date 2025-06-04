module['exports']['config'] = {
  name: "prodia",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Arjhil",
  description: "Generate an image.",
  commandCategory: "Tiện ích",
  usages: "[prompt | model]",
  cooldowns: 0
};

const fs = require("fs");
const { get } = require("axios");

module['exports']['run'] = async function({ api, event, args }) {
  let path = __dirname + "/cache/image.png";
  const tzt = args.join(" ").split("|").map(item => item.trim());
  let txt = tzt[0];
  let txt2 = tzt[1];

  let tid = event.threadID;
  let mid = event.messageID;

  if (!args[0] || !txt || !txt2) return api.sendMessage("Please provide a prompt and a model.", tid, mid);

  try {
      api.sendMessage("⏳ Generating...", tid, mid);

      let enctxt = encodeURI(txt);
      let url = `https://arjhil-prodia-api.arjhilbard.repl.co/generate?prompt=${enctxt}&model=${txt2}`;

      let result = (await get(url, { responseType: "arraybuffer" })).data;
      fs.writeFileSync(path, Buffer.from(result, "utf-8"));
      api.sendMessage({ attachment: fs.createReadStream(path) }, tid, () => fs.unlinkSync(path), mid);
  } catch (e) {
      return api.sendMessage(e.message, tid, mid);
  }
};
