module.exports = {

  
  getQue: function(event,con) {
     //return 'file usrReqQue ';
     var x;
     return con.connect( function(err) {
        if (err) throw err;
         let result = con.query("SELECT queue FROM `capdata` WHERE status = 2 order by queue desc limit 1", function (err, result, fields) {
          if (err) throw err; 
          console.log(result); 
          console.log(result[0].queue);
          return result[0].queue;
         // x= result[0].queue;
        });
        console.log('should be result here', result);
      });
      
     
   }

  
}