// Add method all to the lib object
async function all(m) {
  // Globally required modules
  global.fs = require("fs"); // File system module
  global.axios = require("axios"); // HTTP client module
  global.fetch = require("node-fetch"); // Fetch API module
  global.ffmpeg = require("fluent-ffmpeg"); // FFmpeg wrapper module
  global.cheerio = require("cheerio") // Cheerio Require Module
  
  // Custom global variables and functions
  global.backsound = "./Library/Backsound"; // Backsound directory
  global.Func = require("../lib/myfunc"); // Custom functions module
  global.Gets = require("../lib/func"); // Custom functions module
  global.uploadImage = require(".././lib/Upload/uploadImage"); // Custom image uploader module
  global.uploadFile = require(".././lib/Upload/uploadFile"); // Custom file uploader module
  
  // Array of images
  global.thumbnail = Func.pickRandom([
    "https://telegra.ph/file/5753b06a866bed1ec3e28.jpg",
    "https://telegra.ph/file/58d352edf2b14c491f3cf.jpg",
    "https://telegra.ph/file/e5778bbd6a60cc811b194.jpg"
  ]);

  global.icon = Func.pickRandom([
    "https://telegra.ph/file/5753b06a866bed1ec3e28.jpg",
    "https://telegra.ph/file/e5778bbd6a60cc811b194.jpg",
    "https://telegra.ph/file/58d352edf2b14c491f3cf.jpg"
  ]);

  // Fake contact message structure
  global.fkontak = {
    key: {
      remoteJid: "0@s.whatsapp.net", // Remote JID
      participant: "0@s.whatsapp.net", // Participant JID
      id: "" // Message ID
    },
    message: {
      conversation: `*[ YogiriMD BY MANZ ]*` // Message content
    }
  }
 }
// Export lib module
module.exports = { all };