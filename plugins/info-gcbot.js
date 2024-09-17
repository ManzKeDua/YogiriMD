let handler = async (m, { conn }) => { 

         let caption = `*Mʏ Gᴄ Oғғɪᴄɪᴀʟ*`;
  conn.reply(m.chat, caption, m, {
      contextInfo: {
        externalAdReply: {
          title: wm,
          thumbnailUrl: 'https://telegra.ph/file/5753b06a866bed1ec3e28.jpg' + 'My Group',
          sourceUrl: sgc,
          mediaType: 1,
          renderLargerThumbnail: true, 
        }
      }
    });
 }
 handler.help = ['gcbot'];
handler.tags = ['main', 'info'];
handler.command = /^(gcbot|groupbot|botgc|botgroup)$/i;
module.exports = handler;