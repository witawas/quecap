module.exports = {
   handle_postback: function(event,con) {
        //Update queue,cap date where capdate and queue is null and status = 1
        //var sql = "select capdata.id from capdata inner join changeinfo on capdata.changeNo = changeinfo.changeNo where capdata.status = '1' order by changeinfo.deploydate,capdata.reqdate";
        

        msg =  { type: 'text', text: 'send notification success!! '};
        //return msg;
        //data: 'action=approve&id=3'
        //var q = uri.queryKey['q'];

        return msg;
   }

}