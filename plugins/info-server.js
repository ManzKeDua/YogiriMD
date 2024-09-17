const axios = require('axios');
const os = require('os');

const Styles = (text, style = 1) => {
  var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  var yStr = {
    1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
  };
  var replacer = [];
  xStr.map((v, i) =>
    replacer.push({
      original: v,
      convert: yStr[style].split('')[i]
    })
  );
  var str = text.toLowerCase().split('');
  var output = [];
  str.map((v) => {
    const find = replacer.find((x) => x.original == v);
    find ? output.push(find.convert) : output.push(v);
  });
  return output.join('');
};

let handler = async (m) => {
  try {
    const response = await axios.get('http://ip-api.com/json/');
    const serverInfo = response.data;
    conn.sendMessage(m.chat, {
      react: {
        text: '🎟',
        key: m.key,
      }
    });

    let serverMessage = `*S E R V E R - I N F O*\n\n`;
    const osInfo = Styles(os.platform(), 1);
    const totalRAM = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(1); // in GB
    const freeRAM = (os.freemem() / (1024 * 1024 * 1024)).toFixed(1); // in GB
    const uptime = os.uptime();
    const uptimeFormatted = formatUptime(uptime);
    const processor = Styles(os.cpus()[0].model, 1);
    const totalCores = os.cpus().length;

    serverMessage += `┌  ◦  *OS :* ${osInfo}\n`;
    serverMessage += `│  ◦  *RAM :* ${freeRAM} GB / ${totalRAM} GB\n`;
    serverMessage += `│  ◦  *Country :* ${serverInfo.country}\n`;
    serverMessage += `│  ◦  *CountryCode :* ${serverInfo.countryCode}\n`;
    serverMessage += `│  ◦  *Region :* ${serverInfo.region}\n`;
    serverMessage += `│  ◦  *RegionName :* ${serverInfo.regionName}\n`;
    serverMessage += `│  ◦  *City :* ${serverInfo.city}\n`;
    serverMessage += `│  ◦  *Zip :* ${serverInfo.zip}\n`;
    serverMessage += `│  ◦  *Lat :* ${serverInfo.lat}\n`;
    serverMessage += `│  ◦  *Lon :* ${serverInfo.lon}\n`;
    serverMessage += `│  ◦  *Timezone :* ${serverInfo.timezone}\n`;
    serverMessage += `│  ◦  *Isp :* ${serverInfo.isp}\n`;
    serverMessage += `│  ◦  *Org :* ${serverInfo.org}\n`;
    serverMessage += `│  ◦  *As :* ${serverInfo.as}\n`;
    serverMessage += `│  ◦  *Query :* ${serverInfo.query}\n`;
    serverMessage += `│  ◦  *Uptime :* ${uptimeFormatted}\n`;
    serverMessage += `└  ◦  *Processor :* ${processor} (${totalCores} Cores)`;

    await m.reply(Styles(serverMessage, 1)); 
  } catch (e) {
    console.log(e);
  }
};

function formatUptime(uptime) {
  let seconds = Math.floor(uptime % 60);
  let minutes = Math.floor((uptime / 60) % 60);
  let hours = Math.floor((uptime / (60 * 60)) % 24);
  let days = Math.floor(uptime / (60 * 60 * 24));

  let formattedUptime = '';
  if (days > 0) formattedUptime += `${days} days `;
  if (hours > 0) formattedUptime += `${hours} hours `;
  if (minutes > 0) formattedUptime += `${minutes} minutes `;
  if (seconds > 0) formattedUptime += `${seconds} seconds`;

  return formattedUptime;
}

handler.command = ['server', 'ping', 'jaringan'];
handler.tags = ['info'];
handler.help = ['server', 'ping', 'jaringan'];

module.exports = handler;