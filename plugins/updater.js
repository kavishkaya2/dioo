/*
Copyright (C) 2021 KAVIYAAH   ,  Diana whatsapp bot owner
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
kaviyaah - kavishka sandaruwan (v 1.0.0 avalable)
*/

const simpleGit = require('simple-git');
const git = simpleGit();
const diana = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const Config = require('../config');
const exec = require('child_process').exec;
const Heroku = require('heroku-client');
const { PassThrough } = require('stream');
const heroku = new Heroku({ token: Config.HEROKU.API_KEY })
const axios = require('axios');
const Language = require('../language');
const Lang = Language.getString('updater');

//උස්සන උන්ගෙ රෙපෝ කෙලවිලාම පලයම්


diana.addqueendiacmd({ queeendiacmd: 'update$', fromMe: true, noinmenu: true, desc: Lang.UPDATER_DESC }, (async(message, match) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {

        var webimage = await axios.get(`https://telegra.ph/file/2b96f9eaba69490ae689d.jpg`, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid, Buffer.from(webimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: '\n\n\n\n\n\n' + Lang.UPDATE + '\n\n\n\n *⚡powerd by diana*' })

    } else {
        var newzels = Lang.NEW_UPDATE;
        commits['all'].map(
            (commit) => {
                newzels += '🔹 [' + commit.date.substring(0, 10) + ']: ' + commit.message + ' ◁◁' + commit.author_name + '▷▷\n';
            }
        );

        var webimage = await axios.get(`https://telegra.ph/file/854891a5905bf54613062.jpg`, { responseType: 'arraybuffer' })
        await message.client.sendMessage(message.jid, Buffer.from(webimage.data), MessageType.image, { mimetype: Mimetype.jpg, caption: newzels + '```' + '\n\n *⚡powerd by diana*' })

    }
}));



diana.addqueendiacmd({ queeendiacmd: 'update now$', fromMe: true, noinmenu: true, desc: Lang.UPDATE_NOW_DESC }, (async(message, match) => {
    await git.fetch();
    var commits = await git.log([Config.BRANCH + '..origin/' + Config.BRANCH]);
    if (commits.total === 0) {
        return await message.client.sendMessage(
            message.jid,
            Lang.UPDATE, MessageType.text
        );
    } else {
        var guncelleme = await message.reply(Lang.UPDATING);
        if (Config.HEROKU.HEROKU) {
            try {
                var app = await heroku.get('/apps/' + Config.HEROKU.APP_NAME)
            } catch {
                await message.client.sendMessage(
                    message.jid, Lang.INVALID_HEROKU, MessageType.text);
                await new Promise(r => setTimeout(r, 1000));
                return await message.client.sendMessage(
                    message.jid, Lang.IN_AF, MessageType.text);
            }

            git.fetch('upstream', Config.BRANCH);
            git.reset('hard', ['FETCH_HEAD']);

            var git_url = app.git_url.replace(
                "https://", "https://api:" + Config.HEROKU.API_KEY + "@"
            )

            try {
                await git.addRemote('heroku', git_url);
            } catch { console.log('heroku remote ekli'); }
            await git.push('heroku', Config.BRANCH);

            await message.client.sendMessage(
                message.jid, Lang.UPDATED, MessageType.text);

            await message.sendMessage(Lang.AFTER_UPDATE);

        } else {
            git.pull((async(err, update) => {
                if (update && update.summary.changes) {
                    await message.client.sendMessage(
                        message.jid, Lang.UPDATED_LOCAL, MessageType.text);
                    exec('npm install').stderr.pipe(process.stderr);
                } else if (err) {
                    await message.client.sendMessage(
                        message.jid, '*❌ Güncelleme başarısız oldu!*\n*Hata:* ```' + err + '```', MessageType.text);
                }
            }));
            await guncelleme.delete();
        }
    }
}));