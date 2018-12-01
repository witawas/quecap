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

            //console.log(result[i].id);
                msg =  { type: 'text', text: 'send notification success!! : '+result[i].id};
                return msg;
          };

        });












        msg =  { type: 'text', text: 'send notification success!! '};
        
        return msg;
   }

}