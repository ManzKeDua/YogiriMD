let baileys = require('@whiskeysockets/baileys'), {useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidNormalizedUser, makeCacheableSignalKeyStore, PHONENUMBER_MCC} = baileys, {Boom} = require('@hapi/boom'), NodeCache = require('node-cache'), Pino = require('pino'), simple = require('../lib/simple'), fs = require('fs');
if (global.conns instanceof Array) {
    console.log();
} else {
    global.conns = [];
}
;
let handler = async (_0x1a40ef, {
    conn: _0x1cc5af,
    args: _0x3f6d6e,
    usedPrefix: _0x23cae8,
    command: _0x24ff53,
    isOwner: _0x4c0361,
    text: _0x303dbb
}) => {
    ;
    if (_0x1cc5af.user.jid !== global.conn.user.jid) {
        return _0x1cc5af.reply(_0x1a40ef.chat, '```Perintah ini hanya dapat digunakan di bot utama:```\n```wa.me/``````' + global.conn.user.jid.split`@`[0] + '```' + '```?text=.jadibot```', _0x1a40ef);
    }
    if (!_0x303dbb) {
        throw _0x1a40ef.reply('\u2022 *Example :* .jadibot 6288980870067');
    }
    _0x1cc5af.reply(_0x1a40ef.chat, '```Tunggu Sedang Menyiapkan Code Jadibot...```', _0x1a40ef);
    let _0x48edd2 = global.conn, _0x39fa4c = global.db.data.users[_0x1a40ef.sender], _0x230957 = 'jadibot/' + _0x303dbb, _0x3fa112 = !fs.existsSync(_0x230957), {
            state: _0x232624,
            saveCreds: _0x242151
        } = await useMultiFileAuthState(_0x230957), _0x4fef12 = new NodeCache();
    const _0x4ead3e = {
        'logger': Pino({ 'level': 'fatal' }).child({ 'level': 'fatal' }),
        'printQRInTerminal': false,
        'mobile': false,
        'auth': {
            'creds': _0x232624.creds,
            'keys': makeCacheableSignalKeyStore(_0x232624.keys, Pino({ 'level': 'fatal' }).child({ 'level': 'fatal' }))
        },
        'browser': [
            'Ubuntu',
            'Chrome',
            '20.0.04'
        ],
        'markOnlineOnConnect': true,
        'generateHighQualityLinkPreview': true,
        'msgRetryCounterCache': _0x4fef12,
        'defaultQueryTimeoutMs': undefined
    };
    _0x1cc5af = simple.makeWASocket(_0x4ead3e);
    let _0x508d1f = _0x1cc5af.ev;
    !_0x1cc5af.authState.creds.registered && setTimeout(async () => {
        ;
        let _0x5100fa = '' + _0x303dbb, _0x5385e5 = await _0x1cc5af.requestPairingCode(_0x5100fa), _0x441a4d = _0x5385e5?.match(/.{1,4}/g)?.join('-') || _0x5385e5, _0x4da5b2 = await _0x48edd2.reply(_0x303dbb + '@s.whatsapp.net', '```Masukan code dibawah ini untuk jadi bot sementara\n\n1. Klik titik tiga di pojok kanan atas\n2. Ketuk perangkat tertaut\n3. Ketuk tautkan perangkat\n4. Ketuk tautkan dengan nomer telepon saja\n5. Masukan code di bawah ini\n\nNote: code dapat expired kapan saja!```', _0x1a40ef);
        await _0x48edd2.reply(_0x303dbb + '@s.whatsapp.net', _0x441a4d, _0x4da5b2);
    }, 3000);
    async function _0x13a911(_0x388414) {
        const {
            connection: _0x439d10,
            lastDisconnect: _0x6eb2a8
        } = _0x388414;
        if (_0x439d10 == 'open') {
            _0x48edd2.reply(_0x303dbb + '@s.whatsapp.net', '```\u2705 Tersambung```', _0x1a40ef);
            global.conns.push(_0x1cc5af);
        }
        if (_0x6eb2a8 && _0x6eb2a8.error && _0x6eb2a8.error.output && _0x6eb2a8.error.output.statusCode !== DisconnectReason.loggedOut) {
            reloadHandler(true);
        }
    }
    reloadHandler = function (_0x16d95a) {
        ;
        let _0x1caf1f = require('../handler'), _0x291b3c = require('../handler');
        if (Object.keys(_0x1caf1f || {}).length) {
            _0x291b3c = _0x1caf1f;
        }
        if (_0x16d95a) {
            try {
                _0x1cc5af.ws.close();
            } catch {
            }
            _0x1cc5af = {
                ..._0x1cc5af,
                ...simple.makeWASocket(_0x4ead3e)
            };
        }
        return !_0x3fa112 && (_0x1cc5af.ev.off('messages.upsert', _0x1cc5af.handler), _0x1cc5af.ev.off('group-participants.update', _0x1cc5af.onParticipantsUpdate), _0x1cc5af.ev.off('connection.update', _0x1cc5af.connectionUpdate), _0x1cc5af.ev.off('creds.update', _0x1cc5af.credsUpdate)), _0x1cc5af.welcome = 'Hai, @user!\nSelamat datang di grup *@subject*\n\n@desc', _0x1cc5af.bye = 'Selamat tinggal @user!', _0x1cc5af.spromote = '@user sekarang admin!', _0x1cc5af.sdemote = '@user sekarang bukan admin!', _0x1cc5af.handler = _0x291b3c.handler.bind(_0x1cc5af), _0x1cc5af.onParticipantsUpdate = _0x291b3c.participantsUpdate.bind(_0x1cc5af), _0x1cc5af.connectionUpdate = _0x13a911.bind(_0x1cc5af), _0x1cc5af.credsUpdate = _0x242151.bind(_0x1cc5af), _0x1cc5af.ev.on('messages.upsert', _0x1cc5af.handler), _0x1cc5af.ev.on('group-participants.update', _0x1cc5af.onParticipantsUpdate), _0x1cc5af.ev.on('connection.update', _0x1cc5af.connectionUpdate), _0x1cc5af.ev.on('creds.update', _0x1cc5af.credsUpdate), _0x3fa112 = false, true;
    };
    reloadHandler();
    ;
};
handler.help = ['jadibot *<number>*'];
handler.tags = ['jadibot'];
handler.command = /^jadibot$/i;
handler.premium = false;
handler.limit = true;
handler.owner = true;
handler.private = false;
module.exports = handler;
;