const crypto = require('crypto');

var spaces=false;
var results = [];
var args = process.argv;

function print_usage() {
    console.log("Usage: node main.js [OPTION]...");
    console.log("");
    console.log("   --help");
    console.log("       Print this help and exit.");
    console.log("");
    console.log("   --diceware <language>");
    console.log("       Default English.");
    console.log("       Choose a Diceware language. <language> must be one of:");
    console.log("           Beale, Catalan, Danish, Dutch, English, Esperanto,");
    console.log("           Finnish, French, German, Italian, Japanese, Maori,");
    console.log("           Norwegian, Polish, Spanish, Swedish, Turkish.");
    console.log("");
    console.log("   --eff <wordlist>");
    console.log("       Default Short.");
    console.log("       Choose an EFF wordlist. <wordlist> must be one of:");
    console.log("           Distant, Long, Short.");
    console.log("");
    console.log("   --alternate <wordlist>");
    console.log("       Default PGP.");
    console.log("       Choose an alternate wordlist. <wordlist> must be one of:");
    console.log("           Bitcoin, Elvish, Klingon, PGP, RockYou, Simpsons.");
    console.log("");
    console.log("   --ninja");
    console.log("       Choose Secret Ninja encoding.");
    console.log("");
    console.log("   --min-entropy <number>");
    console.log("       Default 70-bits.");
    console.log("       Set a minimum entropy requirement in bits.");
    process.exit();
}

String.prototype.rtrim = function() { return this.replace(/\s+$/g,""); }

function get_entropy() {
    if (args.indexOf("--min-entropy") != -1) return args[args.indexOf("--min-entropy") +1 ];
    else return 70;
}

function sec_rand(count) {
    // provided by `Sc00bz' at: https://www.reddit.com/r/crypto/comments/4xe21s/
    var skip = 0x7fffffff - 0x7fffffff % count;
    var result;
    var rand;
    if (((count - 1) & count) === 0) {
        rand = parseInt(crypto.randomBytes(2).toString('hex'), 16);
        return rand & (count - 1);
    }
    do {
        rand = parseInt(crypto.randomBytes(2).toString('hex'), 16);
        result = rand & 0x7fffffff;
    } while (result >= skip);
    return result % count;
}

function generate_pass(len, set, spaces) {
    var pass = "";
    if (typeof set == "string") var pass_arr = set.split("");
    else pass_arr = set;
    for(i=len; i--;) {
        if (spaces) {
            pass += pass_arr[sec_rand(set.length)];
            pass += " ";
        }
        else pass += pass_arr[sec_rand(set.length)];
    }
    return pass.rtrim();
}

