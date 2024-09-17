let fs = require("fs");
const {
  js,
  js_beautify
} = require("js-beautify");
let Schema = async (m, { text, usedPrefix, command }) => {
  if (!text) return m.reply(Func.example(usedPrefix, command, `Namefile`))

  if (command === "sf") {
  try {
    if (!m.quoted) throw `*[ ! ] Reply Your Progress Code*`;
    let path = `plugins/${text}.js`;
   await fs.writeFileSync(path, m.quoted.text);
    let key = await conn.sendMessage(m.chat,
      { text: "*[ PROSESS SAVE ]*" },
      { quoted: m },
    );
    await conn.sendMessage(m.chat, {
        text: `*[ BERHASIL  ]*`,
        edit: key.key,
      },
      { quored: m },
    );
    } catch (e) {
    console.log(e)
    }
  } else 
  if (command === "sb") {
  try {
    if (!m.quoted) throw `*[ ! ] Reply Your Progress Code*`;
    let path = `plugins/${text}.js`;
    const beautifulJS = js(m.quoted.text);
    await fs.writeFileSync(path, beautifulJS);
    let key = await conn.sendMessage(m.chat,
      { text: "*[ PROSESS SAVE ]*" },
      { quoted: m },
    );
    await conn.sendMessage(m.chat, {
        text: `*[ BERHASIL SAVE DAN DI RAPIKAN ]*`,
        edit: key.key,
      },
      { quored: m },
    );
    } catch (e) {
    console.log(e)
    }
  } else if (command === "df") {
    let path = `plugins/${text}.js`;
    let key = await conn.sendMessage(m.chat,
      { text: "*[ PROSESS DELETE ]*" },
      { quoted: m },
    );
    if (!fs.existsSync(path))
      return conn.sendMessage(m.chat,
        { text: `*[ FILE TIDAK DI TEMUKAN ]*`, edit: key.key },
        { quored: m },
      );
    fs.unlinkSync(path);
    await conn.sendMessage(
      m.chat,
      { text: `*[ BERHASIL MENGHAPUS FILE ]*`, edit: key.key },
      { quored: m },
    );
  }
};
Schema.help = ["sf", "sb", "df"].map((v) => v + " [ FILENAME ]");
Schema.tags = ["owner"];
Schema.command = /^(sf|sb|df)$/i;
Schema.rowner = true;
module.exports = Schema;
