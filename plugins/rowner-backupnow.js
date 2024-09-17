/*
*[FITUR AUTOBACKUP SC BOT]*
* By VynzzDev
* https://whatsapp.com/channel/0029VaEGq6MDeON8TGlwWN1Y
*/

const fs = require('fs');
const archiver = require('archiver');
const path = require('path');
const cron = require('node-cron');
const moment = require('moment-timezone');
const os = require('os');

// Nomor pemilik (owner)
const ownerNumber = '6288989721627@s.whatsapp.net'; // Ganti dengan nomor pemilik yang benar

// Fungsi untuk menghapus file backup lama
const deleteOldBackups = () => {
  const files = fs.readdirSync(path.resolve(__dirname, '../'));
  const backupFiles = files.filter(file => file.startsWith('backup_') && file.endsWith('.zip'));
  
  backupFiles.forEach(file => {
    fs.unlinkSync(path.resolve(__dirname, '../', file));
  });
};

// Fungsi untuk mendapatkan ping
const getPing = async () => {
  const start = Date.now();
  await new Promise(resolve => setTimeout(resolve, 100));
  const end = Date.now();
  return end - start;
};

// Fungsi untuk melakukan backup
const performBackup = async (conn, chat) => {
  const ping = await getPing();

  // Hapus file backup lama
  deleteOldBackups();

  // Buat file backup baru dengan nama yang lebih singkat
  let backupName = `backup_${moment().tz('Asia/Jakarta').format('YYYYMMDD')}.zip`;
  let output = fs.createWriteStream(backupName);
  let archive = archiver('zip', { zlib: { level: 9 } });

  const currentTime = moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');

  output.on('close', function () {
    let caption = `╭┈❲ A U T O B A C K U P\n│⏰ ${currentTime}\n╞❴ INFORMATION ❵\n╞❴ Status ❵ Berhasil\n╞❴ Name ❵ ${backupName}\n╞❴ Size ❵ ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB\n╞❴ Ping ❵ ${ping} ms\n╰╼┈⟐ ❰ Powered by : VynzzDev ❱`;
    let targetChat = chat || ownerNumber; // Jika chat tidak diberikan, gunakan nomor pemilik
    conn.sendFile(targetChat, backupName, backupName, caption);
  });

  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      console.warn(err);
    } else {
      let caption = `╭┈❲ A U T O B A C K U P\n│⏰ ${currentTime}\n╞❴ INFORMATION ❵\n╞❴ Status ❵ Gagal\n╞❴ Name ❵ ${backupName}\n╞❴ Size ❵ 0 MB\n╞❴ Ping ❵ ${ping} ms\n╰╼┈⟐ ❰ Powered by : VynzzDev ❱`;
      conn.sendMessage(ownerNumber, { text: caption });
      throw err;
    }
  });

  archive.on('error', function (err) {
    let caption = `╭┈❲ A U T O B A C K U P\n│⏰ ${currentTime}\n╞❴ INFORMATION ❵\n╞❴ Status ❵ Gagal\n╞❴ Name ❵ ${backupName}\n╞❴ Size ❵ 0 MB\n╞❴ Ping ❵ ${ping} ms\n╰╼┈⟐ ❰ Powered by : VynzzDev ❱`;
    conn.sendMessage(ownerNumber, { text: caption });
    throw err;
  });

  archive.pipe(output);

  archive.glob('**/*', {
    cwd: path.resolve(__dirname, '../'),
    ignore: [
      'node_modules/**', 
      'kemii.data.json/', 
      'tmp/**', 
      '.npm/**', 
      'backup_*.zip',  // Mengabaikan semua file backup yang lama
      backupName       // Mengabaikan nama file backup yang baru dibuat
    ]
  });

  archive.finalize();
}

let handler = async (m, { conn }) => {
  if (conn.user.jid !== global.conn.user.jid) return;

  // Periksa jika chat bukan private chat
  if (m.key.remoteJid && m.key.remoteJid.endsWith('@g.us')) {
    conn.sendMessage(m.chat, { text: 'ꜱᴏʀʀʏ, ᴛʜɪꜱ ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜꜱᴇᴅ ɪɴ ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ.' });
    return;
  }

  conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key }});
  performBackup(conn, m.chat);
}

handler.help = ['backupnow'];
handler.tags = ['owner'];
handler.command = /^backupnow$/i;

handler.owner = true;

module.exports = handler;

// Jadwal otomatis untuk melakukan backup setiap 1 jam 10 menit
cron.schedule('0 */1 * * *', () => {
  performBackup(global.conn);
});

/*
Script ini berfungsi untuk melakukan backup seluruh sc bot secara otomatis
Fitur utama:
1. Melakukan backup otomatis setiap 1 jam.
2. Memungkinkan backup manual dengan perintah "backupnow".
3. Menghapus file backup lama setelah berhasil membuat file backup baru.

Dependensi yang diperlukan:
- fs (File System, modul bawaan Node.js)
- archiver (untuk membuat file zip)
- path (modul bawaan Node.js untuk menangani dan mengubah jalur file)
- node-cron (untuk penjadwalan tugas cron)
- moment-timezone (untuk menangani zona waktu)
- os (untuk mendapatkan informasi penyimpanan)

Cara menginstal dependensi:
1. Pastikan Node.js dan npm sudah terinstal di sistem Anda.
2. Jalankan perintah berikut untuk menginstal dependensi yang diperlukan:
   npm install archiver node-cron moment-timezone

Creator: Vynzz
*/