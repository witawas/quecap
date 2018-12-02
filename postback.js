const nodemailer = require('nodemailer');
module.exports = {
   handle_postback: function(event,con,transporter) {
        var transporter1 = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'wittawas12t@gmail.com', // your email
            pass: 'gmailJow11' // your email password
          }
        });

       // var sql = "select capdata.id as id from capdata inner join changeinfo on capdata.changeNo = changeinfo.changeNo where capdata.status = '1' order by changeinfo.deploydate,capdata.reqdate";
        var sql = "select capdata.id as id,changeinfo.email as email,capdata.changeNo as chanangeno,changeinfo.deploydate-1 as capdate from capdata inner join changeinfo on capdata.changeNo = changeinfo.changeNo where capdata.status = '1' order by changeinfo.deploydate,capdata.reqdate";
        //var msg;
        con.query(sql, function (err, result, fields) 
        {
          if (err) throw err;
          var test = result;
          var length = Object.keys(result).length;
          console.log(   length   );

          for (var i = 0; i < length; i++) 
          {
                var query_udpate = "update capdata set capdate = ( select changeinfo.deploydate-1 from changeinfo where changeinfo.changeNo = capdata.changeNo),queue = "+(i+1)+" where capdata.id = "+result[i].id;
                con.query(query_udpate, function (err, result1) {
                    if (err) throw err;
                    
                });

                var mailOptions1 = {
                  from: 'wittawas12t@gmail.com',                // sender
                  to: result[i].email,                // list of receivers
                  subject: 'Confirm Cap Date : '+result[i].capdate,              // Mail subject
                  html: '<b>Confirm Cap Date : '+result[i].capdate+'<br>'+'Queue No : '+i+'</b>'   // HTML body
                };

               // sendText('U068556ff89a20a3d3a2',mailOptions1.html);
                let data = {
                  to: 'U99372d31d3009c721049695f636424c0',
                  messages: [
                    {
                      type: 'text',
                      text: mailOptions1.html
                    }
                  ]
                }
                request({
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer U43M3KfnQlMydCvFi3N9eh0NtDoeMm3kVGPwHIAlz6q9STe0Ea9Fax3LxOcmtBJoPZk2pywFWE/O8iV9j0ah/6g16D6PUu0Z2aR0S+836KODrSv8VuOXWAUvOHtcX7DAwplRgm/LnTv3PVi6lxm8FgdB04t89/1O/w1cDnyilFU='
                  },
                  url: 'https://api.line.me/v2/bot/message/push',
                  method: 'POST',
                  body: data,
                  json: true
                }, function (err, res, body) {
                  if (err) console.log('error')
                  if (res) console.log('success')
                  if (body) console.log(body)
                })




                transporter1.sendMail(mailOptions1, function (err, info) {
                  if(err)
                    console.log(err)
                  else
                    console.log(info);
                });

          };           
        });
       
   }



}