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


        var query_udpate = "update capdata set status = '7'  where capdata.id = "+event.postback.data.replace('action=upd&id=','');
                con.query(query_udpate, function (err, result1) {
                    if (err) throw err;
                    
                });


       // var sql = "select capdata.id as id from capdata inner join changeinfo on capdata.changeNo = changeinfo.changeNo where capdata.status = '1' order by changeinfo.deploydate,capdata.reqdate";
        var sql = "SELECT email from changeinfo where changeno = ( "
                +" select changeno from capdata where capdate = CURRENT_DATE and queue = ("
                +" select queue+2 from capdata where capdate = CURRENT_DATE and status = '4' order by queue desc limit 1))";
        //var msg;
        con.query(sql, function (err, result, fields) 
        {
          if (err) throw err;
         

                var mailOptions1 = {
                  from: 'wittawas12t@gmail.com',                // sender
                  to: result[0].email,                // list of receivers
                  subject: 'ถึงเวลาที่จะต้องเข้า Cap ของวันที่ : '+result[0].capdate,              // Mail subject
                  html: '<b> ถึงเวลาเข้าห้อง CAP แล้วครับ</b>'   // HTML body
                };

                transporter1.sendMail(mailOptions1, function (err, info) {
                  if(err)
                    console.log(err)
                  else
                    console.log(info);
                });

                    
        });
       
   }



}