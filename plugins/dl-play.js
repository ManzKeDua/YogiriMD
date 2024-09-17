const fetch = require("node-fetch")
const yts = require("yt-search")

const handler = async (m, { conn, text }) => {
  if (!text) return m.reply(`*PERMINTAAN ERROR!! CONTOH :*\n> *.play not you*`)
  let res = await yts(text)
  let url = res.all;
  let result = url[Math.floor(Math.random() * url.length)]
  teks = `⏩ *PLAYING AUDIO*\n\n> *Judul : ${result.title}*\n> *Upload : ${result.ago}*\n> *Url : ${result.url}*\n *AUDIO SEDANG DIPROSES....*`
  conn.sendMessage(m.chat, { image: { url: result.thumbnail },  caption: teks }, { quoted: m })
  let shanz = await (await fetch('https://api.shannmoderz.xyz/downloader/ytdl?url=' + result.url)).json();
  let finish = shanz.result.audio;
  conn.sendMessage(m.chat,{ audio: { url: finish['128'].url }, mimetype: 'audio/mp4' },{ quoted: m })
}
handler.command = handler.help = ["play"]
handler.tags = ["downloader"]
module.exports = handler