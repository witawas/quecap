module.exports = {
   listQueReq: function(event) {
   		msg = {
            "type": "template",
            "altText": "this is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Menu",
                "text": "Please select",
                "actions": [{
                    "type": "postback",
                    "label": "Buy",
                    "data": "action=buy&itemid=123"
                }, {
                    "type": "postback",
                    "label": "Add to cart",
                    "data": "action=add&itemid=123"
                }, {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                }]
            }
        }
     	return msg;
   }
}