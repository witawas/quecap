module.exports = {
   getQue: function(event,con) {
     //return 'file usrReqQue';
     con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT queue FROM `capdata` WHERE status = 2 order by queue desc limit 1", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          console.log(result.queue);
          return result.queue;
        });
      });
      
   }
}