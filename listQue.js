module.exports = {
   listQueReq: function(event) {
   		msg = {
            "type": "template",
            "altText": "Change List",
            "template": {
                "type": "carousel",
                "columns": [
                    {
                        "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                        "title": "CR 1",
                        "text": "เพิ่ม Disk",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Confirm",
                                "data": "action=confirm&cr=1"
                            },
                            {
                                "type": "postback",
                                "label": "Approved",
                               "data": "action=approved&cr=1"
                            },
                            {
                                "type": "postback",
                                "label": "Done",
                                "data": "action=done&cr=1"
                            }
                        ]
                    },
                    {
                        "thumbnailImageUrl": "https://www.thesun.co.uk/wp-content/uploads/2017/03/fifa-17-2.jpg?strip=all&w=742&quality=100",
                        "title": "CR 2",
                        "text": "เพิ่ม Disk",
                        "actions": [
                            {
                                "type": "postback",
                                "label": "Confirm",
                                "data": "action=confirm&cr=2"
                            },
                            {
                                "type": "postback",
                                "label": "Approved",
                               "data": "action=approved&cr=2"
                            },
                            {
                                "type": "postback",
                                "label": "Done",
                                "data": "action=done&cr=2"
                            }
                        ]
                    }
                ]
            }
        }
    
     	return msg;
   }
}