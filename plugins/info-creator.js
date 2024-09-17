const fetch = require('node-fetch')
let handler = async (m, { conn, usedPrefix, text, args, command }) => {
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let name = await conn.getName(who)
if (command == 'owner') {
 let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:WhatsApp; ManzKenz\nNICKNAME: ManzKenz\nORG: ManzKenz\nTITLE:\nitem1.TEL;waid=6288989721627:+62 889 8972 1627\nitem1.X-ABLabel: Nomor Owner\nitem2.URL:https://xnxx.com\nitem2.EMAIL;type=INTERNET: humanznodejs@gmail.com\nitem2.X-ABLabel:\nitem4.ADR:;;🇮🇩 Indonesia;;;;\nEND:VCARD`
const tag_own = await conn.sendMessage(m.chat, { contacts: { displayName: wm, contacts: [{ vcard }] }}, { quoted: fkontak })
m.reply(`Hay Kak Itu Ownerku, Jangan Macam~Macam Ya`)
}
if (command == 'creator') {
  let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:Whatsapp; ManzKenz\nNICKNAME: ManzKenz\nORG: ManzKenz\nTITLE:\nitem1.TEL;waid=6288989721627:+62 889 8972 1627\nitem1.X-ABLabel: Nomor Owner\nitem2.URL:https://xnxx.com\nitem2.EMAIL;type=INTERNET: humanznodejs@gmail.com\nitem2.X-ABLabel:\nitem4.ADR:;;🇮🇩 Indonesia;;;;\nEND:VCARD`
const tag_own = await conn.sendMessage(m.chat, { contacts: { displayName: wm, contacts: [{ vcard }] }}, { quoted: fkontak })
m.reply(`Hai Kak Itu Nomor Developerku Yang Memprogram Aku, Mohon Jangan Di Spam Ya >,<`)
}
}
handler.help = ['owner', 'creator']
handler.tags = ['info']

handler.command = /^(creator|owner|owner2)$/i

module.exports = handler