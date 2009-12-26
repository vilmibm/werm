google.load("jquery", "1.3.2");
google.load("jqueryui", "1.7.2");

var title = "werm";

document.title = title;

var ENTER = 13;
var PROMPT_STR = "$: ";
var CL;
var command;
var output;
var history; // XXX store commands in array for up/down arrow

var funcs = new Array();

funcs["hello"] = function () { return "hello world!"; };

google.setOnLoadCallback(function() {
    $("span.prompt").prepend(PROMPT_STR);
    CL = $("input.prompt");
    CL.keypress(run_command);
    CL.focus();
});

function run_command(e) {
    if ( e.which != ENTER ) { return; }
    command = CL.attr("value");
    // first try JS func
    if ( funcs[command] == undefined ) {
        output = "command not found";
    } else {
        output = funcs[command]();
    }
    CL.attr("value",'');
    $("span.prompt").before("<div>"+PROMPT_STR+command+"</div>");
    $("span.prompt").before("<div>"+output+"</div>");
}



