/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function

 */
  //Calculates time since
 //https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

 //Preventing XSS with Escaping
 function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
}

//Creates tweet and returns HTML
function createTweetElement(tweet){
  var $time = timeSince(tweet.created_at);
  return `<article class=\"tweet\">\
         <header><div class=\"avatar\"><img src="${tweet.user.avatars.regular}"></div>\
       <h2>${tweet.user.name}</h2>\
       <span>${tweet.user.handle}</span>\
     </header>\
     <p class=\"ml-6\">${escape(tweet.content.text)}</p>\
     <hr>\
     <footer class=\"ml-6\">\
     ${$time}\
       <div class=\"actions\">\
       <i id="${tweet._id}" onclick="handleClick(this)" class=\"fas fa-heart\"></i>\
         <i class=\"fas fa-retweet\"></i>\
         <i class=\"fas fa-flag\"></i>\
       </div>\
     </footer>\
   </article>`;
 }
   

  //Handles click on like icon
  function handleClick(element)  {
    let id = $(element).attr("id");
    if($(`#${id}`).text().length > 0 ){
         $(`#${id}`).text("");
        $(`#${id}`).removeClass("like_button");
    } else  {
        $(`#${id}`).text(" 1");
        $(`#${id}`).addClass("like_button");
    }
}

 //Renders tweets
 function renderTweets(tweetObjects){
    $(".tweets-container").empty();
    tweetObjects.forEach((tweetObject) => {
      var $tweet = createTweetElement(tweetObject);
      $(".tweets-container").prepend($tweet); 
    });
 }


//AJAX GET REQUEST: renders all the tweets from the /tweets url
function loadTweets() {
  $.ajax('http://localhost:8080/tweets', { method: 'GET' })
  .done((response) => {
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
          $("textarea").val(" ");
          $('.counter').text('140');
        }
      });
    }
  });
});