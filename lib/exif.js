const fs = require("fs");
const { tmpdir } = require("os");
const ff = require("fluent-ffmpeg");
const webp = require("node-webpmux");
const path = require("path");

/**
 * Generates a random string of the specified length.
 *
 * @param {number} length - The length of the string to generate.
 * @return {string} The generated random string.
 */
const makeid = length => {
  // Initialize the result string.
  let result = "";

  // Define the characters to choose from.
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Get the length of the characters string.
  let charactersLength = characters.length;

  // Generate the random string.
  for (let i = 0; i < length; i++) {
    // Choose a random character from the characters string.
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  // Return the generated random string.
  return result;
};

/**
 * Converts an image to WebP format using fluent-ffmpeg.
 *
 * @param {Buffer} media - The image data to convert.
 * @return {Promise<Buffer>} The converted WebP image data.
 */
async function imageToWebp(media) {
  // Generate temporary file paths for the input and output files.
  const tmpFileOut = path.join(tmpdir(), `${makeid(10)}.webp`);
  const tmpFileIn = path.join(tmpdir(), `${makeid(10)}.jpg`);

  // Write the image data to the input file.
  fs.writeFileSync(tmpFileIn, media);

  // Convert the image to WebP using fluent-ffmpeg.
  await new Promise((resolve, reject) => {
    ff(tmpFileIn)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        "-vcodec",
        "libwebp",
        "-vf",
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse"
      ])
      .toFormat("webp")
      .save(tmpFileOut);
  });

  // Read the converted WebP image data from the output file.
  const buff = fs.readFileSync(tmpFileOut);

  // Delete the temporary files.
  fs.unlinkSync(tmpFileOut);
  fs.unlinkSync(tmpFileIn);

  // Return the converted WebP image data.
  return buff;
}

/**
 * Converts a video to WebP format using fluent-ffmpeg.
 *
 * @param {Buffer} media - The video data to convert.
 * @return {Promise<Buffer>} The converted WebP video data.
 */
async function videoToWebp(media) {
  // Generate temporary file paths for the input and output files.
  const tmpFileOut = path.join(tmpdir(), `${makeid(10)}.webp`);
  const tmpFileIn = path.join(tmpdir(), `${makeid(10)}.mp4`);

  // Write the video data to the input file.
  fs.writeFileSync(tmpFileIn, media);

  // Convert the video to WebP using fluent-ffmpeg.
  await new Promise((resolve, reject) => {
    ff(tmpFileIn)
      .on("error", reject)
      .on("end", () => resolve(true))
      .addOutputOptions([
        "-vcodec", // Set the video codec to libwebp.
        "libwebp",
        "-vf", // Set the video filters.
        "scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse",
        "-loop", // Set the number of times the video should loop.
        "0",
        "-ss", // Set the start time of the video.
        "00:00:00",
        "-t", // Set the duration of the video.
        "00:00:05",
        "-preset", // Set the encoding preset.
        "default",
        "-an", // Disable audio.
        "-vsync", // Set the video synchronization.
        "0"
      ])
      .toFormat("webp") // Set the output format to WebP.
      .save(tmpFileOut); // Save the output to the temporary file.
  });

  // Read the converted WebP video data from the output file.
  const buff = fs.readFileSync(tmpFileOut);

  // Delete the temporary files.
  fs.unlinkSync(tmpFileOut);
  fs.unlinkSync(tmpFileIn);

  // Return the converted WebP video data.
  return buff;
}

/**
 * Writes EXIF metadata to an image and returns the path to the modified image.
 * @param {Buffer} media - The image data to write metadata to.
 * @param {Object} metadata - The metadata to write to the image.
 * @param {string} metadata.packname - The name of the sticker pack.
 * @param {string} metadata.author - The author of the sticker pack.
 * @param {Array<string>} metadata.categories - The categories of the sticker.
 * @returns {Promise<string>} - The path to the modified image.
 */
async function writeExifImg(media, metadata) {
  // Convert the image to WebP format.
  let wMedia = await imageToWebp(media);

  // Create temporary file paths for the input and output images.
  const tmpFileIn = path.join(tmpdir(), `${makeid(10)}.webp`);
  const tmpFileOut = path.join(tmpdir(), `${makeid(10)}.webp`);

  // Write the WebP image data to the input file.
  fs.writeFileSync(tmpFileIn, wMedia);

  if (metadata.packname || metadata.author) {
    // Create a new WebP image object.
    const img = new webp.Image();

    // Create the metadata object.
    const json = {
      "sticker-pack-id": `https://github.com/XinnChan`,
      "sticker-pack-name": metadata.packname,
      "sticker-pack-publisher": metadata.author,
      emojis: metadata.categories ? metadata.categories : [""]
    };

    // Create the EXIF attribute buffer.
    const exifAttr = Buffer.from([
      0x49,
      0x49,
      0x2a,
      0x00,
      0x08,
      0x00,
      0x00,
      0x00,
      0x01,
      0x00,
      0x41,
      0x57,
      0x07,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x16,
      0x00,
      0x00,
      0x00
    ]);

    // Create the JSON buffer.
    const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");

    // Concatenate the EXIF attribute buffer and JSON buffer.
    const exif = Buffer.concat([exifAttr, jsonBuff]);

    // Write the length of the JSON buffer to the EXIF attribute buffer.
    exif.writeUIntLE(jsonBuff.length, 14, 4);

    // Load the input image.
    await img.load(tmpFileIn);

    // Delete the input image file.
    fs.unlinkSync(tmpFileIn);

    // Set the EXIF metadata of the image.
    img.exif = exif;

    // Save the modified image to the output file.
    await img.save(tmpFileOut);

    // Return the path to the modified image.
    return tmpFileOut;
  }
}

