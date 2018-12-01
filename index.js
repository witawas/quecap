'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const usrReqQue = require('./usrReqQue');
// const  = rerquie('./fiel')

// create LINE SDK config from env variables
const config = {
  channelAccessToken: 'U43M3KfnQlMydCvFi3N9eh0NtDoeMm3kVGPwHIAlz6q9STe0Ea9Fax3LxOcmtBJoPZk2pywFWE/O8iV9j0ah/6g16D6PUu0Z2aR0S+836KODrSv8VuOXWAUvOHtcX7DAwplRgm/LnTv3PVi6lxm8FgdB04t89/1O/w1cDnyilFU=',
  channelSecret: 'f6cf11d913e4a24648428a0179cec683'
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
  if (event.type !== 'message' || event.message.type !== 'text') {
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
  if (req_message === 'booking'){
	 echo = { type: 'text', text: 'booking' };
  }else if(req_message === 'listQ'){
	  echo = { type: 'text', text: 'listQ' };
  }else if(req_message === 'confirm'){
	  echo = { type: 'text', text: 'confirm' };
  }else if(req_message === 'q'){
	  usrReqQue.getQue();
  }else if(req_message === 'myQ'){
	  echo = { type: 'text', text: 'myQ' };
  }else if(req_message === 'setQ'){
	  echo = { type: 'text', text: 'setQ' };
  }else {
	  echo = { type: 'text', text: req_message };
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
