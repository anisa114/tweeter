/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function

 */


 //Preventing XSS with Escaping
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

//Creates tweet and returns HTML
function createTweetElement(tweet){

  return `<article class=\"tweet\">\
         <header><div class=\"avatar\"><img src="${tweet.user.avatars.regular}"></div>\
       <h2>${tweet.user.name}</h2>\
       <span>${tweet.user.handle}</span>\
     </header>\
     <p class=\"ml-6\">${escape(tweet.content.text)}</p>\
     <hr>\
     <footer class=\"ml-6\">\
     ${tweet.created_at}\
       <div class=\"actions\">\
         <i class=\"fas fa-heart\"></i>\
         <i class=\"fas fa-retweet\"></i>\
         <i class=\"fas fa-flag\"></i>\
       </div>\
     </footer>\
   </article>`;
 }
   
 //Renders tweets
 function renderTweets(tweetObjects){
    $(".tweets-container").empty();
    for(var i = tweetObjects.length-1; i >= 0;  i--){
      var $tweet = createTweetElement(tweetObjects[i]);
         $(".tweets-container").append($tweet); 
    }
 }


//AJAX GET REQUEST: renders all the tweets from the /tweets url
function loadTweets() {
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
  .done((response) => {
    console.log(response);
    renderTweets(response);
  })
  .fail(() => {
    console.err('The call failed')
  });
}


$(document).ready(function() {
  loadTweets();

  //AJAX POST REQUEST: posts the form data in the /tweets.
  // this is the selector of the form
  $(".new-tweet form").submit(function(event) {
    event.preventDefault(); // avoid to execute the actual submit of the form.
    var form = $(this);
    var formBody= $("textarea", form).val();
    if(!formBody){
      $(".error").addClass("select").text("Error: Field is empty");

    } else if (formBody.length > 140){
       $(".error").addClass("select").text("Error: Maximum character count");

    } else {
      $(".error").removeClass("select");

      var url = form.attr('action');
      $.ajax({
        type: "POST",
        url: url,
        data: form.serialize(), // serializes the form's elements.
        success: function(){ 
          loadTweets();
        }
      });
    }
  });
});