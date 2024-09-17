/*
    [FITUR BY EGVUAXRL GAUSAH DI APUS]
    
    link ch egvuaxrl untuk fitur yang lain : https://whatsapp.com/channel/0029Va9iaylFy724TO4TSc0J
    
    link gc untuk saran : https://chat.whatsapp.com/Gz3xoYG4mzaFP0xamibtFy
    
    Note: .unblur 5:5 or .unblur 3:3 or whatever
    .blur 5 or whatever, kurang puas? kembangkan sendiri lagi
*/

const { promises } = require('fs')
const { exec } = require('child_process')

let egvuaxrl = async (m, { conn, usedPrefix, command, args }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    
    if (!/video/.test(mime)) throw `Balas video yang ingin diubah dengan caption *${usedPrefix + command}*`
    
    let video = await q.download?.()
    if (!video) throw 'Tidak dapat mengunduh video!'
    
    let filterType = ''
    if (command === 'blurvid') {
        // Blur video
        if (!args[0]) throw 'Masukkan tingkat blur yang diinginkan!'
        filterType = `-vf "boxblur=${args[0]}"`
    } else if (command === 'unblurvid') {
        let [lumaX, lumaY] = args[0].split(':')
        filterType = `-vf "unsharp=luma_msize_x=${lumaX}:luma_msize_y=${lumaY}"`
    } else {
        throw 'Perintah tidak valid. Gunakan .blurvid untuk blur video dan .unblurvid untuk unblur video.'
    }
    
    let ran = (new Date() * 1) + '.mp4'
    let media = './tmp/' + ran
    let output = media + '_processed.mp4'
    
    await promises.writeFile(media, video)
    
    exec(`ffmpeg -i ${media} ${filterType} ${output}`, async (err) => {
        await promises.unlink(media)
        
        if (err) return Promise.reject('Terjadi kesalahan saat memproses video!')
        
        let buff = await promises.readFile(output)
        m.reply('_Sedang mengirim video..._')
        
        conn.sendFile(m.chat, buff, output, null, m, true, { quoted: m, mimetype: 'video/mp4' })
        await promises.unlink(output)
    })
}

egvuaxrl.help = ['blurvid', 'unblurvid']
egvuaxrl.tags = ['video']
egvuaxrl.command = /^(blurvid|unblurvid)$/i

module.exports = egvuaxrl