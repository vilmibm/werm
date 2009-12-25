google.load("jquery", "1.3.2");
google.load("jqueryui", "1.7.2");

var title = "werm";

document.title = title;

var ENTER = 13;
var CL;
var command;
var output;

function hello() {
    return "hello world!";
};

google.setOnLoadCallback(function() {
    CL = $("input.prompt");
    CL.keypress(function(e) {
        if ( e.which != ENTER ) { return; }
        command = CL.attr("value");
        // first try JS func
        output = eval(command + "()");
        if ( !output ) {
            output = "Command not found."; // XXX this doesn't work
        }
        CL.attr("value",'');
        $("span.prompt").before("<div>"+command+"</div>");
        $("span.prompt").before("<div>"+output+"</div>");
    });
    CL.focus();
});



