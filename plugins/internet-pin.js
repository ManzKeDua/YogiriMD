const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys");
const fetch = require("node-fetch");

let handler = async (m, { conn, text }) => {
    const blockedKeywords = ["seksi", "sexy", "pussy", "tobrut", "memek", "kontol", "gay", "lesbi", "lesby", "homo"];
    if (blockedKeywords.some(keyword => text.includes(keyword))) {
        await conn.reply(m.chat, "Anda tidak sopan, Mohon gunakan bot dengan bijak", m);
        return m.react('❌'); // React dengan emoji ❌ jika pesan mengandung kata yang diblokir
    }

    const count = 10; // Jumlah gambar default adalah 10

    try {
        const hasil = await pinterest(text);
        const result = [];
        for (let i = 0; i < count && i < hasil.length; i++) {
            const image = hasil[i];
            result.push({
                body: proto.Message.InteractiveMessage.Body.fromObject({}),
                footer: proto.Message.InteractiveMessage.Footer.fromObject({}),
                header: proto.Message.InteractiveMessage.Header.fromObject({
                    title: `\`\`\`Mengirim ${i + 1}/${Math.min(count, hasil.length)} Gambar\`\`\``, // Mengirim maksimal 10 gambar
                    hasMediaAttachment: true,
                    ...(await prepareWAMessageMedia({ image: { url: image.images_url } }, { upload: conn.waUploadToServer }))
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
                    buttons: []
                })
            });
        }
        const msg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.fromObject({
                        body: proto.Message.InteractiveMessage.Body.fromObject({
                            text: '```Berhasil Mendapatkan Data```',
                        }),
                        header: proto.Message.InteractiveMessage.Header.fromObject({
                            hasMediaAttachment: false
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
                            cards: result
                        })
                    })
                }
            }
        }, { quoted: m });
        await conn.relayMessage(msg.key.remoteJid, msg.message, {
            messageId: msg.key.id
        });
    } catch (e) {
        conn.reply(m.chat, `❌ Coldown Tunggu Beberapa saat lagi.`, m);
    }
};

handler.help = ['pin *<text>*'];
handler.tags = ['internet'];
handler.command = /^pin(\s+(\S+))?$/i;

async function pinterest(query) {
    const baseUrl = 'https://www.pinterest.com/resource/BaseSearchResource/get/';
    const queryParams = {
        source_url: '/search/pins/?q=' + encodeURIComponent(query),
        data: JSON.stringify({
            options: {
                isPrefetch: false,
                query,
                scope: 'pins',
                no_fetch_context_on_resource: false
            },
            context: {}
        }),
        _: Date.now()
    };
    const url = new URL(baseUrl);
    Object.entries(queryParams).forEach(entry => url.searchParams.set(entry[0], entry[1]));

    try {
        const response = await fetch(url.toString());
        const json = await response.json();
        const results = json.resource_response?.data?.results ?? [];
        return results.map(item => ({
            pin: 'https://www.pinterest.com/pin/' + item.id ?? '',
            link: item.link ?? '',
            created_at: (new Date(item.created_at)).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }) ?? '',
            id: item.id ?? '',
            images_url: item.images?.['736x']?.url ?? '',
            grid_title: item.grid_title ?? ''
        }));
    } catch (error) {
        console.error('Error mengambil data:', error);
        return [];
    }
}

module.exports = handler;