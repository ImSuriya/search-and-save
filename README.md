# Scrape and Save

This project opens the Twitter API stream and saves each tweet into a
mongo database as the data comes in. N.B. this is not ALL tweets, but a
sample, as per the Twitter API.

The data in the database began collection on May 1 at 1:43pm, and ended
May 4 at 10am. It contains >26k records containing the #talkpay hashtag.

## Usage

This app was deployed to Digital Ocean using Dokku, a Docker-powered
Heroku-like interface. To run locally:

1. `npm install` dependencies
2. Update env.js.sample to contain your API information and remove the
   .sample ending
3. Ensure MongoDB is running on your computer
4. Run `node getTweets.js` to run the program
