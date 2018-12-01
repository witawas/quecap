module.exports = {
   handle_postback: function(event) {
        console.log("handle_postback"+event);
   		var data = event.postback.data;   
        var req = str.split("&");

        var req_action = req[0];
        req_action = req_action.split("=");
        req_action = req_action[0]


        var action  =  data.queryKey['action'];
        if(action == 'approve'){
                   
        }
        msg =  { type: 'text', text: 'test handle_postback : '+action };
        return msg;
        //data: 'action=approve&id=3'
        //var q = uri.queryKey['q'];
   }

}