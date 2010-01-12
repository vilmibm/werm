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
funcs["prompt_str"] = function (args) {
    if ( args.length < 1 ) { return "Must supply a string"; }
    PROMPT_STR = args.shift();
    $("span.prompt").text(PROMPT_STR);
    return "1";
}

funcs["hello"] = function (args) { return "hello world!"; };
funcs["echo"]  = function (args) { return args.join(' '); };
funcs["img"]   = function (args) {
    if (args.length < 1) { return; }
    return '<img src="'+args.shift()+'" />';
}
// XXX add support for nested operations
funcs["math"]   = function (args) {
    var op = args.shift();
    var l  = new Number(args.shift());
    var r  = new Number(args.shift());

    var ops = new Array();
    ops['+'] = function (l,r) { return l + r };
    ops['-'] = function (l,r) { return l - r };
    ops['*'] = function (l,r) { return l * r };
    ops['/'] = function (l,r) { return l / r };

    if ( ! ops[op] ) { return "Allowed operators: +, -, *, /"; }

    return ops[op](l,r);
}

google.setOnLoadCallback(function() {
    werm_load_lib('wermstd.js');
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
    $("span.prompt").before('<div class="old">'+PROMPT_STR+command+" "+args.join(' ')+"</div>");
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

function werm_load_lib() {
    // XXX use jQuery to load specified lib file
}
