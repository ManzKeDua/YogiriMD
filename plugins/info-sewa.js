const { createHash } = require('crypto')
const fetch = require('node-fetch')

let handler = async function (m, { text, usedPrefix, command }) {
let sky = `*𝖯𝗅𝖺𝗇𝗇𝗂𝗇𝗀 Yogiri*

*𝖦𝗋𝗈𝗎𝗉 𝖠𝗌𝗌𝗂𝗌𝗍𝖺𝗇𝗍:*
┌  ◦ 𝖠𝖼𝖼𝖾𝗌𝗌 𝖠𝗇𝗍𝗂𝗅𝗂𝗇𝗄
│  ◦ 𝖠𝖼𝖼𝖾𝗌𝗌 𝖦𝖺𝗆𝖾 𝖱𝗉𝗀
│  ◦ 𝖦𝖾𝗍 𝖺 𝖳𝖾𝗑𝗍 𝖶𝖾𝗅𝖼𝗈𝗆𝖾 
│  ◦ 𝖠𝗇𝖽 𝖬𝖺𝗇𝗒𝗆𝗈𝗋𝖾
└  ◦ 𝖨𝖣𝖱 𝟩.𝟢𝟢𝟢 / 𝖦𝗋𝗈𝗎𝗉

*𝖯𝗋𝖾𝗆𝗂𝗎𝗆 𝖴𝗌𝖾𝗋:*
┌  ◦ 𝖠𝖼𝖼𝖾𝗌𝗌 𝖬𝖾𝗇𝗎 𝖯𝗋𝖾𝗆𝗂𝗎𝗆
│  ◦ 𝖦𝖾𝗍 𝖴𝗇𝗅𝗂𝗆𝗂𝗍𝖾𝖽 𝖫𝗂𝗆𝗂𝗍
│  ◦ 𝖦𝖾𝗍 𝟣𝟢𝟢𝗄 𝖬𝗈𝗇𝖾𝗒 𝖱𝗉𝗀 / 𝖣𝖺𝗒
│  ◦ 𝖠𝗇𝖽 𝖬𝖺𝗇𝗒𝗆𝗈𝗋𝖾
└  ◦ 𝖨𝖣𝖱 𝟣𝟤.𝟢𝟢𝟢 / 𝖠𝖼𝖼𝗈𝗎𝗇𝗍

*𝖬𝗈𝖽𝖾𝗋𝖺𝗍𝗈𝗋 𝖴𝗌𝖾𝗋:*
┌  ◦ 𝖠𝖼𝖼𝖾𝗌𝗌 𝖡𝗎𝗀 𝖵𝖾𝗋𝗂𝖿𝗒
│  ◦ 𝖠𝖼𝖼𝖾𝗌𝗌 𝖡𝖺𝗇 & 𝖴𝗇𝖻𝖺𝗇 𝖶𝖺
│  ◦ 𝖴𝗇𝗅𝗂𝗆𝗂𝗍𝖾𝖽 𝖬𝗈𝗇𝖾𝗒 𝖱𝗉𝗀
│  ◦ 𝖠𝗇𝖽 𝖬𝖺𝗇𝗒𝗆𝗈𝗋𝖾
└  ◦ 𝖨𝖣𝖱 𝟤𝟢.𝟢𝟢𝟢 / 𝖠𝖼𝖼𝗈𝗎𝗇𝗍

𝖼𝗁𝖺𝗍 𝗈𝗐𝗇𝖾𝗋 [6288989721627] 𝗎𝗇𝗍𝗎𝗄 𝗂𝗇𝖿𝗈 𝗅𝖾𝖻𝗂𝗁 𝖽𝖾𝗍𝖺𝗂𝗅.`

let message = {
text: sky,
contextInfo: {
externalAdReply: {
title: `${global.namebot} Planning`,
body: "",
thumbnailUrl: "https://telegra.ph/file/5753b06a866bed1ec3e28.jpg",
sourceUrl: "https://instagram.com/manzkenzz",
mediaType: 1,
renderLargerThumbnail: true
}}}

await conn.sendMessage(m.chat, message, { quoted: fkontak})
}
handler.tags = ['info','main']
handler.help = ['premium','price','buyprem','sewa','pricelist','buysewa']
handler.command = /^(premium|price|buyprem|sewa|pricelist|buysewa)$/i
handler.register = false
handler.premium = false
handler.limit = true

module.exports = handler