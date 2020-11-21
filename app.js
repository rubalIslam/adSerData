const express = require('express')
//var horizon = require('horizon-youtube-mp3');
const app = express()
const mongoose  = require('mongoose')
const PORT = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')
//const fs = require('fs')
//const { createWorker } = require('@ffmpeg/ffmpeg');
//const worker = createWorker();
/*
(async () => {
    await worker.load();
    await worker.write('test.avi', './test.avi');
    await worker.transcode('test.avi', 'test.mp4');
    const { data } = await worker.read('test.mp4');
    fs.writeFileSync('./test.mp4', data);
    await worker.terminate();
})();
*/

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))
app.use(require('./routes/ffmpeg'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log("server is running on",PORT)
})