function generate_diceware() {
    if (args.indexOf("--diceware") != -1) {
        var lang = args[args.indexOf("--diceware") + 1];
    }
    else var lang = "English";

    var wordlist = [];
    switch(lang) {
        case "Beale":
        case "beale":
            const beale_wordlist = require('./lists/beale');
            wordlist = beale_wordlist.wordlist;
            break;
        case "Catalan":
        case "catalan":
            const catalan_wordlist = require('./lists/catalan');
            wordlist = catalan_wordlist.wordlist;
            break;
        case "Danish":
        case "danish":
            const danish_wordlist = require('./lists/danish');
            wordlist = danish_wordlist.wordlist;
            break;
        case "Dutch":
        case "dutch":
            const dutch_wordlist = require('./lists/dutch');
            wordlist = dutch_wordlist.wordlist;
            break;
        case "English":
        case "english":
            const english_wordlist = require('./lists/english');
            wordlist = english_wordlist.wordlist;
            break;
        case "Esperanto":
        case "esperanto":
            const esperanto_wordlist = require('./lists/esperanto');
            wordlist = esperanto_wordlist.wordlist;
            break;
        case "Finnish":
        case "finnish":
            const finnish_wordlist = require('./lists/finnish');
            wordlist = finnish_wordlist.wordlist;
            break;
        case "French":
        case "french":
            const french_wordlist = require('./lists/french');
            wordlist = french_wordlist.wordlist;
            break;
        case "German":
        case "german":
            const german_wordlist = require('./lists/german');
            wordlist = german_wordlist.wordlist;
            break;
        case "Italian":
        case "italian":
            const italian_wordlist = require('./lists/italian');
            wordlist = italian_wordlist.wordlist;
            break;
        case "Japanese":
        case "japanese":
            const japanese_wordlist = require('./lists/japanese');
            wordlist = japanese_wordlist.wordlist;
            break;
        case "Maori":
        case "maori":
            const maori_wordlist = require('./lists/maori');
            wordlist = maori_wordlist.wordlist;
            break;
        case "Norwegian":
        case "norwegian":
            const norwegian_wordlist = require('./lists/norwegian');
            wordlist = norwegian_wordlist.wordlist;
            break;
        case "Polish":
        case "polish":
            const polish_wordlist = require('./lists/polish');
            wordlist = polish_wordlist.wordlist;
            break;
        case "Spanish":
        case "spanish":
            const spanish_wordlist = require('./lists/spanish');
            wordlist = spanish_wordlist.wordlist;
            break;
        case "Swedish":
        case "swedish":
            const swedish_wordlist = require('./lists/swedish');
            wordlist = swedish_wordlist.wordlist;
            break;
        case "Turkish":
        case "turkish":
            const turkish_wordlist = require('./lists/turkish');
            wordlist = turkish_wordlist.wordlist;
            break;
        default:
            console.log("Unknown language: " + lang);
            process.exit(1);
    }

    var assoc_arr = {};
    var entropy = get_entropy();
    var len = Math.ceil(entropy/Math.log2(wordlist.length));
    var pass = generate_pass(len, wordlist, true);
    assoc_arr["Generator"] = "Diceware";
    assoc_arr["Wordlist"] = lang;
    assoc_arr["Password"] = pass;
    assoc_arr["Characters"] = pass.replace(/\s/g, '').length;
    assoc_arr["Entropy"] = Math.floor(len * Math.log2(wordlist.length));
    return assoc_arr;
}


function generate_eff() {
    if (args.indexOf("--eff") != -1) {
        var eff_set = args[args.indexOf("--eff") + 1];
    }
    else var eff_set = "Short";

    var wordlist = [];
    switch(eff_set) {
        case "Distant":
        case "distant":
            const eff_distant = require('./lists/eff_distant');
            wordlist = eff_distant.eff_distant;
            break;
        case "Long":
        case "long":
            const eff_long = require('./lists/eff_long');
            wordlist = eff_long.eff_long;
            break;
        case "Short":
        case "short":
            const eff_short = require('./lists/eff_short');
            wordlist = eff_short.eff_short;
            break;
        default:
            console.log("Unknown wordlist: " + eff_set);
            process.exit();
    }
    var assoc_arr = {};
    var entropy = get_entropy();
    var len = Math.ceil(entropy/Math.log2(wordlist.length));
    var pass = generate_pass(len, wordlist, true);
    assoc_arr["Generator"] = "EFF";
    assoc_arr["Wordlist"] = eff_set;
    assoc_arr["Password"] = pass;
    assoc_arr["Characters"] = pass.replace(/\s/g, '').length;
    assoc_arr["Entropy"] = Math.floor(len * Math.log2(wordlist.length));
    return assoc_arr;
}

