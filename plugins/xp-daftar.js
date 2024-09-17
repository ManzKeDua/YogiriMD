const canvafy = require("canvafy");
const fsPromises = require('fs').promises;
const crypto = require("crypto");
const fetch = require("node-fetch");

const Reg = /\|?(.*)([^\w\s])([0-9]*)$/i;

const handler = async (m, {
    conn, text, usedPrefix, command
}) => {
    conn.registrasi = conn.registrasi ? conn.registrasi : {};

    if (conn.registrasi[m.chat]?.[m.sender]) return m.reply('You are requesting verification!');
    let user = global.db.data.users[m.sender];
    let adit = await conn.getName(m.sender)
    if (user.registered === true) return conn.reply(m.chat, '```✅ Nomor Kamu Udah Terverifikasi```', m)
    const umurRandom = Math.floor(Math.random() * 100) + 1;
    const formatSalah = `• *Example :* ${usedPrefix + command} ${adit}.${umurRandom}`;
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key }})
    if (!Reg.test(text)) throw formatSalah;
    let [_, name, splitter, age] = text.match(Reg);
    if (!name) return conn.reply(m.chat, "🚩 Nama tidak boleh kosong (Alphanumeric)", m)
    if (!age) return conn.reply(m.chat, "🚩 Umur tidak boleh kosong (Angka)", m)
    age = parseInt(age);
    if (age > 50) return conn.reply(m.chat, "🚩 *Gak boleh!*,\nTua amat dah", m)
    if (age < 5) return conn.reply(m.chat, "🚩 *Gak boleh!*,\nBanyak pedo", m)

    let sn = crypto.createHash("md5").update(m.sender).digest("hex");
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.fromMe ? conn.user.jid : m.sender;
    let pp = await conn.profilePictureUrl(who, 'image').catch((_) => "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60");

    let cap = `
*Kamu terverifikasi*

• *Nama:* ${name}
• *Umur:* ${age} tahun
• *Serial Number (SN):* ${sn}

`;

    const json = await createOtpCanvas(pp);

    let confirm = "Otp Created!";
    let { key } = await conn.sendFile(m.chat, json.image, '', confirm, m);
    const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys") 
let msg = generateWAMessageFromContent(m.chat, {
  viewOnceMessage: {
    message: {
        "messageContextInfo": {
          "deviceListMetadata": {},
          "deviceListMetadataVersion": 2
        },
        interactiveMessage: proto.Message.InteractiveMessage.create({
          body: proto.Message.InteractiveMessage.Body.create({
            text: "Silahkan Copy Kode Kamu Dengan Mengklik Tombol Salin Di Bawah Ini Lalu Kirim Ke Dalam Chat Ini"
          }),
          footer: proto.Message.InteractiveMessage.Footer.create({
            text: 'DitzOfc'
          }),
          header: proto.Message.InteractiveMessage.Header.create({
            hasMediaAttachment: false
          }),
          nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
            buttons: [
              {
              "name": "cta_copy",
              "buttonParamsJson": `{"display_text":"Salin Kodemu","id":"123456789","copy_code":"${json.otp}"}`
              }
           ],
          })
        })
    }
  }
}, { quoted: m })

await conn.relayMessage(msg.key.remoteJid, msg.message, {
  messageId: msg.key.id
})
    conn.registrasi[m.chat] = {
        ...conn.registrasi[m.chat],
        [m.sender]: {
            message: m,
            sender: m.sender,
            otp: json.otp,
            verified: json.verified,
            caption: cap,
            pesan: conn,
            age,
            user,
            name,
            key,
            timeout: setTimeout(() => {
                conn.sendMessage(m.chat, { delete: key });
                delete conn.registrasi[m.chat][m.sender];
            }, 60 * 1000)
        }
    };
}

handler.before = async (m, { conn }) => {
    conn.registrasi = conn.registrasi ? conn.registrasi : {};
    if (m.isBaileys) return;
    if (!conn.registrasi[m.chat]?.[m.sender]) return;
    if (!m.text) return;
    let { timeout, otp, verified, message, sender, pesan, caption, user, name, age, key } = conn.registrasi[m.chat]?.[m.sender];
    if (m.id === message.id) return;
    if (m.id === key.id) return;
    if (m.text == otp) {
        user.name = name.trim();
        user.age = age;
        user.regTime = +new Date;
        user.registered = true;
        let capt = `乂  *R E G I S T E R  S U C C E S S*\n\n`
        capt += `┌  ◦ *Name* : ${name}\n`
        capt += `│  ◦ *Number* : ${m.sender.split("@")[0]}\n`
        capt += `│  ◦ *Age* : ${age}\n`
        capt += `└  ◦ *Serial Number* : .ceksn\n\n`
        capt += `> Powered By ManzKenz`
        pesan.sendFile(m.chat, verified, '', capt, m);
        clearTimeout(timeout);
        pesan.sendMessage(m.chat, { delete: key });
        delete conn.registrasi[m.chat]?.[m.sender];
    } else {
        conn.reply(m.chat, `✖️ OTP Salah!\n${m.sender.split('@')[0]} tidak di verifikasi!`, m)
        clearTimeout(timeout);
        pesan.sendMessage(m.chat, { delete: key });
        delete conn.registrasi[m.chat]?.[m.sender];
    }
}

handler.help = ["register","daftar"].map(v => v + " *<name>.<age>*");
handler.tags = ["xp"];
handler.command = /^(register|daftar)$/i;

module.exports = handler;

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function isNumber(x) {
    return !isNaN(x);
}

function generateRandomCharacter() {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return characters[Math.floor(Math.random() * characters.length)];
}

async function createOtpCanvas(avatar) {
    const codetext = Array.from({ length: 6 }, generateRandomCharacter).join('');
    const captchaBuffer = await new canvafy.Captcha()
        .setBackground("image", "https://telegra.ph/file/f1c908e8e76be968e42f3.jpg")
        .setCaptchaKey(codetext.toString())
        .setBorder("#f0f0f0")
        .setOverlayOpacity(0.7)
        .build();
    const securityBuffer = await new canvafy.Security()
        .setAvatar(avatar)
        .setBackground("image", "https://telegra.ph/file/f1c908e8e76be968e42f3.jpg")
        .setCreatedTimestamp(Date.now())
        .setSuspectTimestamp(1)
        .setBorder("#f0f0f0")
        .setLocale("id") // country short code - default "en"
        .setAvatarBorder("#f0f0f0")
        .setOverlayOpacity(0.9)
        .build();
    return {
        image: captchaBuffer,
        otp: codetext,
        verified: securityBuffer
    };
}