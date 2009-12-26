google.load("jquery", "1.3.2");
google.load("jqueryui", "1.7.2");

var title = "werm";

document.title = title;

var ENTER = 13;
var UP    = 38;
var DOWN  = 40;
var PROMPT_STR = "$: ";
var history = new Array(); // XXX store commands in array for up/down arrow
var funcs   = new Array();

var CL;
var command;
var output;

funcs["hello"] = function () { return "hello world!"; };

google.setOnLoadCallback(function() {
    $("span.prompt").prepend(PROMPT_STR);
    CL = $("input.prompt");
    CL.unbind();
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



