module.exports = {
   listQueReq: function(event) {
   		msg = {
            "type": "template",
            "altText": "Change List",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Change List",
                "text": "List All",
                "actions": [{
                    "type": "postback",
                    "label": "CR1",
                    "data": "action=approve&id=1"
                }, {
                    "type": "postback",
                    "label": "CR2",
                    "data": "action=approve&id=2"
                }, {
                    "type": "postback",
                    "label": "CR2",
                    "data": "action=approve&id=3"
                }]
            }
        }
     	return msg;
   }
}