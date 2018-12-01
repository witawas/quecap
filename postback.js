module.exports = {
   handle_postback: function(event,con) {
        //Update queue,cap date where capdate and queue is null and status = 1
        //var sql = "select capdata.id from capdata inner join changeinfo on capdata.changeNo = changeinfo.changeNo where capdata.status = '1' order by changeinfo.deploydate,capdata.reqdate";
        var query_result;        

        setTimeout(function(){ 
          msg =  { type: 'text', text: 'send notification success!! :'+query_result};
          return msg;
        }, 3000);

        con.connect(function(err) {
            if (err) throw err;
            con.query("SELECT queue FROM `capdata` WHERE status = 2 order by queue desc limit 1", function (err, result, fields) {
              if (err) throw err;              
              query_result =  result.queue;
            });
          });
        

        //msg =  { type: 'text', text: 'send notification success!! '};
        //return msg;
        //data: 'action=approve&id=3'
        //var q = uri.queryKey['q'];
   }

}