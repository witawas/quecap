module.exports = {
   listQueReq: function(event) {
   		msg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Change List",
                "actions": [{
                    "type": "postback",
                    "label": "CR 1",
                    "data": "action=approve&cr=1"
                }, {
                    "type": "postback",
                    "label": "CR 2",
                    "data": "action=approve&cr=2"
                }, {
                    "type": "postback",
                    "label": "CR 2",
                    "data": "action=approve&cr=3"
                }]
            }
        }
    
     	return msg;
   }
}