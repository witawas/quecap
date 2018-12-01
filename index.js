'use strict';

//const firebase = require('firebase')
const line = require('@line/bot-sdk');
const express = require('express');


const usrReqQue = require('./usrReqQue');
const bookingReq = require('./booking');
const listQue = require('./listQue');
const admConfirm = require('./adminConfirm');
const myQue = require('./myQue');
const setQue = require('./setQue');
const nodemailer = require('nodemailer');

var mysql = require('mysql');
var con = mysql.createConnection({
  host: "119.59.120.32",
  user: "gooruapp_queue",
  password: "GFhPccLkV4",
  database: "gooruapp_queue"
});

// const  = rerquie('./fiel')

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'U43M3KfnQlMydCvFi3N9eh0NtDoeMm3kVGPwHIAlz6q9STe0Ea9Fax3LxOcmtBJoPZk2pywFWE/O8iV9j0ah/6g16D6PUu0Z2aR0S+836KODrSv8VuOXWAUvOHtcX7DAwplRgm/LnTv3PVi6lxm8FgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'f6cf11d913e4a24648428a0179cec683'//,
//  apiKey: "AIzaSyBaVgUFW4DbYaCoFEwkXU7RnzodbwP9pgE",
//  authDomain: "quecap-5fe0a.firebaseapp.com",
//  databaseURL: "https://quecap-5fe0a.firebaseio.com",
//  projectId: "quecap-5fe0a",
//  storageBucket: "",
//  messagingSenderId: "125612660068"
};
//firebase.initializeApp(config);

// config สำหรับของ gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wittawas12t@gmail.com', // your email
    pass: 'gmailJow11' // your email password
  }
});

let mailOptions = {
  from: 'wittawas12t@gmail.com',                // sender
  to: 'wittawas.t@kbtg.tech',                // list of receivers
  subject: 'Hello from sender',              // Mail subject
  html: '<b>Do you receive this mail?</b>'   // HTML body
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  console.log(event);

  
  
  if (event.type !== 'message' || event.message.type !== 'text' || event.type !== 'postback') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  let echo = {};
  /*if (event.message.text === 'กี่โมง') {
    echo = { type: 'text', text: 'เที่ยง' };
  } else if("ListQ") {
    echo = { type: 'text', text: event.message.text + 'นะจ้ะ' };  
  }else {
    echo = { type: 'text', text: event.message.text + 'นะจ้ะ' };  
  }*/
  var req_message = event.message.text;
  var userId = event.source.userId;

  if(userId === 'U99372d31d3009c721049695f636424c0'){

      if(req_message === 'listChange'){   
          echo = listQue.listQueReq(event);
      }else if(req_message === 'confirm'){ 
          echo = { type: 'text', text: 'reply by file '+admConfirm.admConfirm(event) };
      }else{
          echo = { type: 'text', text: 'ขออภัยคุณไม่มีสิทธิ์ใช้งานในส่วนนี้นะครับ'}; 
      }
  }else{

      if (req_message === 'booking'){
        echo = { type: 'text', text: 'reply by file '+bookingReq.bookingReq(event) };
      }else  if(req_message === 'q'){
        echo = { type: 'text', text: 'reply by file '+usrReqQue.getQue(event) };
        transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
        });

      }else if(req_message === 'myQ'){
        echo = { type: 'text', text: 'reply by file '+myQue.getMyQue(event) };
      }else if(req_message === 'setQ'){
        echo = { type: 'text', text: 'reply by file '+setQue.setQue(event) };
      }else{
          echo = { type: 'text', text: 'ขออภัยคุณไม่มีสิทธิ์ใช้งานในส่วนนี้นะครับ'};
      }
    }
  

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

function booking() {

}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
