const { readFileSync } = require('fs')

let Schema = async (m, { usedPrefix, command, text }) => {
    let ar = Object.keys(plugins)
    let ar1 = ar.map(v => v.replace('.js', ''))
    if (!text) return m.reply(Func.example(usedPrefix, command, `Namafile\n\n[ LIST FILE ]\n${ar1.map(v => ' ' + v).join`\n`}`))
    if (!ar1.includes(text)) return m.reply(`'${text}' tidak ditemukan!\n\n${ar1.map(v => ' ' + v).join`\n`}`)
    let meki = readFileSync('./plugins/' + text + '.js', 'utf-8')
    m.reply(meki)
}
Schema.help = ['gp'].map(v => v + ' [ FILENAME ]')
Schema.tags = ['owner']
Schema.command = /^(getplugins|gpg|gp)$/i
Schema.owner = true
module.exports = Schema