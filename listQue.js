module.exports = {
   listQueReq: function() {
   		msg = {
		  "type": "bubble",
		  "body": {
		    "type": "box",
		    "layout": "horizontal",
		    "contents": [
		      {
		        "type": "text",
		        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		        "wrap": true,
		        "color": "#ff0000",
		        "flex": 2
		      },
		      {
		        "type": "text",
		        "text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		        "wrap": true,
		        "color": "#0000ff",
		        "flex": 3
		      }
		    ]
		  }
		}
     	return msg;
   }
}