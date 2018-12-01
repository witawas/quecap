module.exports = {

  
  getQue: async function(event,con) {
     //return 'file usrReqQue';
     var x;
     return await con.connect(function(err) {
        if (err) throw err;
        await con.query("SELECT queue FROM `capdata` WHERE status = 2 order by queue desc limit 1", await function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          console.log(result[0].queue);
          return result[0].queue;
         // x= result[0].queue;
        });
      });
      
     
   }

  
}