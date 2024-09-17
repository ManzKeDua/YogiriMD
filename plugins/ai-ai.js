let fetch = require('node-fetch');
let { chatGpt } = require('../scrape/chatgpt')

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
    if (!text) return m.reply("Masukan pertanyaan. Yang ini di tanyakan")
    conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });
    try {
        const result = await chatGpt(text);
        await m.reply(result);
        conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
    } catch (error) {
        conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });
    }

}
handler.help =  ['gpt', 'ai', 'openai'];
handler.tags = ["ai"];
handler.command = /^(gpt|ai|openai)$/i
handler.limit = true;
module.exports = handler;