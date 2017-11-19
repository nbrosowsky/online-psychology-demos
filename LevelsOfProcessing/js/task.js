/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */
//var myScript = document.createElement('script');
//myScript.src = 'js/ltdBattig.js';
//myScript.onload = function () {
//console.log('Battig words loaded.');
//

    //////////////// Stim & Trial Array Creation //////////////////////////////////
    /* Creates the trial array for study phase */
    var trialType = ["capital", "rhyme", "category", "sentence"];
    var nTrials = 10; // # of trials per trialType
    var trialArray = [];

    var wordList = Battig;
    var words = [];
    var studyWords = [];
    var conditions = ["yes", "no"];
    var counter = 0;

    function createTrialArray(){
         for (n = 0; n <= trialType.length - 1; n++) {
        for (t = 0; t <= (nTrials / 2 - 1); t++) {
            for (c = 0; c <= 1; c++) {
                var w, nw, temp

                w = newShuffle(Battig)[0]
                w.word = w.word.replace("-"," ")
                while (RiTa.getSyllables(w.word.replace("-"," ")).split("/").length != 2 || words.indexOf(w) > -1) {
                    w = newShuffle(Battig)[0]
                    w.word = w.word.replace("-"," ")
                };
                words.push(w.word);
                temp = {
                    date: new Date(),
                    subject: "",
                    trial: "",
                    encodingCondition: trialType[n],
                    word: w.word,

                    wordType: "old",
                    cResponse: conditions[c],
                    response: "",
                };

                if (temp.cResponse === "yes") {
                    temp.rhyme = newShuffle(w.rhymes)[0];
                    temp.sentence = newShuffle(w.sentences)[0];
                    temp.category = w.catname;
                    if (temp.encodingCondition === "capital") {
                        temp.word = temp.word.toUpperCase();
                    }
                } else {
                    nw = newShuffle(Battig)[0];

                    temp.rhyme = newShuffle(nw.rhymes)[0];
                    temp.sentence = newShuffle(nw.sentences)[0];
                    temp.category = nw.catname;
                }
                trialArray.push(temp);


            }

        }

    }

    trialArray = newShuffle(trialArray)

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








//
//};


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
    $("#targetWord").css("visibility", "hidden")
    $("#targetTask").hide();

    if (trialArray[trialCount].encodingCondition === "capital") {
        $("#targetTask").html("Is ________ in UPPERCASE letters?")

    }

    if (trialArray[trialCount].encodingCondition === "rhyme") {
        $("#targetTask").html("Does ________ rhyme with " + trialArray[trialCount].rhyme + " ?")

    }

    if (trialArray[trialCount].encodingCondition === "category") {
        $("#targetTask").html("Is ________ a(n) " + trialArray[trialCount].category + " ?")
    }

    if (trialArray[trialCount].encodingCondition === "sentence") {
        $("#targetTask").html("Does ________ fit in the sentence: <br />" + "'..." + trialArray[trialCount].sentence + "...'" + " ?")
    }

    $("#targetWord").html(trialArray[trialCount].word)
    $("#targetTask").show();
    $("#1-target").show();


    eventTimer.setTimeout(showWord, 2000);

}

function showWord() {
    /* get timestamp for stim presentation */
    time1 = new Date().getTime();

    $("#targetWord").css("visibility", "visible")

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



$("#yesResponse").click(function () {
    $("#1-target").hide();

    time2 = new Date().getTime(); /* get timestamp for response */

    trialArray[trialCount].trial = trialCount + 1
    trialArray[trialCount].subject = subject;
    trialArray[trialCount].reactionTime = time2 - time1;
    trialArray[trialCount].response = "yes";

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

function newShuffle(arr, bool) {
    var isView = ArrayBuffer && ArrayBuffer.isView && ArrayBuffer.isView(arr);
    arr = bool || isView ? arr : arr.slice();

    var rnd, tmp, idx = arr.length;
    while (idx > 1) {
        rnd = Math.random() * idx | 0;

        tmp = arr[--idx];
        arr[idx] = arr[rnd];
        arr[rnd] = tmp;
    }

    return arr;
};
