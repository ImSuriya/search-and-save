var twitter = require('twitter')
  , env = require('./env.js')


var client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

client.stream('statuses/filter', {track: '#talkpay'}, function(stream) {
    stream.on('data', function(data) {
      console.log(data.text)
    })

    stream.on('error', function(err) {
      throw(err)
    })
})
