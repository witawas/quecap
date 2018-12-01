module.exports = {
   handle_postback: function(event,con) {
        //Update queue,cap date where capdate and queue is null and status = 1
        var sql = "select capdata.id as id from capdata inner join changeinfo on capdata.changeNo = changeinfo.changeNo where capdata.status = '1' order by changeinfo.deploydate,capdata.reqdate";
        var msg;
        con.query(sql, function (err, result, fields) 
        {
          if (err) throw err;
          var test = result;
          var length = Object.keys(result).length;
          console.log(   length   );

          for (var i = 0; i < length; i++) 
          {
                var query_udpate = "update capdata set capdate = ( select changeinfo.deploydate-1 from changeinfo where changeinfo.changeNo = capdata.changeNo),queue = "+(i+1)+" where capdata.id = "+result[i].id;
                con.query(query_udpate, function (err, result) {
                    if (err) throw err;
                    
                });
               
          };
          msg =  { type: 'text', text: 'send notification success!! '};
          return msg;
        });
       
   }

}