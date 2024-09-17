const { proto } = require("@whiskeysockets/baileys");
const chalk = require("chalk");
const fs = require("fs");
const Crypto = require("crypto");
const axios = require("axios");
const moment = require("moment-timezone");
const { sizeFormatter } = require("human-readable");
const util = require("util");
const jimp = require("jimp");

class Function {
   /* Size Limitation
    * @param {String} str
    * @param {Integer} max
    */
   sizeLimit = (str, max) => {
      let data
      if (str.match('G') || str.match('GB') || str.match('T') || str.match('TB')) return data = {
         oversize: true
      }
      if (str.match('M') || str.match('MB')) {
         let first = str.replace(/MB|M|G|T/g, '').trim()
         if (isNaN(first)) return data = {
            oversize: true
         }
         if (first > max) return data = {
            oversize: true
         }
         return data = {
            oversize: false
         }
      } else {
         return data = {
            oversize: false
         }
      }
   }
   
/**
 * Mengembalikan sebuah promise yang akan memberikan angka acak antara 0 dan (number - 1).
 * @param {number} number Angka maksimum (eksklusif) untuk angka acak.
 * @returns {Promise<number>} Sebuah promise yang akan memberikan angka acak.
 */
getRandom = (number) => {
    return Math.floor(Math.random() * number);
}
/**
 * Adds the specified amount to the user's property.
 *
 * @param {string} user - The user identifier.
 * @param {string} property - The property to be updated (e.g., 'exp', 'limit').
 * @param {number} amount - The amount to add to the property.
 * @returns {object} - The updated user object.
 */
addItem = (data, items) => {
  let users = global.db.data.users[data];

  for (let [property, amount] of Object.entries(items)) {
    if (users.hasOwnProperty(property)) {
      users[property] += amount;
    } else {
      console.error(`Property "${property}" does not exist on the user object.`);
    }
  }
}
 /**
 * Menghitung total dari seluruh data dalam objek stats.
 * @param {Object} db - Objek yang berisi data statistik.
 * @param {Object} plugins - Objek yang berisi plugins dengan properti help.
 * @returns {number} Total dari seluruh nilai total dalam objek stats.
 */
hitstat = () => {
  /**
   * Mendapatkan array stats dengan memetakan data dari db.data.stats ke dalam objek {name, ...val},
   * mengabaikan item dengan nama yang mengandung 'exec' dan menghilangkan item yang bernilai null.
   */
  let stats = Object.entries(db.data.stats).map(([key, val]) => {
    let name = Array.isArray(plugins[key]?.help) ? plugins[key]?.help?.join(' & ') : plugins[key]?.help || key
    if (/exec/.test(name)) return null; // Mengembalikan null untuk item yang tidak sesuai
    return { name, ...val };
  }).filter(item => item !== null); // Menghilangkan item yang bernilai null

  // Menggunakan reduce untuk menjumlahkan total dari semua objek dalam stats
  let totalSum = stats.reduce((acc, curr) => acc + curr.total, 0);

  // Mengembalikan totalSum
  return totalSum;
}
/* To Readable Size
* @param {Integer} size
*/
formatSize = (size) => {
      function round(value, precision) {
         var multiplier = Math.pow(10, precision || 0)
         return Math.round(value * multiplier) / multiplier
      }
      var megaByte = 1024 * 1024
      var gigaByte = 1024 * megaByte
      var teraByte = 1024 * gigaByte
      if (size < 1024) {
         return size + ' B'
      } else if (size < megaByte) {
         return round(size / 1024, 1) + ' KB'
      } else if (size < gigaByte) {
         return round(size / megaByte, 1) + ' MB'
      } else if (size < teraByte) {
         return round(size / gigaByte, 1) + ' GB'
      } else {
         return round(size / teraByte, 1) + ' TB'
      }
      return ''
   }
/**
 * Returns a greeting message based on the current time in Makassar timezone.
 *
 * @returns {string} ucapanWaktu - The greeting message.
 */
ucapan = () => {
  const hour_now = moment.tz('Asia/Makassar').format('HH');
  let ucapanWaktu = 'Good Morning 🌄';
  if (hour_now >= '03' && hour_now <= '10') {
    ucapanWaktu = 'Good Afternoon 🌅';
  } else if (hour_now >= '10' && hour_now <= '15') {
    ucapanWaktu = 'Good Afternoon 🌅';
  } else if (hour_now >= '15' && hour_now <= '17') {
    ucapanWaktu = 'Good Afternoon 🌅';
  } else if (hour_now >= '17' && hour_now <= '18') {
    ucapanWaktu = 'Good Night 🌌';
  } else if (hour_now >= '18' && hour_now <= '23') {
    ucapanWaktu = 'Good Night 🌌';
  } else {
    ucapanWaktu = 'Good Night 🌌';
  }
  return ucapanWaktu;
}
/**
 * Mengembalikan representasi string dari bilah kesehatan berdasarkan nilai kesehatan.
 * 
 * @param {number} jumlah - Nilai kesehatan antara 0 dan 100.
 * @returns {string} Representasi string dari bilah kesehatan.
 */
formatBar = (jumlah) => {
    // Hitung jumlah bilah yang terisi dan yang kosong
    const filledBars = Math.floor(jumlah / 10); // Setiap 10% mengisi satu bilah
    const emptyBars = 10 - filledBars;

    // Buat string bar
    const bar = '[' + '█'.repeat(filledBars) + '▒'.repeat(emptyBars) + ']';

    return bar;
}
/* Delay
* @param {Integer} time
*/
delay = time => new Promise(res => setTimeout(res, time))
   
/**
 * Format a number as English Currency 
 * @param {number|string} amount
 * @returns {string}
 */

formatIDR = (amount) => {
    if (typeof amount !== 'number') {
        amount = parseFloat(amount);
        if (isNaN(amount)) {
            throw new Error("Input must be a number or a string that can be converted to a number");
        }
    }
return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
}).format(amount);
}
/* formatNumber
* @param {Integer} integer
*/
formatNumber = (integer) => {
    let numb = parseInt(integer)
    return new Intl.NumberFormat('en-US', {
      notation: 'compact'
  }).format(numb)
}
/* Time Format Day
* @param {Integer} ms
*/
toDay = (ms) => {
let temp = ms
let days = Math.floor(ms / (24*60*60*1000));
let daysms = ms % (24*60*60*1000);
let hours = Math.floor((daysms)/(60*60*1000));
let hoursms = ms % (60*60*1000);
let minutes = Math.floor((hoursms)/(60*1000));
let minutesms = ms % (60*1000);
let sec = Math.floor((minutesms)/(1000));
 return days+" Hari "+hours+" Jam "+ minutes + " Menit";
  }
