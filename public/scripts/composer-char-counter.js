
$(document).ready(function() {
    //Toggle Form and Autofocus Textarea
    $( "#nav-bar .compose" ).click(function() {
        $( ".new-tweet" ).slideToggle("fast");
        $("textarea").focus();
    });


    $(".new-tweet textarea").keyup(function() {
        let $elm = $(this);
        let textCount = 140 - $elm.val().length;
        updateCounterColor($elm, textCount);
    });
});

//Function that updates counter color 
function updateCounterColor(elm, count){
    elm.siblings('.counter').text(count);
    if(count < 0){
        elm.siblings('.counter').css('color', 'red');
    }
    else {
        elm.siblings('.counter').css('color', '#244751');
    }
}