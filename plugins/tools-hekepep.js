hack akun ff plugins

const getRandomUsername = () => {
    const usernames = ['user123', 'player456', 'gamer789', 'hero321', 'champion654'];
    return usernames[Math.floor(Math.random() * usernames.length)];
};

const getRandomId = () => {
    const ids = ['123456789', '987654321', '543216789', '678912345', '432198765'];
    return ids[Math.floor(Math.random() * ids.length)];
};

const getRandomPassword = () => {
    const passwords = ['password123', 'abc12345', 'qwerty987', 'letmein456', 'securepass789'];
    return passwords[Math.floor(Math.random() * passwords.length)];
};

const getRandomLoginMethod = () => {
    const loginMethods = ['Gmail', 'Facebook', 'Yahoo'];
    return loginMethods[Math.floor(Math.random() * loginMethods.length)];
};

let handler = async (m, { conn, args }) => {
    const id = args[0];
    if (!id) return conn.reply(m.chat, 'id nya mana', m);

    const username = getRandomUsername();
    const password = getRandomPassword();
    const loginMethod = getRandomLoginMethod();

    const message = `BERHASIL DI HACK

NIH DATA AKUNNYA:
USERNAME : ${username}
ID : ${id}
PASSWORD : ${password}

NOTE : LOGIN VIA ${loginMethod}`;

    await conn.reply(m.chat, message, m);
};

handler.help = ['hackffid'];
handler.tags = ['tools'];
handler.command = /^(hackffid)$/i;
handler.premium = true;
handler.register = false;

export default handler;