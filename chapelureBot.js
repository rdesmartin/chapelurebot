require('dotenv').config();

const twit = require('twit');

const config = {
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token: process.env.access_token,
	access_token_secret: process.env.access_token_secret
};

const Twitter = new twit(config);

let retweet = function() {
	let params = {
		q: 'chapelure',
		result_type: 'recent',
		lang: 'fr'
	}
	Twitter.get('search/tweets', params, function(err, data) {
		// if there is no error
		if (!err) {
			// loop through the first 4 returned tweets
			for (let i = 0; i < 4; i++) {
				// iterate through those first four defining a rtId that is equal to the value of each of those tweets' ids
				let rtId = data.statuses[i].id_str;
				// the post action
				Twitter.post('statuses/retweet/:id', {
					// setting the id equal to the rtId variable
					id: rtId
					// log response and log error
				}, function(err, response) {
					if (response) {
						console.log('Successfully retweeted');
					}
					if (err) {
						console.log(err);
					}
				});
			}
		}
		else {
			// catch all log if the search could not be executed
			console.log('Could not search tweets.');
		}
	});
}
retweet();
setInterval(retweet, 600000);
