/**
[ DONT DELETE MY CREDIT ]
- Creator : Kii4Dev
- Support : Chatgpt [ Support System ]
*/  
const simple = require('./lib/simple')
const util = require('util')
const cron = require('node-cron')
const Func = require("./lib/myfunc");
const fs = require("fs")
const isNumber = x => typeof x === 'number' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(resolve, ms))

module.exports = {
    async handler(chatUpdate) {
    const appenTextMessage = async (text, chatUpdate) => {
      let messages = await generateWAMessage(
        m.chat,
        { text: text, mentions: m.mentionedJid },
        {
          userJid: this.user.id,
          quoted: m.quoted && m.quoted.fakeObj,
        },
      );
      messages.key.fromMe = areJidsSameUser(m.sender, this.user.id);
      messages.key.id = m.key.id;
      messages.pushName = m.pushName;
      if (m.isGroup) messages.participant = m.sender;
      let msg = {
        ...chatUpdate,
        messages: [proto.WebMessageInfo.fromObject(messages)],
        type: "append",
      };
      this.ev.emit("messages.upsert", msg);
    };
    if (global.db.data == null) await loadDatabase();
    this.msgqueque = this.msgqueque || [];
    if (!chatUpdate) return;
    this.pushMessage(chatUpdate.messages).catch(console.error);
    let m = chatUpdate.messages[chatUpdate.messages.length - 1];
    if (!m) return;
    if (m.message?.viewOnceMessageV2)
      m.message = m.message.viewOnceMessageV2.message;
    if (m.message?.documentWithCaptionMessage)
      m.message = m.message.documentWithCaptionMessage.message;
    if (m.message?.viewOnceMessageV2Extension)
      m.message = m.message.viewOnceMessageV2Extension.message;

    if (!m) return;
      try {
        m = simple.smsg(this, m) || m
        if (!m) return
        // console.log(m)
        m.exp = 0
        m.limit = false
        m.glimit = false
        try {
          let user = global.db.data.users[m.sender];
          if (typeof user !== "object") global.db.data.users[m.sender] = {};
          if (user) {
            if (!("registered" in user)) user.registered = false;
            if (!user.registered) {
              if (!("name" in user)) user.name = m.name;
              if (!isNumber(user.age)) user.age = -1;
              if (!isNumber(user.regTime)) user.regTime = -1;
            } 
            if (!isNumber(user.afk)) user.afk = -1;
            if (!("afkReason" in user)) user.afkReason = "";
            if (!("pasangan" in user)) user.pasangan = "";
            if (!('role' in user)) user.role = 'Beginner'
            if (!("owner" in user)) user.owner = false
            if (!("registered" in user)) user.registered = false
            if (!("role" in user)) user.role = "Beginner"
            if (!("sewa" in user)) user.sewa = false
            if (!("skill" in user)) user.skill = ""
            if (!("title" in user)) user.title = ""
            if (!('autolevelup' in user)) user.autolevelup = true
            if (!("banned" in user)) user.banned = false;
            if (!("premium" in user)) user.premium = false;
            if (!isNumber(user.health)) user.health = 100;
            if (!isNumber(user.kesehatan)) user.kesehatan = 100;
            if (!isNumber(user.limit)) user.limit = 30;
            if (!isNumber(user.polisi)) user.polisi = 0;
            if (!isNumber(user.glimit)) user.glimit = 30;
            if (!isNumber(user.balance)) user.balance = 0;
            if (!isNumber(user.eris)) user.eris = 0;
            if (!isNumber(user.bank)) user.bank = 0;
            if (!isNumber(user.money)) user.money = 0;
            if (!isNumber(user.exp)) user.exp = 0;
            if (!isNumber(user.level)) user.level = 0;
            /*[ DATABASE TIME ]*/
            if (!isNumber(user.premiumDate)) user.premiumDate = 0;
            if (!isNumber(user.daily)) user.daily = 0;
            if (!isNumber(user.merampok)) user.merampok = 0;
            if (!isNumber(user.maling)) user.maling = 0;
            if (!isNumber(user.berkebun)) user.berkebun = 0;
            if (!isNumber(user.gojek)) user.gojek = 0;
            if (!isNumber(user.berdagang)) user.berdagang = 0;
            if (!isNumber(user.adventure)) user.adventure = 0;
            if (!isNumber(user.mancing)) user.mancing = 0;
            if (!isNumber(user.hunting)) user.hunting = 0;
            if (!isNumber(user.nebang)) user.nebang = 0;
            if (!isNumber(user.nambang)) user.nambang = 0;
            if (!isNumber(user.bansos)) user.bansos = 0;
          } else {
            global.db.data.users[m.sender] = {
              autolevelup: true,
              banned: false,
              premium: false,
              registered: false,
              adventure: 0,
              afk: -1,
              afkReason: "",
              age: -1,
              balance: 0,
              berkebun: 0,
              bansos: 0,
              daily: 0,
              exp: 0,
              glimit: 30,
              gojek: 0,
              health: 100,
              hunting: 0,
              kesehatan: 100,
              level: 0,
              limit: 30,
              name: m.name,
              nambang: 0,
              nebang: 0,
              maling: 0,
              mancing: 0,
              merampok: 0,
              money: 0,
              pasangan: "",
              polisi: 0,
              regTime: -1,
              role: 'beginner'
            };
          }
          let chat = global.db.data.chats[m.chat];
          if (typeof chat !== "object") global.db.data.chats[m.chat] = {};
          if (chat) {
            if (!("nsfw" in chat)) chat.nsfw = false;
            if (!("antilink" in chat)) chat.antilink = true;
            if (!("welcome" in chat)) chat.welcome = true;
            if (!('autoread' in chat)) chat.autoread = true;
            if (!('desc' in chat)) chat.desc = true;
            if (!('isbanned' in chat)) chat.desc = false;
            if (!('antiFoto' in chat)) chat.antiFoto = false;
          } else {
            global.db.data.chats[m.chat] = {
              nsfw: false,
              welcome: true,
              antilink: true,
              autoread: true,
              desc: true,
              antiFoto: false,
              isbanned: false,
            };
          }
            let settings = global.db.data.settings[this.user.jid]
            if (typeof settings !== 'object') global.db.data.settings[this.user.jid] = {}
            if (settings) {
            if (!('autoread' in settings)) settings.autoread = true;
            if (!'backup' in settings) settings.backup = true
            if (!'clear' in settings) settings.clear = true
            if (!isNumber(settings.clearsessi)) settings.clearsessi = 0
            if (!isNumber(settings.backupTime)) settings.backupTime = 0
          } else global.db.data.settings[this.user.jid] = {
              autoread: true,
              backup: true,
              clear: true,
              cearsessi: 0,
              backupTime: 0,
          };
        } catch (e) {
          console.error(e);
        }
      if (opts['autoread']) await this.readMessages([m.key])
      if (opts['nyimak']) return
      if (!m.fromMe && opts['self']) return
      if (opts['pconly'] && m.chat.endsWith('g.us')) return
      if (opts['gconly'] && !m.chat.endsWith('g.us')) return
      if (opts['swonly'] && m.chat !== 'status@broadcast') return
      if (typeof m.text !== 'string') m.text = ''

      const isROwner = [...global.owner.map(([number, isCreator, isDeveloper]) => number)].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
      const isOwner = isROwner ? true : false
      const isPrems = global.db.data.users[m.sender].premium
      const isBans = global.db.data.users[m.sender].banned;
     
      if (isROwner) {
        db.data.users[m.sender].premium = true;
        db.data.users[m.sender].premiumDate = "PERMANENT";
        db.data.users[m.sender].limit = "UNLIMITED";
        db.data.users[m.sender].glimit = "UNLIMITED";
      } else if (isPrems) {
        db.data.users[m.sender].premiumDate -= 1000;
        db.data.users[m.sender].limit = "UNLIMITED";
        db.data.users[m.sender].glimit = "UNLIMITED";
      } else if (!isROwner && isBans) return;


      if (m.isBaileys) return
      m.exp += Math.ceil(Math.random() * 10)

      let usedPrefix
      let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

      const groupMetadata = (m.isGroup ? (conn.chats[m.chat] || {}).metadata : {}) || {}
      //    const groupMetadata = (m.isGroup ? (conn.chats[m.chat].metadata || await conn.groupMetadata(m.chat)): {}) || {}
      const participants = (m.isGroup ? groupMetadata.participants : []) || []
      const user = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // User Data
      const bot = (m.isGroup ? participants.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
      const isRAdmin = user && user.admin == 'superadmin' || false
      const isAdmin = isRAdmin || user && user.admin == 'admin' || false // Is User Admin?
      const isBotAdmin = bot && bot.admin || false // Are you Admin?
      for (let name in global.plugins) {
        let plugin = global.plugins[name]
        if (!plugin) continue
        if (plugin.disabled) continue
        if (typeof plugin.all === "function") {
          try {
            await plugin.all.call(this, m, chatUpdate);
          } catch (e) {
            // if (typeof e === 'string') continue
            console.error(e);
          }
        }
        const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
        let _prefix = plugin.customPrefix
          ? plugin.customPrefix
          : conn.prefix
            ? conn.prefix
            : global.prefix;
        let match = (
          _prefix instanceof RegExp // RegExp Mode?
            ? [[_prefix.exec(m.text), _prefix]]
            : Array.isArray(_prefix) // Array?
              ? _prefix.map((p) => {
                  let re =
                    p instanceof RegExp // RegExp in Array?
                      ? p
                      : new RegExp(str2Regex(p));
                  return [re.exec(m.text), re];
                })
              : typeof _prefix === "string" // String?
                ? [
                    [
                      new RegExp(str2Regex(_prefix)).exec(m.text),
                      new RegExp(str2Regex(_prefix)),
                    ],
                  ]
                : [[[], new RegExp()]]
        ).find((p) => p[1]);
        if (typeof plugin.before === "function")
          if (
            await plugin.before.call(this, m, {
              match,
              conn: this,
              participants,
              groupMetadata,
              user,
              bot,
              Func,
              isROwner,
              isOwner,
              isRAdmin,
              isAdmin,
              isBotAdmin,
              isPrems,
              isBans,
              chatUpdate,
            })
          )
            continue;
        if (typeof plugin !== "function") continue;
        if (opts && match && m) {
          let result =
            ((opts?.["multiprefix"] ?? true) && (match[0] || "")[0]) ||
            (opts?.["noprefix"] ?? false ? null : (match[0] || "")[0]);
          usedPrefix = result;
          let noPrefix 
          if (isOwner) {
            noPrefix = !result ? m.text : m.text.replace(result, "");
          } else {
            noPrefix = !result ? '' : m.text.replace(result, "").trim();
          }
          let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
          args = args || [];
          let _args = noPrefix.trim().split` `.slice(1);
          let text = _args.join` `;
          command = (command || "").toLowerCase();
          let fail = plugin.fail || global.dfail;

          const prefixCommand = !result
            ? plugin.customPrefix || plugin.command
            : plugin.command;
          let isAccept =
            (prefixCommand instanceof RegExp && prefixCommand.test(command)) ||
            (Array.isArray(prefixCommand) &&
              prefixCommand.some((cmd) =>
                cmd instanceof RegExp ? cmd.test(command) : cmd === command,
              )) ||
            (typeof prefixCommand === "string" && prefixCommand === command);
          m.prefix = !!result;
          usedPrefix = !result ? "" : result;
          if (!isAccept) continue;
          m.plugin = name;
        if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
          let chat = global.db.data.chats[m.chat];
          let user = global.db.data.users[m.sender];
          if (name != "Rowner-unbanchat.js" &&
            name != "Rowner-exec.js" &&
            name != "Rowner-exec2.js" &&
            chat?.isBanned && !isROwner && !isPrems)
            return; // Except this
          if (name != "Group-mute.js" && chat?.isBanned && !isAdmin && !m.isGroup)
            return; // Except this
            
          if (name != "Rowner-unbanuser.js" && user?.banned)
            return;
         }
          if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Creator
            fail('owner', m, this)
            continue
          }
          if (plugin.rowner && !isROwner) { // Real Owner
            fail('rowner', m, this)
            continue
          }
          if (plugin.owner && !isOwner) { // Number Owner
            fail('owner', m, this)
            continue
          }
          if (plugin.premium && !isPrems) { // Premium
            fail('premium', m, this)
            continue
          }
          if (plugin.banned && !isBans) { // Banned
            fail('banned', m, this)
            continue
          }
          if (plugin.group && !m.isGroup) { // Group Only
            fail('group', m, this)
            continue
          } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
            fail('botAdmin', m, this)
            continue
          } else if (plugin.admin && !isAdmin) { // User Admin
            fail('admin', m, this)
            continue
          }
          if (plugin.private && m.isGroup) { // Private Chat Only
            fail('private', m, this)
            continue
          }
          if (plugin.register == true && _user.registered == false) { // Butuh daftar?
            fail('unreg', m, this)
            continue
          }
          m.isCommand = true
          let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
          if (xp > 9999999999999999999999) m.reply('Ngecit -_-') // Hehehe
          else m.exp += xp
          if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
            m.reply(`*[ INFO ]*\n_Limit Harian Kamu Telah Abis_`)
            continue // Limit Harian habis
          }
           if (!isPrems && plugin.glimit && global.db.data.users[m.sender].glimit < plugin.glimit * 1) {
            m.reply(`*[ INFO ]*\n_Limit Game Kamu Telah Abis_`)
            continue // Limit Game habis
          }
          if (plugin.level > _user.level) {
            this.reply(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, m)
            continue // If the level has not been reached
          }
     cron.schedule("00 00 * * *", async () => {
      try {
        const users = Object.values(global.db.data.users);
        let limitResetCount = 0;
        users.forEach((user) => {
          if (
            (typeof user.limit !== "undefined" && user.limit < 30) ||
            (typeof user.glimit !== "undefined" && user.glimit < 30)
          ) {
            user.limit = 30;
            user.glimit = 30;
            limitResetCount++;
          }
        });

        if (limitResetCount > 0) {
          console.log(
            `[ Server Notice ] ${limitResetCount} users' limits have been reset.`
          );
          await this.sendMessage(rowner, {
            text: Func.style("*[ Server Notice ]* Limit Dan Glimit Berhasil Di Reset")
          });
        }
      } catch (e) {
        console.error(e);
      }
    }, { scheduled: true, timezone: "Asia/Makassar" });
          let extra = {
            match,
            usedPrefix,
            noPrefix,
            _args,
            args,
            command,
            text,
            Func,
            conn: this,
            participants,
            groupMetadata,
            user,
            bot,
            isROwner,
            isOwner,
            isRAdmin,
            isAdmin,
            isBotAdmin,
            isPrems,
            isBans,
            chatUpdate,
          }
          try {
            await plugin.call(this, m, extra)
             if (!isPrems) m.limit = m.limit || plugin.limit || false;
             if (!isPrems) m.glimit = m.glimit || plugin.glimit || false;
             } catch (e) {
            // Error occured
            m.error = e
            console.log(e)
            if (e) {
              let text = util.format(e)
              for (let key of Object.values(global.APIKeys))
                text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
              if (e.name)
                for (let [jid] of global.owner.filter(([number, isCreator, isDeveloper]) => isDeveloper && number)) {
                  let data = (await conn.onWhatsApp(jid))[0] || {}
                  if (data.exists) m.reply(`*Plugin:* ${m.plugin}\n*Sender:* ${m.sender}\n*Chat:* ${m.chat}\n*Command:* ${usedPrefix}${command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``.trim(), data.jid)
                }
              m.reply(text)
            }
          } finally {
            // m.reply(util.format(_user))
            if (typeof plugin.after === 'function') {
              try {
                await plugin.after.call(this, m, extra)
              } catch (e) {
                console.error(e)
              }
            }
          }
          break
        }
      }
    } catch (e) {
      console.error(e)
    } finally {
      if (opts["queque"] && m.text) {
        const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id);
        if (quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1);
      }
      //conn.sendPresenceUpdate('composing', m.chat)
      //console.log(global.db.data.users[m.sender])
      let user, stats = global.db.data.stats
      if (m) {
        if (m.sender && (user = global.db.data.users[m.sender])) {
          user.exp += m.exp;
          user.limit -= m.limit * 1;
          user.glimit -= m.glimit * 1;
        }
        let stat;
        if (m.plugin) {
          let now = +new Date();
          if (m.plugin in stats) {
            stat = stats[m.plugin];
            if (!isNumber(stat.total)) stat.total = 1;
            if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1;
            if (!isNumber(stat.last)) stat.last = now;
            if (!isNumber(stat.lastSuccess))
              stat.lastSuccess = m.error != null ? 0 : now;
          } else
            stat = stats[m.plugin] = {
              total: 1,
              success: m.error != null ? 0 : 1,
              last: now,
              lastSuccess: m.error != null ? 0 : now,
            };
          stat.total += 1;
          stat.last = now;
          if (m.error == null) {
            stat.success += 1;
            stat.lastSuccess = now;
          }
        }
      }
      try {
        require('./lib/print')(m, this)
      } catch (e) {
        console.log(m, m.quoted, e)
      }
     await this.readMessages([m.key])
   }
  },
  async participantsUpdate({ id, participants, action }) {
    if (opts["self"]) return;

    if (global.isInit) return;
    let chat = global.db.data.chats[id] || {};
    let text = "";
    switch (action) {
      case "add":
      case "remove":
        if (chat.welcome) {
          let groupMetadata =
            (await this.groupMetadata(id)) || (conn.chats[id] || {}).metadata;
          for (let user of participants) {
            let pp = "https://i.ibb.co/sQTkHLD/ppkosong.png";
            pp: pp;
            try {
              pp = await this.profilePictureUrl(user, "image");
            } catch (e) {
            } finally {
              text = (action === "add" ? (chat.sWelcome || this.welcome || conn.welcome || "Welcome, @user!").replace("@subject", await this.getName(id)).replace("@desc", groupMetadata.desc ? String.fromCharCode(8206).repeat(4001) + groupMetadata.desc : "", ) : chat.sBye || this.bye || conn.bye || "Bye, @user!").replace("@user", "@" + user.split("@")[0]);
              let wel = pp;
              let lea = pp;
              this.sendMessage(id, {
                 text: text,
                  contextInfo: {
                    mentionedJid: [user],
                    externalAdReply: {
                      title: action === "add" ? "W E L C O M E  U S E R" : "G O O D B Y E  U S E R",
                      body: "",
                      thumbnailUrl: pp,
                      sourceUrl: link,
                      mediaType: 1,
                      renderLargerThumbnail: true,
                    },
                  },
                },
                { quoted: null },
              );
            }
          }
        }
        break;
      case "promote":
        text = chat.sPromote || this.spromote || conn.spromote || "@user ```Promoted```";
      case "demote":
        if (!text)
          text = chat.sDemote || this.sdemote || conn.sdemote || "@user ```Demoted```";
          text = text.replace("@user", "@" + participants[0].split("@")[0]);
        if (chat.welcome)
        this.sendMessage(id, {text: text,
          contextInfo: { mentionedJid: conn.parseMention(text)}}, { quoted: null },
        );
      break;
    }
  },
}
global.dfail = (type, m, conn) => {
let userTag = `@${m.sender.split("@")[0]}`
  let msg = {
    rowner: `*[ OWNER ]*\nHalo ${userTag} Fitur Ini Khusus Untuk Owner`,
    owner: `*[ OWNER ]*\nHalo ${userTag} Fitur Ini Khusus Untuk Owner`,
    banned: `*[ BANNED ]*\nHalo ${userTag} Fitur Ini Hanya Untuk User Yang Terbanned`,
    group: `*[ GROUPS ]*\nHalo ${userTag} Fitur Ini Dapat Di Akses Di Dalam Group Chat`,
    private: `*[ PRIVATE ]*\nHalo ${userTag} Fitur Ini Dapat Di Akses Di Private Message`,
    admin: `*[ ADMIN ]*\nHalo ${userTag} Fitur ini Di khususkan Untuk Admin Group`,
    botAdmin: `*[ BOT ADMIN ]*\nHalo ${userTag} Fitur Ini Berjalan Ketika Bot Di Jadikan Admin Groups`,
    restrict: `*[ DISABLED ]*\nHalo ${userTag} Fitur Ini Untuk Sementara Di Nonaktifkan`,
    premium: `*[ PREMIUM ]*\nHalo ${userTag} Kamu Tidak Terdaftar Sebagai Data Premium (Gratisan) Silahkan Jika Ingin Upgrade Premium Dengan Cara [ .buyrem *Day* ]`,
    unreg: `*[ NOT REGISTERED ]*\nHalo ${userTag} Kamu Belum Terdaftar Di Database Kanna-Multidevice, Sebelum Mengakses Seluruh Fitur Bot Ini Silahkan Daftar Terlebih Dahulu Dengan Beberapa Cara Berikut Ini\n\n*[ OPTIONS ]*\n1. Daftar [ NAMA UMUR ]\n2. Daftar2 [ OTOMATIS ]\n\nHow To Use\n1. Daftar MansTwelve 20\nPenjelasan: Wajib Menggunakan Spasi (Nama Umur) Dan Akan Di Butuhkan Verifikasi\n\n2. Daftar2\nPenjelasan: ini Merupakan Daftar Dengan Cara Tersimpel Dan Tidak Perlu Verifikasi`,
  } [type]
  if (msg) return m.reply(msg)
}

let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    delete require.cache[file]
    if (global.reloadHandler) console.log(global.reloadHandler())
})