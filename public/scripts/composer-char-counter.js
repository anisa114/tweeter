$(document).ready(function() {
    
    //Toggle Form and Autofocus Textarea
    $( "#nav-bar .compose" ).click(function() {
        $(".new-tweet").slideToggle("fast");
        $(".new-tweet #pseudo-textarea").focus();
    });


    $(".new-tweet #pseudo-textarea").keyup(function() {
        let $elm = $(this);
        let text = $elm.text();
        let textCount = 140 - $elm.text().length;
        
        //value on hidden input
        $elm.siblings("input").val($elm.text());
        updateCounterColor($elm, textCount);

        
        if(textCount < 0) {
            let extra = text.substring(140)
            textWithNoExtra = text.substring(0, 140)
        
            //renders text without extra characters from childNode
            $elm.contents().get(0).nodeValue = textWithNoExtra


            // render extra
            //if element does not exist
            if(!$('.extra').length){
                $elm.append('<em class="extra"></em>');
            }
            //Empty element and add text to it 
            $(".extra").empty();
            $(".extra").text(extra);
            let element = document.getElementById('pseudo-textarea')
            placeCaretAtEnd(element)
        }
    });
});


//Function that returns cursor to the end of string 
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