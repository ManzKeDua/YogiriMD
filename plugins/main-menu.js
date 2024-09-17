const handler = async (m, { conn, usedPrefix: _p }) => {
  const more = String.fromCharCode(8206);
  const readMore = more.repeat(4001);
  const tags = {
    info: 'Menu Info',
    attack: 'Menu Attack',
    anonymous: 'Menu Anonymous',
    ai: 'Menu Openai',
    anime: 'Menu Anime',
    downloader: 'Menu Downloader',
    group: 'Menu Group',
    fun: 'Menu Fun',
    premium: 'Menu Premium',
    jadibot: 'Menu Jadibot',
    tools: 'Menu Tools',
    xp: 'Menu Xp',
    owner: 'Menu Owner'
  };

  const defaultMenu = {
    before: `Hi ${Func.ucapan()} @${m.sender.split("@")[0]}, I am an automated system (WhatsApp Bot) that can help to do something, search and get data / information only through WhatsApp. If you find a bug in this bot, please report it to the owner. Don't forget to enter the main group${readMore}`,
    header: '\n┌ ◦ *[ %category ]*',
    body: "│ ◦ %cmd %flags",
    footer: "└—",
    after: `${namebot} By ${author}`,
  };

  try {
    const plugins = Object.values(global.plugins).filter(plugin => !plugin.disabled);
    const help = plugins.map(plugin => ({
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit ? '🄻' : '',
      premium: plugin.premium ? '🄿' : '',
      glimit: plugin.glimit ? '🄶' : '',
      owner: plugin.owner ? '🄾' : '',
      rowner: plugin.rowner ? '🄾' : '',
    }));
    const text = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag => {
        const items = help.filter(plugin => plugin.tags.includes(tag))
          .flatMap(plugin => plugin.help.map(help => ({
            cmd: plugin.prefix ? help : `${_p}${help}`, // Menggunakan _p untuk menggantikan %p
            flags: [plugin.limit, plugin.premium, plugin.glimit, plugin.owner, plugin.rowner].join(' ')
          })))
          .map(({ cmd, flags }) => `${defaultMenu.body.replace(/%cmd/g, cmd).replace(/%flags/g, flags).trim()}`)
          .join('\n');
        return `${defaultMenu.header.replace(/%category/g, tags[tag])}\n${items}\n${defaultMenu.footer}`;
      }),
      defaultMenu.after,
    ].join('\n');

    const replace = {
      '%': '',
      p: _p,
      name: m.name,
      name2: `@${m.sender.split("@")[0]}`,
    };
    
    conn.sendMessage(m.chat, {
	text: await Func.style(text).replace(/%(\w+)/g, (_, name) => replace[name] || ''),
	contextInfo: {
        mentionedJid: conn.parseMention(text),
	externalAdReply: {
	title: namebot,
	body: '',
	thumbnailUrl: thumbnail,
	sourceUrl: 'https://instagram.com/manzkenzz',
	mediaType: 1,
	renderLargerThumbnail: true
	}}})
  } catch (e) {
    console.log(e);
  }
};

handler.command = /^(menu|help|\?)$/i;
handler.exp = 3;

module.exports = handler;