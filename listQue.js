module.exports = {
   listQueReq: function(event) {
   		msg = {
            "type": "template",
            "altText": "Change List",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        "title": "List Change",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "CR 1",
                                "data": "action=approved&cr=1"
                            },
                            {
                                "type": "postback",
                                "label": "CR 2",
                               "data": "action=approved&cr=1"
                            },
                            {
                                "type": "postback",
                                "label": "CR 3",
                                "data": "action=approved&cr=1"
                            }
                        ]
                    }
                   
                ]
            }
        }
    
     	return msg;
   }
}