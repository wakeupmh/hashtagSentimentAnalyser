const Twitter = require('twit');
const config = require('./config');
const sentiment = require('multilang-sentiment')
const tClient = new Twitter(config);
 
tClient.get('account/verify_credentials', { skip_status: true })
  .catch(function (err) {
    console.log('caught error', err.stack)
  })
  .then(function (result) {
    // console.log('data', result.data);
  })

  tClient.get(`https://api.twitter.com/1.1/trends/place.json?id=455827`).then(result=>{
    console.log(result.data[0].trends);
  });

  const stream = tClient.stream('statuses/filter', { track: '#RatoMoroTaMelindrado', language: 'pt' })
 
  stream.on('tweet', function (tweet) {
    let user = tweet.user;
    console.log('  hastag pesquisada: #RatoMoroTaMelindrado\n\n');
    console.log(`  ${user.name}<@${user.screen_name}, followers:${user.followers_count}, location:${user.location}>: ${tweet.text}\n`);
    let tweetSentiment = sentiment(tweet.text, 'pt');
    // console.dir(tweetSentiment);
    if(tweetSentiment.score < 0)
      console.log(`  A impressão desse tweet é positiva frente a hashtag\n\n`);
    else if(tweetSentiment.score > 0)
      console.log(  `A impressão desse tweet é negativa frente a hashtag\n\n`);
    console.log('_________________________________________________________________________\n\n');
    
  })