//const http = require('http');
const express = require('express')
const router = express.Router();

const fs = require('fs');
const ytdl = require('ytdl-core');
//const youtubedl = require('ytdl');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
//const router = require('./auth');

router.post('/getmp3', (req, res) => {
    console.log(req.body.yurl);
    console.log("get-mp3 called");
    //const url = "https://www.youtube.com/watch?v=mX4mS9uDVlg";
    const url = req.body.yurl;
    var stream = ytdl(url)
    ffmpeg.setFfmpegPath(ffmpegPath);
    var proc = new ffmpeg({ source: stream })
    let msg = ""
    mp3 = "./audio1.mp3";
    proc.withAudioCodec('libmp3lame')
        .toFormat('mp3')
        .saveToFile(mp3)
    
    proc.on('end', function () {
        console.log("finished");
        res.json({msg:"conversion successfull!"});
    })
})

module.exports = router
/*
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    const msg = 'Hello Node!\n'
    res.end(msg);
});



const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
});
*/