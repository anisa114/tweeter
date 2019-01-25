$(document).ready(function() {
    
    
    //Toggle Form and Autofocus Textarea
    $( "#nav-bar .compose" ).click(function() {
        $(".new-tweet").slideToggle("fast");
        $("textarea").focus();
    });


    $(".new-tweet #pseudo-textarea").keyup(function() {
        //console.log($(this))
        let $elm = $(this);
        let text = $elm.text();
        let textCount = 140 - $elm.text().length;
        
        //value on hidden input
        $elm.siblings("input").val($elm.text());
        updateCounterColor($elm, textCount);

        if(textCount < 0) {
            let extra = text.substring(140)
            let textWithNoExtra = text.substring(0, 140)
            console.log("Extra", extra)
            console.log("No extra", textWithNoExtra)

            //$elm.focus();
            $elm.contents().get(0).nodeValue = textWithNoExtra
            // render extra
            $(".extra").empty();
            $(".extra").text(extra);
            let element = document.getElementById('pseudo-textarea')
            console.log(element)
            placeCaretAtEnd(element)
        }



    });
});

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

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