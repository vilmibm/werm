google.load("jquery", "1.3.2");
google.load("jqueryui", "1.7.2");

var title = "werm";

document.title = title;

var ENTER = 13;
var UP    = 38;
var DOWN  = 40;
var PROMPT_STR = "$: ";
var hist = new Array(); // XXX store commands in array for up/down arrow
var funcs   = new Array();

var CL;
var command;
var output;

funcs["hello"] = function () { return "hello world!"; };

google.setOnLoadCallback(function() {
    //$("#str").prepend(PROMPT_STR);
    //CL = $("#box");
    //$("body").keypress(key_catcher);
    //CL.focus();
    $("span.prompt").prepend(PROMPT_STR);
    CL = $("input.prompt");
    CL.unbind();
    CL.keypress(run_command);
    CL.focus();
});

var hist_len;

function run_command(e) {
    if ( e.which != ENTER ) { return; }
    command = CL.attr("value"); // XXX split by space for func/args
    hist.push(command);
    // first try JS func
    if ( funcs[command] == undefined ) {
        output = "command not found";
    } else {
        output = funcs[command](); // XXX pass args
    }
    CL.attr("value",'');
    $("span.prompt").before("<div>"+PROMPT_STR+command+"</div>");
    $("span.prompt").before("<div>"+output+"</div>");
    $("#history").empty();
    
    var i = hist.length - 1;
    while (hist[i] != undefined && i > hist.length - 5) {
        $("#history").append('<a onclick="">'+hist[i] + '</a>&nbsp;');
        i--;
    }
}

function key_catcher(e) {
    if (e.which == 32 || (65 <= e.which && e.which <= 65 + 25)
                        || (97 <= e.which && e.which <= 97 + 25)) {
        var c = String.fromCharCode(e.which);
        $("#box").append(document.createTextNode(c));
    } 
    else if (e.which == 8) {
        $("#box").children(":last").remove();
    }
}

