module.exports = {
  myCallback: function(err, data) {
    if (err) throw err; // Check for the error and throw if it exists.
    console.log('got data: '+data); // Otherwise proceed as usual.
    return data;
  } ,
  
  getQue: function(event,con) {
     //return 'file usrReqQue';
     var x;
     return con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT queue FROM `capdata` WHERE status = 2 order by queue desc limit 1", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          console.log(result[0].queue);
          return result[0].queue;
         // x= result[0].queue;
        });
      });
      
     
   }

  
}