const { exec } = require('child_process');

module.exports = {
  modul: {
    chalk: require("chalk"),
    fs: require("fs"),
    ytdl: require("ytdl-core"),
    axios: require("axios"),
    moment: require("moment-timezone"),
    speed: require("performance-now"),
    fetch: require('node-fetch'),
    exec,
    canvacord: require("canvacord"),
    BodyForm: require('form-data'),
    util: require("util"),
    ffmpeg: require("ffmpeg"),
    Jimp: require("jimp"),
    cheerio: require('cheerio'),
    yts: require("yt-search"),
    similarity: require('similarity'),
    cron: require('node-cron'),
    Crypto: require("crypto"),
    ff: require('fluent-ffmpeg'),
    webp: require("node-webpmux"),
    path: require("path")
  }
};