function generate_alternate() {
    if (args.indexOf("--alternate") != -1) {
        var alt_set = args[args.indexOf("--alternate") + 1];
    }
    else var alt_set = "PGP";

    var wordlist = [];
    switch(alt_set) {
        case "Bitcoin":
        case "bitcoin":
            const bitcoin_wordlist = require('./lists/bitcoin');
            wordlist = bitcoin_wordlist.wordlist;
            break;
        case "Elvish":
        case "elvish":
            const elvish_wordlist = require('./lists/elvish');
            wordlist = elvish_wordlist.wordlist;
            break;
        case "Klingon":
        case "klingon":
            const klingon_wordlist = require('./lists/klingon');
            wordlist = klingon_wordlist.wordlist;
            break;
        case "PGP":
        case "Pgp":
        case "pgp":
            const pgp_wordlist = require('./lists/pgp');
            wordlist = pgp_wordlist.wordlist;
            break;
        case "Rockyou":
        case "RockYou":
        case "rockyou":
            const rockyou_wordlist = require('./lists/rockyou');
            wordlist = rockyou_wordlist.wordlist;
            break;
        case "Simpsons":
        case "simpsons":
            const simpsons_wordlist = require('./lists/simpsons');
            wordlist = simpsons_wordlist.wordlist;
            break;
        default:
            console.log("Unknown wordlist: " + alt_set);
            process.exit(1);
    }

    var assoc_arr = {};
    var entropy = get_entropy();
    var len = Math.ceil(entropy/Math.log2(wordlist.length));
    var pass = generate_pass(len, wordlist, true);
    assoc_arr["Generator"] = "Alternate";
    assoc_arr["Wordlist"] = alt_set;
    assoc_arr["Password"] = pass;
    assoc_arr["Characters"] = pass.replace(/\s/g, '').length;
    assoc_arr["Entropy"] = Math.floor(len * Math.log2(wordlist.length));
    return assoc_arr;
}

function generate_ninja() {
    var ninja = ['ka','zu','mi','te','ku','lu','ji','ri','ki','zu','me','ta','rin','to','mo','no','ke','shi','ari','chi','do','ru','mei','na','fu','zi'];
    var entropy = get_entropy();
    var len = Math.ceil(entropy/Math.log2(ninja.length));
    var pass = "";
    
    for (i=0; i<len; i++) {
        pass += ninja[sec_rand(len)];
        if (i%3 == 2 && i!=len-1) pass += "-";
    }
    return [pass, ninja.length, Math.floor(len*Math.log2(ninja.length))];
}

function generate_babble() {
    var pass = [];
    var vowels = "aeiouy";
    var consonants = "bcdfghklmnprstvzx";
    var entropy = get_entropy();
    var v_ent = Math.log2(vowels.length);
    var c_ent = Math.log2(consonants.length);
    var out_ent = (2*c_ent)+(2*v_ent);
    var in_ent = (3*c_ent)+(2*v_ent);

    entropy = entropy - (2*out_ent);

    var len = Math.ceil(entropy/in_ent);
    var tot_ent = out_ent + (len*in_ent) + out_ent;

    for (var i=0; i<len+2; i++) {
        for (var j=0; j<5; j++) {
            if (j % 2 == 0) pass[(5*i)+j] = generate_pass(1, consonants);
            else pass[(5*i)+j] = generate_pass(1, vowels);
        }
    }

    pass[0] = "x";
    pass[pass.length-1] = "x";

    for (var i=pass.length; i>0; i-=5) pass.splice(i, 0, "-");
    pass.pop() // strip last "-"
    return [pass.join(""), (len+2)*5, Math.floor(tot_ent)];
}

function generate_pseudowords() {
    if (args.indexOf("--ninja") != -1) var pw_type = "Secret Ninja"
    else var pw_type = "Bubble Babble";

    if (pw_type == "Secret Ninja") var ret = generate_ninja();
    else var ret = generate_babble();
    var assoc_arr = {};
    var pass = ret[0];
    var len = ret[1];
    var ent = ret[2];
    assoc_arr["Generator"] = "Pseudowords";
    assoc_arr["Wordlist"] = pw_type;
    assoc_arr["Password"] = pass;
    assoc_arr["Characters"] = len;
    assoc_arr["Entropy"] = ent;
    return assoc_arr;
}


function generate_base94() {
    var assoc_arr = {};
    var s = '';
    var entropy = get_entropy();
    for (i=0; i<94; i++) s += String.fromCharCode(33+i);
    var len = Math.ceil(entropy/Math.log2(s.length));
    var pass = generate_pass(len, s);
    assoc_arr["Generator"] = "Base94";
    assoc_arr["Wordlist"] = null;
    assoc_arr["Password"] = pass;
    assoc_arr["Characters"] = len;
    assoc_arr["Entropy"] = Math.floor(len * Math.log2(s.length));
    return assoc_arr;
}

