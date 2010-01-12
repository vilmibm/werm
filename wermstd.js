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

funcs["tweet"] = function (args) {
    if ( args.length != 3 ) { return "Usage: tweet <usr> <pass> <message>"; }
    var user = args.shift();
    var pass = args.shift();
    var mess = args.shift();
    if ( mess.length > 140 ) { return "Message too long." }

    var url = 'http://twitter.com/statuses/update.xml'
//    curl = 'curl -s -u %s:%s -d status="%s" %s' % (user,password,message,url)
    $.ajax ({
        url:        url
        // XXX need base64 method beforeSend: function (xhr) { xhr.setRequestHeader('Authorization', 'Basic ' + encodeBase64 (username+':'+'password') ); },
        succes:     function(val) { alert(val); }
        // XXX complete
    });
};
