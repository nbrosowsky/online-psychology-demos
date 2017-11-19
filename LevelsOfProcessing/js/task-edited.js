/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */


//////////////// Stim & Trial Array Creation //////////////////////////////////
/* Creates the trial array for study phase */
var trialType = ["capital", "rhyme", "sentence"];
var trialArray = [];
var nTrials = 4;

var words = [];
var studyWords = [];
var sentences = [];

function createSentenceTrials() {
    /* create sentence trials */
    for (b = 0; b <= 2; b++) {
        var both = getSentenceWithRandom();
        console.log(both);
        sentences.push(both)
        words.push(both[0])
       
    }
}

function createTrials() {

    /* create capital letter trials */
    var conditions = ["yes", "no"];
    for (b = 0; b <= (nTrials / 2) - 1; b++) {
        for (c = 0; c <= conditions.length - 1; c++) {
            var w = getNewWord();
            words.push(w);
            studyWords.push(w);
            if (conditions[c] === "yes") {
                w = w.toUpperCase()
            }


            temp = {
                date: new Date(),
                subject: "",
                trial: "",
                encodingCondition: "capital",
                word: w,
                wordType: "old",
                cResponse: conditions[c]
            }
            trialArray.push(temp)
        }
        $("#progress").html((studyWords.length / 30) * 100 + "%")
    }

    /* create rhyme trials */
    for (b = 0; b <= (nTrials / 2) - 1; b++) {
        for (c = 0; c <= conditions.length - 1; c++) {

            var both = getWordRhyme();
            console.log(both);
            var w = both[0];
            var w2 = both[1];

            if (conditions[c] === "no") {
                w2 = getNewWord();
            }

            words.push(w);
            words.push(w2);

            studyWords.push(w);

            temp = {
                date: new Date(),
                subject: "",
                trial: "",
                encodingCondition: "rhyme",
                word: w,
                wordType: "old",
                rhyme: w2,
                cResponse: conditions[c]
            }
            trialArray.push(temp)
        }
        $("#progress").html((studyWords.length / 30) * 100 + "%")
    }

    /* create sentence trials */
    for (b = 0; b <= (nTrials / 2) - 1; b++) {
        for (c = 0; c <= conditions.length - 1; c++) {

            var both = getSentenceWithRandom();
            console.log(both);
            var w = both[0];
            var s = both[1];

            studyWords.push(w)
            if (conditions[c] === "no") {
                s = getSentenceWithRandom()[1];
            }

            words.push(w);
            words.push(w2);
            temp = {
                date: new Date(),
                subject: "",
                trial: "",
                encodingCondition: "sentence",
                word: w,
                sentence: s,
                wordType: "old",
                cResponse: conditions[c]
            }
            trialArray.push(temp)
        }
        $("#progress").html((studyWords.length / 30) * 100 + "%")
    }

    return console.log("finished loading trials!")
}






// containers for summary data //
ratings = {
    survival: [],
    pleasantness: [],
    imagery: [],
    selfReference: []
}

memoryACC = {
    survival: [],
    pleasantness: [],
    imagery: [],
    selfReference: []
}




///////////// functions for creating trials //////////////////////////


function getNewWord() {
    var temp = RiTa.randomWord("nn", 2);
    if (words.indexOf(temp) > -1) {
        getNewWord()
    } else {
        return temp;
    }
}

function getWordRhyme() {
    var first = "";
    var second = "no match";
    var found = "";

    while (second === "no match") {
        first = RiTa.randomWord("nn", 2);

        if (!(words.indexOf(first) > -1)) {
            second = findRhyme(first);
            console.log(second)
        }
    }
    found = [first, second];
    return found;
}

function findRhyme(word) {
    var temp2 = RiTa.rhymes(word);
    var rhyme = "no match"

    if (temp2.length === 0) {
        return rhyme;
    } else {
        temp2 = myShuffle(temp2);
        for (n = 0; n <= temp2.length - 1; n++) {
            if (RiTa.getSyllables(temp2[n]).split("/").length === 2) {
                if (RiTa.isNoun(temp2[n]) && !(words.indexOf(temp2[n]) > -1)) {
                    rhyme = temp2[n];
                }
            }
        }

    }
    return rhyme;
}

function getSentenceWithRandom() {
    var found, word;

    while (found === undefined) {
        word = RiTa.randomWord("nn", 2)
        if (!(words.indexOf(word) > -1)) {
            found = getSentenceWith(word);
        }
    }
    return [word, found];
}

