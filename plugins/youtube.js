/*
Copyright (C) 2021 KAVIYAAH   ,  Diana whatsapp bot owner
Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.
kaviyaah - kavishka sandaruwan (v 1.0.0 avalable)
*/

const diana = require('../events');
const { MessageType, Mimetype } = require('@adiwajshing/baileys');
const translatte = require('translatte');
const Config = require('../config');
const axios = require('axios')

//============================== CURRENCY =============================================
const { exchangeRates } = require('exchange-rates-api');
const ExchangeRatesError = require('exchange-rates-api/src/exchange-rates-error.js')
    //=====================================================================================

//============================== TTS ==================================================
const fs = require('fs');
const https = require('https');
const googleTTS = require('google-translate-tts');
//=====================================================================================

//============================== YOUTUBE ==============================================
const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const yts = require('yt-search')
const got = require("got");
const ID3Writer = require('browser-id3-writer');
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    clientId: 'acc6302297e040aeb6e4ac1fbdfd62c3',
    clientSecret: '0e8439a1280a43aba9a5bc0a16f3f009'
});
//=====================================================================================

const Language = require('../language');
const Lang = Language.getString('scrapers');
const Glang = Language.getString('github');
const TKlang = Language.getString('tiktok');

const wiki = require('wikijs').default;
var gis = require('g-i-s');
const { BYE_LOGO } = require('../config');
let treue = Config.WORKTYPE == 'public' ? false : true
    //=====================================================================================
const KSK = Config.WORKTYPE == 'public' ? false : true
diana.addqueendiacmd({ queeendiacmd: 'yt ?(.*)', fromMe: KSK, deldiacmd: false, desc: Lang.YT_DESC }, (async(message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid, Lang.NEED_WORDS, MessageType.text);
    var searching = await message.client.sendMessage(message.jid, Lang.GETTING_VIDEOS, MessageType.text, { quoted: message.data });

    try {
        var arama = await yts(match[1]);
    } catch {
        return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text);
    }

    var ytgot = '';
    arama.all.map((video) => {
        ytgot += '🧞‍♂️ *' + video.title + '*' + '\n' + '*🧚‍♀️Duration:-* ' + video.duration + '\n' + '*📎Link:-* ' + video.url + '\n' + '*📅time ago:-* ' + video.ago + '\n\n'
    });

    await message.client.sendMessage(message.jid, '*❖  Diana youtube search Engine ❖*\n' + 'Result ...' + '\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n' + ytgot, MessageType.text, { quoted: message.data });
}));

diana.addqueendiacmd({ queeendiacmd: 'yt ?(.*)', fromMe: true, deldiacmd: false, desc: Lang.YT_DESC }, (async(message, match) => {

    if (match[1] === '') return await message.client.sendMessage(message.jid, Lang.NEED_WORDS, MessageType.text);
    var searching = await message.client.sendMessage(message.jid, Lang.GETTING_VIDEOS, MessageType.text, { quoted: message.data });

    try {
        var arama = await yts(match[1]);
    } catch {
        return await message.client.sendMessage(message.jid, Lang.NOT_FOUND, MessageType.text);
    }

    var ytgot = '';
    arama.all.map((video) => {
        ytgot += '🧞‍♂️ *' + video.title + '*' + '\n' + '*🧚‍♀️Duration:-* ' + video.duration + '\n' + '*📎Link:-* ' + video.url + '\n' + '*📅time ago:-* ' + video.ago + '\n\n'
    });

    await message.client.sendMessage(message.jid, '*❖  Diana youtube search Engine ❖*\n' + 'Result ...' + '\n▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n' + ytgot, MessageType.text, { quoted: message.data });
}));