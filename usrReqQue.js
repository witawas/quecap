module.exports = {

  
  getQue: function(event,con,cb) {
     //return 'file usrReqQue ';
     var x;
     return con.connect( function(err,callback) {
        if (err) throw err;
         con.query("SELECT queue FROM `capdata` WHERE status = 2 order by queue desc limit 1", function (err, result, fields) {
          //if (err) throw err; 
          //console.log(result); 
          //console.log(result[0].queue);
          //return result[0].queue;
          if (err) 
              callback(err,null);
          else
              callback(null,result[0].queue);
         // x= result[0].queue;
        });
       /// console.log('should be result here', result);
      });
      
     
   }

  
}