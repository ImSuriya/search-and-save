var twitter = require('twitter')
  , env = require('./env.js')
  , fs = require('fs')

var client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

client.get('search/tweets', {q: '#talkpay'}, function(error, tweets, response){
   console.log(tweets.statuses.length);
})

client.stream('statuses/filter', {track: '#talkpay'}, function(stream) {
    stream.on('data', function(tweet) {
      var retweet = false
      if(tweet.retweeted_status) {
        retweet = true
      }
      var text = [tweet.id,
                  tweet.text,
                  tweet.geo,
                  retweet].join('\t')
      text = text + '\n'
      console.log(text)
      fs.writeFile("data/tweets.csv", text, {encoding: 'utf8', flag: 'a+'}, function(error) {
        if (error) {
          console.error(error)
        }
      })
    })

    stream.on('error', function(err) {
      throw(err)
    })
})
