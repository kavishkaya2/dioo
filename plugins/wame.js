/*
Copyright (C) 2021 KAVIYAAH   ,  Diana whatsapp bot owner
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
kaviyaah - kavishka sandaruwan (v 1.0.0 avalable)
*/

const diana = require('../events');
const { MessageType } = require('@adiwajshing/baileys');
const Config = require('../config');
const fs = require('fs');
const WAME_DESC = "Get a link to the user chat."
const WAME = "```Chat link from```@{}: https://wa.me/{}"
const NEED_UWONG = "*Give me a user!*"

diana.addqueendiacmd({ queeendiacmd: 'wame ?(.*)', fromMe: false, desc: WAME_DESC }, (async(message, match) => {
    if (message.reply_message !== false) {
        await message.client.sendMessage(message.jid, WAME.format(message.reply_message.jid.split('@')[0], message.reply_message.jid.replace('@s.whatsapp.net', ' ')), MessageType.text, {
            quotedMessage: message.reply_message.data,
            contextInfo: { mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')] }
        });
    } else if (message.mention !== false) {
        message.mention.map(async user => {
            await message.client.sendMessage(message.jid, WAME.format(user.split('@')[0], user.replace('@s.whatsapp.net', ' ')), MessageType.text, {
                contextInfo: { mentionedJid: [user.replace('c.us', 's.whatsapp.net')] }
            });
        });
    } else {
        await message.client.sendMessage(message.jid, NEED_UWONG, MessageType.text);
    }
}));
diana.addqueendiacmd({ queeendiacmd: 'wame ?(.*)', fromMe: true, noinmenu: true }, (async(message, match) => {
    if (message.reply_message !== false) {
        await message.client.sendMessage(message.jid, WAME.format(message.reply_message.jid.split('@')[0], message.reply_message.jid.replace('@s.whatsapp.net', ' ')), MessageType.text, {
            quotedMessage: message.reply_message.data,
            contextInfo: { mentionedJid: [message.reply_message.jid.replace('c.us', 's.whatsapp.net')] }
        });
    } else if (message.mention !== false) {
        message.mention.map(async user => {
            await message.client.sendMessage(message.jid, WAME.format(user.split('@')[0], user.replace('@s.whatsapp.net', ' ')), MessageType.text, {
                contextInfo: { mentionedJid: [user.replace('c.us', 's.whatsapp.net')] }
            });
        });
    } else {
        await message.client.sendMessage(message.jid, NEED_UWONG, MessageType.text);
    }
}));