function getSentenceWith(word) {
    var t;
    var s = [];

    t = RiTa.kwic(allData, word, {
        ignorePunctuation: true,
        ignoreStopWords: true,
        wordCount: 20
    });

    if (t.length === 0) {
        return;
    }
//    t = myShuffle(t);
    for (n = 0; n <= t.length - 1; n++) {
//        var temp = t[n].split(",");
//        temp = temp.split("!");
//        temp = temp.split("?");
//        temp = temp.split(";");
        var temp = t[n].replace(/[,"\/#$%\^&\*;:{}=\-_~]/g,"")
        
        temp = temp.replace(/\s{2,}/g," ")
        temp = temp.replace(/([.?!;])/g, "$1|").split("|");
        for (m = 0; m <= temp.length - 1; m++) {

            if (temp[m].match(word)) {
                if (temp[m].split(" ").length < 20) {
                    temp[m] = temp[m].replace(word, "_________")
                    s = temp[m]   
                }
            }
        }

    }

    return s;
}


//////////////////////////////////////////////////////////////////////

////////////// Trial Events ////////////////////////////////////////////

/* set trial intervals in milliseconds */
var blankLength = 400;
// var fixateLength = 200;
var feedbackLength = 1000;

/* initialize necessary variables */
var response; /* temporary response container */
var accuracy; /* temporary accuracy container */

var expBegin = "NA"; /* first stimulus timestamp */
var expEnd = "NA"; /* end of experiment timestamp */

var trialCount = 0; /* trial counter / keeps track of which trial the subject is on */
var keytest = 0; /* enables and disables keypress effects / only allows responses when keytest == 1 */
var subject = new Date().getTime(); /* creates timestamp for unique subject identifier */

/* trial events in chronological order */

/* 1. blank screen */
function blank() {
    $("#1-target").hide();

    /* run function fixate after "blankLength" milliseconds */
    eventTimer.setTimeout(trial, blankLength);
}


/* 4. stim presentation / present until response */
function trial() {
    /* update counter display */
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");

    /* present target stim */
    $("#survival").hide();
    $("#pleasantness").hide();
    $("#imagery").hide();
    $("#selfReference").hide();

    $("#targetWord").html(trialArray[trialCount].word.toUpperCase())
    $("#1-target").show();
    $("#" + trialArray[trialCount].encodingCondition).show();
    /* get timestamp for stim presentation */
    time1 = new Date().getTime();

}

/* recognition phase */
function rec_blank() {
    $("#2-target").hide();

    /* run function fixate after "blankLength" milliseconds */
    eventTimer.setTimeout(rec_trial, blankLength);
}

function rec_trial() {
    /* update counter display */
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");

    var trialWords = [trialArray[trialCount].word, trialArray[trialCount].newWord]
    shuffle(trialWords)

    $("#left").html(trialWords[0].toUpperCase());
    $("#right").html(trialWords[1].toUpperCase());

    $("#2-target").show();
    time1 = new Date().getTime();
}



////////////// Set up initial display & button functions //////////////////////////////////////
/* end instructions and begin experiment */
$("#beginExp").click(function () {
    $("#1-instructions").hide();
    $(".countDisplay").html(trialCount + " / " + trialArray.length + " trials");
    $(".top").show();

    blank();
});


$("#beginMemory").click(function () {
    trialCount = 0;
    shuffle(trialArray);

    $("#2-instructions").hide();
    $(".countDisplay").html(trialCount + " / " + trialArray.length + " trials");
    $(".top").show();

    rec_blank();
});



$("#submitResponse").click(function () {
    $("#1-instructions").hide();

    time2 = new Date().getTime(); /* get timestamp for response */

    trialArray[trialCount].trial = trialCount + 1
    trialArray[trialCount].subject = subject;
    trialArray[trialCount].rating = document.querySelector("#" + trialArray[trialCount].encodingCondition + "Input").value;
    trialArray[trialCount].reactionTime = time2 - time1;

    document.querySelector("#" + trialArray[trialCount].encodingCondition + "Input").value = 3
    if (trialCount != trialArray.length - 1) {
        trialCount++; /* increase trial counter by one */
        blank();
    } else {
        $("#1-phase").hide()
        $("#2-target").hide();
        $("#2-phase").toggleClass("initHidden");
        $("#2-phase").toggleClass("flexCenter")
        $("#2-instructions").show();

    }
});


/* gets button ID and html from button for response */
function getRecResponse(btnID) {
    $("#1-instructions").hide();
    time2 = new Date().getTime(); /* get timestamp for response */

    trialArray[trialCount].memoryTrial = trialCount + 1
    trialArray[trialCount].memoryRT = time2 - time1;


    if ($("#" + btnID).html().toLowerCase() === trialArray[trialCount].word.toLowerCase()) {
        trialArray[trialCount].memoryACC = 1;
    } else {
        trialArray[trialCount].memoryACC = 0;
    }
    if (trialCount != trialArray.length - 1) {
        trialCount++; /* increase trial counter by one */
        rec_blank();
    } else {
        $("#2-phase").hide()
        getSummary();

        $("#resultsDisplay").toggleClass("initHidden");
        $("#resultsDisplay").toggleClass("flexColumn");
        createChart();
    }
}

$("#left").click(function () {
    x = this.id;
    getRecResponse(x);

});

$("#right").click(function () {
    x = this.id;
    getRecResponse(x);


});

/* download data file */
$("#downloadCSV").click(function () {
    exportObjectToCSV('taskSwitching - ' + subject + '.csv', trialArray);
});


/* summarize the data */
function getSummary() {
    for (i = 0; i <= trialArray.length - 1; i++) {
        ratings[trialArray[i].encodingCondition] = Number(trialArray[i].rating) + Number(ratings[trialArray[i].encodingCondition]);
        memoryACC[trialArray[i].encodingCondition] = Number(trialArray[i].memoryACC) + Number(memoryACC[trialArray[i].encodingCondition]);
    }

    ratings.survival = ratings.survival / (trialArray.length / 4)
    ratings.pleasantness = ratings.pleasantness / (trialArray.length / 4)
    ratings.imagery = ratings.imagery / (trialArray.length / 4)
    ratings.selfReference = ratings.selfReference / (trialArray.length / 4)

    memoryACC.survival = (memoryACC.survival / (trialArray.length / 4)) * 100
    memoryACC.pleasantness = (memoryACC.pleasantness / (trialArray.length / 4)) * 100
    memoryACC.imagery = (memoryACC.imagery / (trialArray.length / 4)) * 100
    memoryACC.selfReference = (memoryACC.selfReference / (trialArray.length / 4)) * 100

    // For d3.js charts //
    D3Data = [
        {
            condition: "Survival",
            response: memoryACC.survival
        },
        {
            condition: "Pleasantness",
            response: memoryACC.pleasantness
        },
        {
            condition: "Imagery",
            response: memoryACC.imagery
        },
        {
            condition: "Self-Reference",
            response: memoryACC.selfReference
        }
    ];


    // For Google Form //
    var googleURL = "https://docs.google.com/forms/d/e/1FAIpQLSeFloGjJO_wU-u_4Uuv-fSfTm5Hsto0Eo6tXzTVqqeoNfZccg/formResponse"
    var data = {

        // subject ID //
        "entry.918765135": trialArray[0].subject,

        // survival Rating //
        "entry.254745122": ratings.survival,
        // pleasantness Rating //
        "entry.829469158": ratings.pleasantness,
        // imagery Rating //
        "entry.1937775764": ratings.imagery,
        // self-reference Rating //
        "entry.1085361898": ratings.selfReference,

        // survival memory score //
        "entry.126810252": memoryACC.survival,
        //pleasantness memory score //
        "entry.1594130621": memoryACC.pleasantness,

        // imagery memory score //
        "entry.1760213268": memoryACC.imagery,

        // self-reference memory score //
        "entry.500942876": memoryACC.selfReference,




    }
    // send to google form ///
    postToGoogle(googleURL, data);
}


/////////////////// Generic Functions /////////////////////////////////

/* Disable the backspace key / can add other keys if necessary */
$(function () {
    /*
     * this swallows backspace keys on any non-input element.
     * stops backspace -> back
     */
    var rx = /INPUT|SELECT|TEXTAREA/i;

    $(document).bind("keydown keypress", function (e) {
        if (e.which == 8) { // 8 == backspace
            if (!rx.test(e.target.tagName) || e.target.disabled || e.target.readOnly) {
                e.preventDefault();
            }
        }
    });
});




/* compute average of array */
function calcAVG(array) {
    var total = 0;
    for (var i = 0; i < array.length; i++) {
        total += array[i];
    }
    var avg = total / array.length;
    return (avg);
}



/* shuffle an array */
function myShuffle(array) {
    var tmp, current, top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }

    return array;
}
