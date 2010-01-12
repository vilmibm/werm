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
