var twitter = require('twitter')
  , env = require('./env.js')
  , fs = require('fs')
  , mongojs = require('mongojs')

var db = mongojs.connect('tweets', ['talkpay'])

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
