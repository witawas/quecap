module.exports = {
   listCapUpd: function(event) {
   		msg = {
            "type": "template",
            "altText": "Cap update List",
            "template": {
                "type": "buttons",
               // "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                "title": "Cap update List",
                "text": "Please select change after complete",
                "actions": [{
                    "type": "postback",
                    "label": "CR 1",
                    "data": "action=upd&id=1"
                }, {
                    "type": "postback",
                    "label": "CR 2",
                    "data": "action=upd&id=2"
                }, {
                    "type": "postback",
                    "label": "CR 2",
                    "data": "action=upd&id=3"
                }]
            }
        }
     	return msg;
   }


}