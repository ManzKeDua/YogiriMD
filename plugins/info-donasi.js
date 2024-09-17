let handler = async (m, { conn, usedPrefix }) => conn.reply(m.chat, `
╭─「 Donasi • Dana 」
│ • Pulsa [6288989721627]
│ • Dana  [6288989721627]
╰────
╭─「 *NOTE* 」
│ > Ingin donasi? wa.me/628898972627
│ _Hasil donasi akan digunakan buat sewa_
│ _atau beli *RDP/VPS* agar bot bisa jalan_
│ _24jam tanpa kendala_
╰────
`.trim(), m) // Tambah sendiri kalo mau
handler.help = ['donasi']
handler.tags = ['main']
handler.command = /^dona(te|si)$/i

module.exports = handler