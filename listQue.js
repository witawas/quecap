module.exports = {
    
   
   listQueReq: function(event) {
        var content = [];
        content.push({ 
            "type": "postback",
            "label": "CR 1",
            "data": "action=approve&id=2"
        });
        content.push({ 
            "type": "postback",
            "label": "CR 2",
            "data": "action=approve&id=2"
        });
        content.push({ 
            "type": "postback",
            "label": "CR 3",
            "data": "action=approve&id=2"
        });
        content.push({ 
            "type": "postback",
            "label": "CR 4",
            "data": "action=approve&id=2"
        });
   		
        msg = {
            "type": "template",
            "altText": "Change List",
            "template": {
                "type": "buttons",
                "title": "Change List",
                "text": "List All",
                "actions": content
            }
        }

        /*msg = {
            "type": "template",
            "altText": "Change List",
            "template": {
                "type": "buttons",
               // "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Change List",
                "text": "List All",
                "actions": [{
                    "type": "postback",
                    "label": "CR 1",
                    "data": "action=approve&id=1"
                }, {
                    "type": "postback",
                    "label": "CR 2",
                    "data": "action=approve&id=2"
                }, {
                    "type": "postback",
                    "label": "CR 2",
                    "data": "action=approve&id=3"
                }, {
                    "type": "postback",
                    "label": "Confirm",
                    "data": "confirm"
                }]
            }
        }*/

     	return msg;
   }


}