/* Time Format
* @param {Integer} ms
*/
toTime = (ms) => {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map((v) => v.toString().padStart(2, 0)).join(":");
}
/* Print JSON
* @param {Object} obj
*/
jsonFormat = (obj) => {
    try {
       let print = (obj && (obj.constructor.name == 'Object' || obj.constructor.name == 'Array')) ? require('util').format(JSON.stringify(obj, null, 2)) : require('util').format(obj)
       return print
    } catch {
       return require('util').format(obj)
    }
}
/**
 * Pick a random item from a list
 * @param {Array} list
 * @returns {*}
 */
pickRandom = (list) => {
    return list[Math.floor(Math.random() * list.length)]
}
   /* Text Style
    * @param {String} type
    * @param {String} text
    */
texted = (type, text) => {
    switch (type) {
       case 'bold':
          return '*' + text + '*'
          break
       case 'italic':
          return '_' + text + '_'
          break
       case 'monospace':
          return '```' + text + '```'
    }
 }
done = (old) => {
    const currentTime = new Date();
    const differenceInMillis = currentTime.getTime() - old.getTime() + 1;
    return `${'📡 Fetching'} ${differenceInMillis} ms`;
}
/* Example Format
* @param {String} isPrefix
* @param {String} command
* @param {String} args
*/
example = (usedPrefix, command, args) => {
    return `• ${this.texted('bold', 'Example:')} ${usedPrefix + command} ${args}`
}
/** Extract first link starting with https://
 * @param {String} text
 * @returns {String|null}
 */
