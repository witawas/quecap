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
        var sql = "select capdata.id as id,changeinfo.email as email,capdata.changeNo as chanangeno,changeinfo.deploydate+1 as capdate from capdata inner join changeinfo on capdata.changeNo = changeinfo.changeNo where capdata.status = '1' order by changeinfo.deploydate,capdata.reqdate";
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