/**
 * Writes EXIF metadata to a video and returns the path to the modified video.
 * @param {Buffer} media - The video data to write metadata to.
 * @param {Object} metadata - The metadata to write to the video.
 * @param {string} metadata.packname - The name of the sticker pack.
 * @param {string} metadata.author - The author of the sticker pack.
 * @param {Array<string>} metadata.categories - The categories of the sticker.
 * @returns {Promise<string>} - The path to the modified video.
 */
async function writeExifVid(media, metadata) {
  // Convert the video to WebP format.
  let wMedia = await videoToWebp(media);

  // Create temporary file paths for the input and output videos.
  const tmpFileIn = path.join(tmpdir(), `${makeid(10)}.webp`);
  const tmpFileOut = path.join(tmpdir(), `${makeid(10)}.webp`);

  // Write the WebP video data to the input file.
  fs.writeFileSync(tmpFileIn, wMedia);

  if (metadata.packname || metadata.author) {
    // Create a new WebP image object.
    const img = new webp.Image();

    // Create the metadata object.
    const json = {
      "sticker-pack-id": `https://github.com/XinnChan`,
      "sticker-pack-name": metadata.packname,
      "sticker-pack-publisher": metadata.author,
      emojis: metadata.categories ? metadata.categories : [""]
    };

    // Create the EXIF attribute buffer.
    const exifAttr = Buffer.from([
      0x49,
      0x49,
      0x2a,
      0x00,
      0x08,
      0x00,
      0x00,
      0x00,
      0x01,
      0x00,
      0x41,
      0x57,
      0x07,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x16,
      0x00,
      0x00,
      0x00
    ]);

    // Create the JSON buffer.
    const jsonBuff = Buffer.from(JSON.stringify(json), "utf-8");

    // Concatenate the EXIF attribute buffer and JSON buffer.
    const exif = Buffer.concat([exifAttr, jsonBuff]);

    // Write the length of the JSON buffer to the EXIF attribute buffer.
    exif.writeUIntLE(jsonBuff.length, 14, 4);

    // Load the input video.
    await img.load(tmpFileIn);

    // Delete the input video file.
    fs.unlinkSync(tmpFileIn);

    // Set the EXIF metadata of the video.
    img.exif = exif;

    // Save the modified video to the output file.
    await img.save(tmpFileOut);

    // Return the path to the modified video.
    return tmpFileOut;
  }
}

/**
 * Writes EXIF metadata to a media file and returns the path to the modified file.
 * @param {Buffer} media - The media data to write metadata to.
 * @param {Object} metadata - The metadata to write to the media.
 * @param {string} metadata.packname - The name of the sticker pack.
 * @param {string} metadata.author - The author of the sticker pack.
 * @param {Array<string>} metadata.categories - The categories of the sticker.
 * @returns {Promise<string>} - The path to the modified media file.
 */
async function writeExif(media, metadata) {
  // Convert the media data to WebP format.
  let wMedia = /webp/.test(media.mimetype)
    ? media.data
    : /image/.test(media.mimetype)
      ? await imageToWebp(media.data)
      : /video/.test(media.mimetype) ? await videoToWebp(media.data) : "";

  // Create temporary file paths for the input and output files.
  const tmpFileIn = path.join(tmpdir(), `${makeid(10)}.webp`);
  const tmpFileOut = path.join(tmpdir(), `${makeid(10)}.webp`);

  // Write the WebP media data to the input file.
  fs.writeFileSync(tmpFileIn, wMedia);

  if (metadata.packname || metadata.author) {
    // Create a new WebP image object.
    const img = new webp.Image();

    // Create the metadata object.
    const json = {
      "sticker-pack-id": `https://github.com/XinnChan`,
      "sticker-pack-name": metadata.packname,
      "sticker-pack-publisher": metadata.author,
      emojis: metadata.categories ? metadata.categories : [""]
    };

    // Create the EXIF attribute buffer.
    const exifAttr = Buffer.from([
      0x49,
      0x49,
      0x2a,
      0x00,
      0x08,
      0x00,
      0x00,
      0x00,
      0x01,
      0x00,
      0x41,
      0x57,
      0x07,
      0x00,
      0x00,
      0x00,
      0x00,
      0x00,
      0x16,
      0x00,
      0x00,
      0x00
    ]);
  }
}
module.exports = {
  imageToWebp,
  videoToWebp,
  writeExifImg,
  writeExifVid,
  writeExif
};
