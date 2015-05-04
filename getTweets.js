var twitter = require('twitter')
  , fs = require('fs')
  , mongojs = require('mongojs')

var connectionString = process.env.MONGO_URL ? process.env.MONGO_URL +'/tweets' : 'tweets'
var collectionName = 'talkpay'

var db = mongojs.connect(connectionString, [collectionName])

// If undefined in our process
// (i.e. we aren't on an external server where we set these differently)
if(!process.env.CONSUMER_KEY) {
  var env = require('./env.js')
}

var client = new twitter({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token_key: process.env.ACCESS_TOKEN_KEY,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET
})

client.stream('statuses/filter', {track: '#talkpay'}, function(stream) {
    stream.on('data', function(tweet) {
      db.talkpay.insert(tweet)
    })

    stream.on('error', function(err) {
      console.log(err)
    })
})
