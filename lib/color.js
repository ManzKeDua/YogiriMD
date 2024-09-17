const chalk = require('chalk')
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");


/**
 * Convert buffer to audio file using ffmpeg
 * @param {Buffer} buffer - The audio buffer
 * @param {Array} args - Additional ffmpeg arguments
 * @param {String} ext - File extension
 * @param {String} ext2 - Output file extension
 * @returns {Promise<Object>} - Resolves with the converted audio file
 *                             and its filename
 */
function ffmpeg(buffer, args = [], ext = "", ext2 = "") {
  return new Promise(async (resolve, reject) => {
    try {
      // Generate temporary file path
      let tmp = path.join(__dirname, "../tmp", +new Date() + "." + ext);
      let out = tmp + "." + ext2; // Output file path
      
      // Write buffer to temporary file
      await fs.promises.writeFile(tmp, buffer);
      
      // Run ffmpeg command
      spawn("ffmpeg", ["-y", "-i", tmp, ...args, out])
        .on("error", reject)
        .on("close", async (code) => {
          try {
            // Cleanup temporary file
            await fs.promises.unlink(tmp);
            
            // Reject if ffmpeg fails
            if (code !== 0) return reject(code);
            
            // Read and return converted file
            resolve({ 
              data: await fs.promises.readFile(out), 
              filename: out 
            });
          } catch (e) {
            reject(e);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}

/**
 * Convert Audio to Playable WhatsApp Audio
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 */
function toPTT(buffer, ext) {
  return ffmpeg(
    buffer,
    ["-vn", "-c:a", "libopus", "-b:a", "128k", "-vbr", "on"],
    ext,
    "ogg",
  );
}

/**
 * Convert Audio to Playable WhatsApp PTT
 * @param {Buffer} buffer Audio Buffer
 * @param {String} ext File Extension
 */
function toAudio(buffer, ext) {
  return ffmpeg(
    buffer,
    [
      "-vn",
      "-c:a",
      "libopus",
      "-b:a",
      "128k",
      "-vbr",
      "on",
      "-compression_level",
      "10",
    ],
    ext,
    "opus",
  );
}

/**
 * Convert Audio to Playable WhatsApp Video
 * @param {Buffer} buffer Video Buffer
 * @param {String} ext File Extension
 */
function toVideo(buffer, ext) {
  return ffmpeg(
    buffer,
    [
      "-c:v",
      "libx264",
      "-c:a",
      "aac",
      "-ab",
      "128k",
      "-ar",
      "44100",
      "-crf",
      "32",
      "-preset",
      "slow",
    ],
    ext,
    "mp4",
  );
}

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
	return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

module.exports = {
	color,
	bgcolor,
	toAudio,
	toPTT,
	toVideo,
	ffmpeg,
}
