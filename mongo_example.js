"use strict"

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
      console.error(`Failed to connect: ${MONGODB_URI}`);
      throw err;
    }
    function getTweets(callback) {
        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) {
            return callback(err);
          }
          callback(null, tweets);
        });
      }
    
      // ==> Later it can be invoked. Remember even if you pass
      //     `getTweets` to another scope, it still has closure over
      //     `db`, so it will still work. Yay!
    
      getTweets((err, tweets) => {
        if (err) throw err;
    
        console.log("Logging each tweet:");
        for (let tweet of tweets) {
          console.log(tweet);
        }
    
        db.close();
      });
});