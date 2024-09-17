/*
    [FITUR BY EGVUAXRL GAUSAH DI APUS]
    
    *FITUR HD VIDEO YANG .hdvid SUSAH DI PAKAI BUAT YANG GA NGERTI CODEC VIDEO DAN AUDIO SERTA NAIKIN BITRATE DAN FPS LEBIH BAIK PAKE .hdvid2 BUAT YANG GA NGERTI
    
    link ch egvuaxrl untuk fitur yang lain : https://whatsapp.com/channel/0029Va9iaylFy724TO4TSc0J
    
    link gc untuk saran : https://chat.whatsapp.com/Gz3xoYG4mzaFP0xamibtFy
*/

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

let egvuaxrl = async (m, { conn, text, args, command }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let name = await conn.getName(who)
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
    if (command === "hdvid") {
  if (args.length < 1) {
    throw m.reply(`
      Cara menggunakan:
      *!hdvid [bitrate] [fps] [resolusi] [videocodec] [audiobitrate] [audiocodec]*

      Contoh:
      *!hdvid 2048k 60 1280x720 libx264 192k aac*
      
      List video codec:
      1. H.264
      2. H.265 (HEVC)
      3. VP8
      4. VP9
      5. AV1
      6. MPEG-4
      7. WMV
      8. Theora
      9. DV
      10. ProRes
      11. libx264

      Pilihan Audio Codec:
      1. aac
      2. mp3
      3. opus
    `);
  }
  if (!mime) {
    throw 'Video tidak ditemukan';
  }
  let videoData = await conn.downloadAndSaveMediaMessage(q, 'video');
  let output = './tmp/video.mp4';

  let bitrate = args[0] || '2048k';
  let fps = args[1] || 60;
  let resolution = args[2] || '1280x720';
  let videoCodec = args[3] || 'libx264';
  let audioBitrate = args[4] || '192k';
  let audioCodec = args[5] || 'aac';

  ffmpeg(videoData)
    .format('mp4')
    .size(resolution)
    .videoBitrate(bitrate)
    .videoCodec(videoCodec)
    .fps(fps)
    .audioBitrate(audioBitrate)
    .audioCodec(audioCodec)
    .output(output)
    .on('end', () => {
      conn.sendFile(m.chat, output, '', wm, m, (err) => {
        fs.unlinkSync(output);
        if (err) {
          m.reply('Terjadi kesalahan saat mengirim video. ' + err);
        }
      });
    })
    .on('error', (err) => {
      fs.unlinkSync(output);
      console.error(err);
      m.reply('Terjadi kesalahan saat menaikkan resolusi video. ' + err);
    })
    .run();
    } else if (command === "hdvid2") {
  if (!mime) throw `Video tidak ditemukan`
  let videoData = await conn.downloadAndSaveMediaMessage(q, 'video')
  let output = './tmp/video.mp4'
  ffmpeg(videoData)
    .format('mp4')
    .size('?x1080')
    .videoBitrate('2048k')
    .videoCodec('libx264')
    .fps(60)
    .audioBitrate('192k')
    .audioCodec('aac')
    .output(output)
    .on('end', () => {
      conn.sendFile(m.chat, output, '', wm, m, (err) => {
        fs.unlinkSync(output)
        if (err) m.reply('Terjadi kesalahan saat mengirim video. ' + err)
      })
    })
    .on('error', (err) => {
      fs.unlinkSync(output)
      console.error(err)
      m.reply('Terjadi kesalahan saat menaikkan resolusi video. ' + err)
    })
    .run()
    }
};

egvuaxrl.command = egvuaxrl.help = ["hdvid", "hdvid2"];
egvuaxrl.tags = ["tools"];
egvuaxrl.limit = true;

module.exports = egvuaxrl;