function generate_base64() {
    var assoc_arr = {};
    var entropy = get_entropy();
    var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/";
    var len = Math.ceil(entropy/Math.log2(s.length));
    var pass = generate_pass(len, s);
    assoc_arr["Generator"] = "Base64";
    assoc_arr["Wordlist"] = null;
    assoc_arr["Password"] = pass;
    assoc_arr["Characters"] = len;
    assoc_arr["Entropy"] = Math.floor(len * Math.log2(s.length));
    return assoc_arr;
}

function generate_base32() {
    var assoc_arr = {};
    var entropy = get_entropy();
    var s = "0123456789abcdefghjkmnpqrstvwxyz";
    var len = Math.ceil(entropy/Math.log2(s.length));
    var pass = generate_pass(len, s);
    var result = "Base32: '" + pass + "', ";
    assoc_arr["Generator"] = "Base32";
    assoc_arr["Wordlist"] = null;
    assoc_arr["Password"] = pass;
    assoc_arr["Characters"] = len;
    assoc_arr["Entropy"] = Math.floor(len * Math.log2(s.length));
    return assoc_arr;
}

function generate_base16() {
    var assoc_arr = {};
    var entropy = get_entropy();
    var s = "0123456789abcdef"
    var len = Math.ceil(entropy/Math.log2(s.length));
    var pass = generate_pass(len, s);
    var result = "Base16: '" + pass + "', ";
    assoc_arr["Generator"] = "Base16";
    assoc_arr["Wordlist"] = null;
    assoc_arr["Password"] = pass;
    assoc_arr["Characters"] = len;
    assoc_arr["Entropy"] = Math.floor(len * Math.log2(s.length));
    return assoc_arr;
}

function generate_base10() {
    var assoc_arr = {};
    var entropy = get_entropy();
    var s = "0123456789"
    var len = Math.ceil(entropy/Math.log2(s.length));
    var pass = generate_pass(len, s);
    var result = "Base10: '" + pass + "', ";
    assoc_arr["Generator"] = "Base10";
    assoc_arr["Wordlist"] = null;
    assoc_arr["Password"] = pass;
    assoc_arr["Characters"] = len;
    assoc_arr["Entropy"] = Math.floor(len * Math.log2(s.length));
    return assoc_arr;
}

if (args.indexOf("--help") != -1) print_usage();

if (args.indexOf("--only") != -1) {
    switch(args[args.indexOf("--only")+1]) {
        case "Diceware":
        case "diceware":
            results.push(generate_diceware());
            break;
        case "EFF":
        case "Eff":
        case "eff":
            results.push(generate_eff());
            break;
        case "Alternate":
        case "alternate":
            results.push(generate_alternate());
            break;
        case "Pseudowords":
        case "pseudowords":
        case "Pseudoword":
        case "pseudoword":
        case "Pseudo":
        case "pseudo":
            results.push(generate_pseudowords());
            break;
        case "Base94":
        case "base94":
        case "Base-94":
        case "base-94":
            results.push(generate_base94());
            break;
        case "Base64":
        case "base64":
        case "Base-64":
        case "base-64":
            results.push(generate_base64());
            break;
        case "Base32":
        case "base32":
        case "Base-32":
        case "base-32":
            results.push(generate_base32());
            break;
        case "Base16":
        case "base16":
        case "Base-16":
        case "base-16":
        case "Hexadecimal":
        case "hexadecimal":
            results.push(generate_base16());
            break;
        case "Base10":
        case "base10":
        case "Base-10":
        case "base-10":
        case "Decimal":
        case "decimal":
            results.push(generate_base10());
            break;
        default:
            console.log("Unknown generator: " + args[args.indexOf("--only")+1])
            process.exit(1);
    }
}
else {
    results.push(generate_diceware());
    results.push(generate_eff());
    results.push(generate_alternate());
    results.push(generate_pseudowords());
    results.push(generate_base94());
    results.push(generate_base64());
    results.push(generate_base32());
    results.push(generate_base16());
    results.push(generate_base10());
}

var json_ret = JSON.stringify(results, null, 2);
console.log(json_ret);
