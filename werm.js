google.load("jquery", "1.3.2");
google.load("jqueryui", "1.7.2");

var werm_version = "0.1";

var title = "werm "+werm_version;

document.title = title;

var ENTER = 13;
var UP    = 38;
var DOWN  = 40;
var PROMPT_STR = "$: ";
var HIST_STR_DISP_SIZE = 10;
var hist  = new Array();

var CL;
var command;
var args;
var output;

var funcs = new Array();

google.setOnLoadCallback(function() {
    werm_load_lib('/werm/wermstd.js'); // load after jquery to provide jquery in lib
    $("span.prompt").text(PROMPT_STR);
    CL = $("input.prompt");
    CL.unbind();
    CL.keypress(run_command);
    CL.focus();
});

var hist_len;

function run_command(e) {
    if ( e.which != ENTER ) { return; }
    args = CL.attr("value").split(' '); // XXX become quote sensitive
    command = args.shift();
    hist.push(command+' '+args.join(' '));
    // first try JS func
    if ( funcs[command] == undefined ) {
        output = "command not found";
    } else {
        output = funcs[command](args);
    }
    CL.attr("value",'');
    $("span.prompt").before('<div class="old">'+PROMPT_STR+hist[hist.length-1]+"</div>");
    $("span.prompt").before('<div class="output">'+output+"</div>");
    $("#history").empty();
    
    var i = hist.length - 1;
    var hist_str;
    while (hist[i] != undefined && i > hist.length - 5) {
        hist_str = hist[i];
        if ( hist_str.length > HIST_STR_DISP_SIZE ) { hist_str = hist_str.substr(0,HIST_STR_DISP_SIZE)+"..."; }
        $("#history").append('<a onclick="">'+hist_str+'</a>&nbsp;');
        i--;
    }
}

function werm_load_lib(lib) {
    $("body").prepend('<script type="text/javascript" src="'+lib+'"></script>');
}
