/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

const handler = async (m, { conn }) => {
  const chatID = m.chat;
  const onlineMembers = [];

  const members = await conn.groupMetadata(chatID);
  for (const member of members.participants) {
    console.log('Member:', member);
    if (member.id && member.id && conn.user.jid && member.id.includes('@s.whatsapp.net')) {
      onlineMembers.push(`⋄ Name: ${conn.getName(member.id.split(`@`)[0] + `@s.whatsapp.net`)}\n⋄ wa.me/${member.id.split('@')[0]}\n`);
    }
  }

  if (onlineMembers.length > 0) {
    const onlineList = onlineMembers.join('\n');
    m.reply(`List member group:\n\n*Total*: ${onlineMembers.length}\n\n${onlineList}`);
  } else {
    m.reply('Tidak ada anggota yang sedang online.');
  }
     // delete onlineMembers
      
};

handler.help = ['listmember'];
handler.command = ['listmem','listmember']
handler.tags = ['group'];
handler.group = true
module.exports = handler;