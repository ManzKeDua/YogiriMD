/*
*EGVUAXRL
*CH: https://whatsapp.com/channel/0029Va9iaylFy724TO4TSc0J
*GC: https://chat.whatsapp.com/Gz3xoYG4mzaFP0xamibtFy
*/

const axios = require('axios');
const egvuaxrl = async (m, { conn, command, text }) => {
  if (command === "track") {
    if (!text) {
      throw 'Masukkan alamat MAC atau IP yang ingin dilacak atau ingin capture ip sendiri ketikkan .myip';
    }

    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    const ipv6Regex = /^([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4}$/;

    let url = '';
    if (macRegex.test(text)) {
      url = `https://api.macvendors.com/${text}`;
    } else if (ipv4Regex.test(text) || ipv6Regex.test(text)) {
      url = `https://ipapi.co/${text}/json/`;
    } else {
      throw 'Format alamat tidak valid. Masukkan alamat MAC atau IP yang valid.';
    }

    try {
      const response = await axios.get(url);

      if (macRegex.test(text)) {
        const vendor = response.data;
        m.reply(`Alamat MAC: ${text}\nVendor: ${vendor}`);
      } else {
        const { ip, city, region, country_name, postal, latitude, longitude } = response.data;
        let result = `Alamat IP: ${ip}\nKota: ${city}\nProvinsi: ${region}\nNegara: ${country_name}\nKode Pos: ${postal}\nLatitude: ${latitude}\nLongitude: ${longitude}`;
        Object.keys(response.data).forEach(key => {
          result += `\n${key}: ${response.data[key]}`;
        });
        m.reply(result);
      }
    } catch (error) {
      throw 'Gagal melacak alamat MAC atau IP.';
    }
  } else if (command === "myip") {
    try {
      const response = await axios.get(`https://api.ipify.org/?format=json`);
      const ip = response.data.ip;

      m.reply(`IP: ${ip}`);
    } catch (error) {
      throw 'Gagal mengambil IP';
    }
  }
};

egvuaxrl.help = ['tracking'];
egvuaxrl.tags = ['tools'];
egvuaxrl.command = /^(track|myip)$/i;
egvuaxrl.premium = true;
module.exports = egvuaxrl;