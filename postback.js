module.exports = {
   handle_postback: function(event) {
        console.log("handle_postback"+event);
   		var data = event.postback.data;   
        var action  =  data.queryKey['action'];
        if(action == 'approve'){
            var id  =  data.queryKey['id'];            
        }
        msg =  { type: 'text', text: 'test handle_postback : '+action };
        return msg;
        //data: 'action=approve&id=3'
        //var q = uri.queryKey['q'];
   }

}