getLink = (text) => {
    const linkPattern = /https?:\/\/[^\s'"]+/g; // Menambahkan karakter ' dan " di dalam negasi untuk menghindari akhiran dengan tanda '
    const match = text.match(linkPattern);
    return match ? match[0] : null;
}
  
/**
 * Generate a random ID of a given length
 * @param {number} length
 * @returns {string}
 */
makeId = (length) => {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

/**
 * Get a buffer from a URL
 * @param {string} url
 * @param {object} [options]
 * @returns {Promise<Buffer>}
 */
getBuffer = async (url, options) => {
    try {
        options ? options : {};
        const res = await axios({
            method: "get",
            url,
            headers: {
                DNT: 1,
                "Upgrade-Insecure-Request": 1,
            },
            ...options,
            responseType: "arraybuffer",
        });
        return res.data;
    } catch (e) {
        return e;
    }
};

/**
 * Fetch JSON data from a URL
 * @param {string} url
 * @param {object} [options]
 * @returns {Promise<object>}
 */
fetchJson = async (url, options) => {
    try {
        options ? options : {};
        const res = await axios({
            method: "GET",
            url: url,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36",
            },
            ...options,
        });
        return res.data;
    } catch (err) {
        return err;
    }
};

/**
 * Fetch a buffer from a URL
 * @param {string} url
 * @param {object} [options]
 * @returns {Promise<Buffer>}
 */
fetchBuffer = async (url, options) => {
    try {
        options ? options : {}
        const res = await axios({
            method: "GET",
            url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36",
                'DNT': 1,
                'Upgrade-Insecure-Request': 1
            },
            ...options,
            responseType: 'arraybuffer'
        })
        return res.data
    } catch (err) {
        return err
    }
}

/**
 * Convert seconds to a human-readable runtime string
 * @param {number} seconds
 * @returns {string}
 */
runtime = function (seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return dDisplay + hDisplay + mDisplay + sDisplay;
};


/* URL Validator
* @param {String} url
*/
isUrl = (url) => {
   return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
}

/**
 * Format a date as an Indonesian date string
 * @param {number|string|Date} numer
 * @returns {string}
 */
tanggal = (numer) => {
  let myMonths = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
  myDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum’at", "Sabtu"]
  var tgl = new Date(numer);
  var day = tgl.getDate();
  var bulan = tgl.getMonth();
  var thisDay = tgl.getDay(),
    thisDay = myDays[thisDay];
  var yy = tgl.getYear();
  var year = yy < 1000 ? yy + 1900 : yy;
  const time = moment.tz("Asia/Makassar").format("DD/MM HH:mm:ss");
  let d = new Date();
  let locale = "id";
  let gmt = new Date(0).getTime() - new Date("1 January 1970").getTime();
  let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
    Math.floor((d * 1 + gmt) / 84600000) % 5
  ];
  return `${thisDay}, ${day} - ${myMonths[bulan]} - ${year}`;
};

/* Text Style
* @param {String} text
* @param {Integer} style
*/
style = (text, style = 1) => {
      var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('')
      var yStr = Object.freeze({
         1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
      })
      var replacer = []
      xStr.map((v, i) => replacer.push({
         original: v,
         convert: yStr[style].split('')[i]
      }))
      var str = text.toLowerCase().split('')
      var output = []
      str.map(v => {
         const find = replacer.find(x => x.original == v)
         find ? output.push(find.convert) : output.push(v)
      })
      return output.join('')
   }
/** Generate UUID v4
 * @returns {Promise<String>}
 */
generateUUIDv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ Crypto.randomBytes(1)[0] & 15 >> c / 4).toString(16)
  );
}
}

module.exports = new Function();
 
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(`Update ${__filename}`);
  delete require.cache[file];
  require(file);
});
