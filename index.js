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
const postback = require('./postback');

const capUpd = require('./capUpd');
const postback_upd = require('./postback_capUpd');

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
async function handleEvent(event) {
  console.log(event);
  var userId = event.source.userId;
  if(event.type == 'postback' && userId === 'U99372d31d3009c721049695f636424c0'){
    console.log(">>>>>>>>>>>>>>data : "+event.postback.data);
    if(event.postback.data == 'confirm'){
         console.log("Step1");
         //var msg1 =  { type: 'text', text: 'send notification success!! '};
         //return client.replyMessage(event.replyToken, msg1);
        return client.replyMessage(event.replyToken, postback.handle_postback(event,con,client));
    }

    if(event.postback.data.indexOf('action=upd')>=0){
         console.log("Step22");
         //var msg1 =  { type: 'text', text: 'send notification success!! '};
         //return client.replyMessage(event.replyToken, msg1);
        return client.replyMessage(event.replyToken, postback_upd.handle_postback(event,con,client));
    }
  }
 
   console.log("Step2");
  
  if ((event.type !== 'message' || event.message.type !== 'text' ) 
      && event.type !== 'postback') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  let echo = {};
  var data = event.message.text.split(" ");
  /*if (event.message.text === 'กี่โมง') {
    echo = { type: 'text', text: 'เที่ยง' };
  } else if("ListQ") {
    echo = { type: 'text', text: event.message.text + 'นะจ้ะ' };  
  }else {
    echo = { type: 'text', text: event.message.text + 'นะจ้ะ' };  
  }*/
  var req_message = event.message.text;
  

  if(userId === 'U99372d31d3009c721049695f636424c0'){
      req_message = req_message.toUpperCase();
      if(req_message.startsWith('LISTCHANGE')){   
         // echo = listQue.listQueReq(event);
          await listChange(event, function(result){
          console.log('resultja ', result);
          var msg = {
            "type": "template",
            "altText": "Change List",
            "template": {
                "type": "buttons",
                "title": "Change List",
                "text": "List All",
                "actions": result
            }
        }
          return client.replyMessage(event.replyToken, msg);
           });  
      }else if(req_message.startsWith('CAPUPDATE')){   
         // echo = capUpd.listCapUpd(event);
          
           await listCapUpd(event, function(result){
          console.log('resultja ', result);
          var msg = {
            "type": "template",
            "altText": "Change List",
            "template": {
                "type": "buttons",
                "title": "Change List",
                "text": "List All",
                "actions": result
            }
        }
          return client.replyMessage(event.replyToken, msg);
           });  
      }else if(req_message === 'confirm'){ 
          echo = { type: 'text', text: 'reply by file '+admConfirm.admConfirm(event) };
      }else{
          echo = { type: 'text', text: 'ขออภัยคุณไม่มีสิทธิ์ใช้งานในส่วนนี้นะครับ'}; 
      }
  }else{

       if (data[0] === 'Booking'){
      await Booking(data[1],event.source.userId, function(result){
        console.log('resultja ', result);

        return client.replyMessage(event.replyToken, { type: 'text', text: result });
      });          
      // console.log("this is : " + x)   

      // handleText(event.message, event.replyToken, event.source);
      
    }else  if(req_message === 'q'){
        //console.log("do this"); 
        await checkQueNow(event, function(result){
        console.log('resultja ', result);

        return client.replyMessage(event.replyToken, { type: 'text', text: result });
      });    
       // console.log('res here ', res);
       // echo = { type: 'text', text: 'reply by file1 ' + res };
       // console.log('echo here ',echo)
        /*transporter.sendMail(mailOptions, function (err, info) {
          if(err)
            console.log(err)
          else
            console.log(info);
        });*/

      }else if(req_message === 'myQ'){
        echo = { type: 'text', text: 'reply by file '+myQue.getMyQue(event) };
      }else if(req_message === 'setQ'){
        echo = { type: 'text', text: 'reply by file '+setQue.setQue(event) };
      }else{
          echo = { type: 'text', text: 'ขออภัยคุณไม่มีสิทธิ์ใช้งานในส่วนนี้นะครับ'};
      }
    }
  
  console.log('outside',echo);
  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

async function Booking(data,userId, callback){
  con.query("SELECT * FROM changeinfo where changeNo='"+data+"';", function (err, result, fields) {
    if(result){
      console.log('in result')
        con.query("INSERT INTO capdata (id,changeNo,status,reqdate,lineid,queue,capdate) VALUES ('','"+data+"','1','','"+userId+",'','')", function (err, result2,fields) {
        if(err){
          console.log('err in insert')
        }
      });
      
    }
    console.log('result in booking', result[0])
    return callback(result[0]);

  });
}


async function checkQueNow(event, callback){
  con.query("SELECT queue+1 as queue FROM capdata WHERE capdate = CURRENT_DATE and status = '4' order by queue desc limit 1", function (err, result, fields) {
    //console.log('------->>>>>result checkQueNow', result);
   // console.log('--->>>>---->>>>>result checkQueNow', result[0].queue);
    var length = Object.keys(result).length;
          console.log(   length   );
    if(length == 0){
        return callback('ตอนนี้ยังไม่ถึงเวลา CAP จ้า');
    }
   // console.log('result checkQueNow', result[0].queue)
    return callback('ตอนนี้ถึง queue ที่ '+result[0].queue+' จ้า');

  });
}



async function listCapUpd(event, callback){
   var sql = 'SELECT changeNo,id FROM capdata where status = 1 and capdate = current_date+1 order by queue limit 4';
   var content = [];
   var msg ;
   con.query(sql, function (err, result, fields) {
    var length = Object.keys(result).length;
        console.log("<<<<<<<<<<<<<<<<<<length="+length);
        for (var i = 0; i < length; i++) 
        {
              var changeNO = result[i].changeNo;
               var change_id = result[i].id;
              content.push({ 
                  "type": "postback",
                  "label": changeNO,
                  "data": "action=upd&id="+change_id
              });              

        } 
              
        

     
      
   // console.log('result checkQueNow', result[0].queue)
    return callback(content);
   });
  
}


async function listChange(event, callback){
   var sql = 'SELECT changeNo FROM capdata where status = 1 and queue = 0';
   var content = [];
   var msg ;
   con.query(sql, function (err, result, fields) {
    var length = Object.keys(result).length;
        console.log("<<<<<<<<<<<<<<<<<<length="+length);
        for (var i = 0; i < length; i++) 
        {
              var changeNO = result[i].changeNo;
              content.push({ 
                  "type": "postback",
                  "label": changeNO,
                  "data": "action=approve&id=2"
              });              

        } 
         content.push({ 
            "type": "postback",
            "label": "Confirm",
            "data": "confirm"        
        });         
      

     
      
   // console.log('result checkQueNow', result[0].queue)
    return callback(content);
   });
  
}
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
