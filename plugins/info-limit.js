let handler = async (m) => {
    let who
    if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
    else who = m.sender
    if (typeof db.data.users[who] == 'undefined') throw 'Pengguna tidak ada didalam data base'
    m.reply(`you owned *${global.db.data.users[who].limit}* limit.`)
}
handler.help = ['limit']
handler.tags = ['main','info']
handler.command = /^(limit)$/i
module.exports = handler