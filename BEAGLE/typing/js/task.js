/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */


//fallback: if eventTimer doesn't load for some reason fallback to the standard js timers
if (typeof eventTimer == 'undefined') {
    //console.log("no eventTimer found... using JS setTimeout/Interval")
    var eventTimer = {};
    eventTimer.setTimeout = function (fun, time) {
        window.setTimeout(fun, time)
    }
    eventTimer.setInterval = function (fun, time) {
        window.setInterval(fun, time)
    }
}


//////////////// Stim & Trial Array Creation //////////////////////////////////



///////////// create study trials ////////////////

// number of words per condition
var Nwords = 2;


var mTurkID,
    fbID,
    trialArray = [],
    newWordsArray = [],
    expStart = new Date().getTime(),
    expID = "Exp1",
    i,
    demo,
    expEnd = "incomplete",
    probeTimer,
    conditions = ['prime2', 'prime10', 'prime100', 'prime1000', 'prime10000', 'prime90000'],
    words = []


if (window.opener) {
    fbID = window.opener.userID
} else {
    fbID = new Date().getTime();
}

/// create trials after json has loaded.
$.getJSON("words.json", function (data) {
    words = data
    console.log(words); // this will show the info it in firebug console

    // create study trial array //
    shuffle(words);

    // for each similarity condition... //
    for (s = 0; s <= 5; s++) {
        // ... select six words
        for (i = 0; i <= Nwords - 1; i++) {
            var i, selectOne

            selectOne = words.shift()

            //Do we want to shuffle prime/probe? Or always make word 1 prime and word 2 probe?
            trialArray.push({
                expID: expID,
                firebaseId: fbID,
                word: selectOne.probe[0],
                wordType: 'old',
                prime: selectOne[conditions[s]].word[0],
                similarity: selectOne[conditions[s]].sim[0],
                rank: selectOne[conditions[s]].rank[0],
                assignmentId: mTurk.turkInfo().assignmentId,
                hitId: mTurk.turkInfo().hitId,
                previewMode: mTurk.turkInfo().hitId,
                workerId: mTurk.turkInfo().workerId,
                typingTrial: "",
                typingResponse: "",
                typingStart: "",
                typingEnd: "",
                typingIKSI: [],
                typingEditDist: "",
                memoryTrial: "",
                memoryResponse: "",
                memoryRT: "",
                memoryACC: ""
            })
        }
    }

    // select words for identical prime/probe
    for (i = 0; i <= Nwords - 1; i++) {
        var i, selectOne, index

        selectOne = words.shift()


        trialArray.push({
            expID: expID,
            firebaseId: fbID,
            word: selectOne.probe[0],
            wordType: 'old',
            prime: selectOne.probe[0],
            similarity: 1,
            rank: 1,
            assignmentId: mTurk.turkInfo().assignmentId,
            hitId: mTurk.turkInfo().hitId,
            previewMode: mTurk.turkInfo().hitId,
            workerId: mTurk.turkInfo().workerId,
            typingTrial: "",
            typingResponse: "",
            typingStart: "",
            typingEnd: "",
            typingIKSI: [],
            typingEditDist: "",
            memoryTrial: "",
            memoryResponse: "",
            memoryRT: "",
            memoryACC: ""
        })
    }


    trialArray = shuffle(trialArray);


    // create array of new words (to be added after the study phase) //

    // flatten array of remaining words

    for (i = 0; i <= (Nwords * 7) - 1; i++) {

        var l, i, selectOne
        selectOne = words.shift()

        newWordsArray.push({
            expID: expID,
            firebaseId: fbID,
            word: selectOne.probe[0],
            wordType: 'new',
            prime: "NA",
            similarity: "NA",
            rank: "NA",
            assignmentId: mTurk.turkInfo().assignmentId,
            hitId: mTurk.turkInfo().hitId,
            previewMode: mTurk.turkInfo().hitId,
            workerId: mTurk.turkInfo().workerId,
            typingTrial: "",
            typingResponse: "",
            typingStart: "",
            typingEnd: "",
            typingIKSI: [],
            typingEditDist: "",
            memoryTrial: "",
            memoryResponse: "",
            memoryRT: "",
            memoryACC: ""
        })

    }

});;






//////////////////////////////////////////////////////////////////////




////////////// Trial Events ////////////////////////////////////////////

/* set trial intervals in milliseconds */
var blankLength = 250,
    primeLength = 500,
    fixateLength = 500,
    targetLength = 1000,
    feedbackLength = 1000


var trialCount = -1; /* trial counter / keeps track of which trial the subject is on */
var keytest = false; /* enables and disables keypress effects / only allows responses when keytest == 1 */
var time1, time2, keys = [],
    lastKey
var phase = "instructions"
/* RT collection


// Prime Trials //

/* trial events in chronological order */

/* 1. Blank 1 */
function studyBlank() {
    trialCount++
    keytest = false; /*disable keypresses */

    /* clear all target displays */
    $("#up").html("");
    $("#center").html("");
    $("#down").html("");

    eventTimer.setTimeout(studyFixate, blankLength);
}

/* 2. fixation cross */
function studyFixate() {
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");
    $("#center").html("+")

    eventTimer.setTimeout(studyBlank2, fixateLength);
}

/* 3. Blank 2 */
function studyBlank2() {
    /* clear all target displays */
    $("#up").html("");
    $("#center").html("");

    eventTimer.setTimeout(studyPrime, blankLength);
}

/* 3. Prime word */
function studyPrime() {
    $("#center").html(trialArray[trialCount].prime.toUpperCase())
    eventTimer.setTimeout(studyBlank3, primeLength);
}

/* 4. Blank 3 */
function studyBlank3() {
    /* clear all target displays */
    $("#up").html("");
    $("#center").html("");

    eventTimer.setTimeout(studyProbe, blankLength);
}

/* 4. Probe word */
function studyProbe() {
    time1 = window.performance.now();
    keytest = true;

    /* clear all target displays */
    $("#up").html("");
    $("#center").html(trialArray[trialCount].word.toUpperCase())

    probeTimer = eventTimer.setTimeout(studyResponse, targetLength);
}

/* 5. Blank / wait for response */
function studyResponse() {
    $("#up").html("");
    $("#center").html("");
}

function feedback() {
    if (response == trialArray[trialCount].location) {
        /* When response is correct... */
        $('#center').html('<p style="font-size: 40px; text-align: center; color: green"> correct </p>');
    } else {
        /* when response is incorrect... */
        $('#center').html('<p style="font-size: 40px; text-align: center; color: red"> incorrect </p>');
    }

    if (trialCount != trialArray.length - 1) {
        eventTimer.setTimeout(studyBlank, feedbackLength);
    } else {
        eventTimer.setTimeout(endStudy, feedbackLength);
    }
}

//////// END PRIME EVENTS /////////

function endStudy() {
    // reset trial counter
    trialCount = -1;
    phase = 'probe';

    // hide study display
    $("#targetDisplay").hide();
    $("#reminder").hide();

    $("#up").css("font-size", "35px")

    // create array of new & old words 
    memoryArray = trialArray.concat(newWordsArray)
    memoryArray = shuffle(memoryArray)
    $(".countDisplay").html("0/" + memoryArray.length + " trials");

    // show test instructions
    $("#testInstructions").css('display', 'flex');

    // change modal instructions //
    $("#popUpText").html("<p>For the second part of the experiment, we will test your memory for the words you were presented.</p> <p> In the test that follows, we will present you with a series of words, one at a time. Some of the words were presented earlier, some are new words that were not presented in the experiment.</p> <p>Your task is to indicate whether the word presented is an 'OLD' word (i.e., a word that was presented earlier) or a 'NEW' word (i.e., a word that was not presented earlier). </p> <p>To respond, press 'O' if you believe it's an old word or press 'N' if you believe it's a new word. </p> ")

    $("#reminder").html("<p>*Reminder: Press 'O' if you believe the word is an old word, press 'N' if you believe the word is a new word</p>");
}


//////// MEMORY TEST EVENTS //////

function testBlank() {
    trialCount++
    keytest = false; /*disable keypresses */

    /* clear all target displays */
    $("#up").html("");
    $("#center").html("");
    $("#down").html("");

    eventTimer.setTimeout(testFixate, blankLength);

}

/* 2. fixation cross */
function testFixate() {
    $(".countDisplay").html((trialCount + 1) + " /" + memoryArray.length + " trials");
    $("#center").html("+")

    eventTimer.setTimeout(testBlank2, fixateLength);
}

/* 3. Blank 2 */
function testBlank2() {
    /* clear all target displays */
    $("#up").html("");
    $("#center").html("");
    $("#down").html("");

    eventTimer.setTimeout(testTarget, blankLength);
}

function testTarget() {
    time1 = window.performance.now();
    keytest = true;
    $(".countDisplay").html((trialCount + 1) + " /" + memoryArray.length + " trials");
    $("#up").html("old or new?")
    $("#center").html(memoryArray[trialCount].word.toUpperCase())
}

function endExp() {
//    var fbData = {};
//
////    fbData.data = memoryArray;
////    fbData.expStart = expStart;
////    fbData.expEnd = new Date().getTime();
////    fbData.demographics = {
////        country: $("#country").val(),
////        sex: $("[name='sex']").val(),
////        age: $("#age").val(),
////        hand: $("[name='hand']").val(),
////        vision: $("[name='vision']").val(),
////        language: $("[name='language']").val(),
////        firebaseID: fbID,
////        assignmentId: mTurk.turkInfo().assignmentId,
////        hitId: mTurk.turkInfo().hitId,
////        workerId: mTurk.turkInfo().workerId
////
////    };
    
    for (i =0; i<= memoryArray.length-1; i++){
        memoryArray[i].expStart = expStart,
        memoryArray[i].expEnd = expEnd,
        memoryArray[i].country = $("#country").val();
        memoryArray[i].sex = $("[name='sex']").val();
        memoryArray[i].age = $("#age").val();
        memoryArray[i].hand = $("[name='hand']").val();
        memoryArray[i].vision = $("[name='vision']").val();
        memoryArray[i].language = $("[name='language']").val(); 
    }
    
    window.opener.data = memoryArray;
//    $("#data", opener.window.document).val(JSON.stringify(memoryArray));
    window.close()
}




////////////// Set up initial display & button functions //////////////////////////////////////

///// initiate buttons ////


$("#begin-exp").click(function () {
    // mark the beginning of the experiment
    expBegin = new Date().getTime();


    // hide study instructions
    $("#studyInstructions").hide();

    // show study display & trial counter
    $("#targetDisplay").show();
    $("#reminder").show();
    $(".countDisplay").html(0 + " / " + trialArray.length + " trials");
    $(".top").css('visibility', 'visible');

    phase = 'prime'

    // trigger study trials
    // initiate blank screen 
    studyBlank();

})

$("#startTest").click(function () {
    // hide instructions
    $("#testInstructions").hide();

    // show test display
    $("#targetDisplay").show();
    $("#reminder").show();

    // init blank screen 
    testBlank();
})


/* collect response on keypress / ends trial / only when keytest == 1 */
$(document).keydown(function (event) {
    //console.log(event.keyCode)

    /* get timestamp for response */
    time2 = window.performance.now();


    if (phase != "instructions") {
        event.preventDefault();
        if (!keytest) {
            return
        };


        if (phase == "prime") {


            //if key pressed is NOT spacebar and is a letter
            if (event.keyCode != 32 && /^[a-zA-Z]*$/g.test(String.fromCharCode(event.which))) {

                //if first key pressed...
                if (keys.length === 0) {
                    keys = String.fromCharCode(event.which).toUpperCase()
                    trialArray[trialCount].typingStart = time2 - time1

                    //if not first key pressed...    
                } else {
                    trialArray[trialCount].typingIKSI.push(time2 - lastKey)
                    keys = keys.concat(String.fromCharCode(event.which).toUpperCase())

                }


                lastKey = time2
                $("#down").text(keys)

                return
            }

            // if spacebar is pressed, submit response

            if (event.keyCode === 32) {
                keytest = false; /* disable keypresses */


                trialArray[trialCount].typingEnd = time2 - time1
                trialArray[trialCount].typingResponse = keys.toLowerCase();
                trialArray[trialCount].typingTrial = trialCount + 1
                trialArray[trialCount].typingEditDist = editDist(keys.toUpperCase(), trialArray[trialCount].word.toUpperCase())

                keys = "";


                


                if (trialCount != trialArray.length - 1) {
                    eventTimer.setTimeout(studyBlank, 1000 - (time2 - time1))
                } else {
                    eventTimer.setTimeout(endStudy, 1000 - (time2 - time1))
                }
            }
        }

        if (phase == "probe") {
            if (String.fromCharCode(event.which).toLowerCase() != 'o' && String.fromCharCode(event.which).toLowerCase() != 'n') {
                return
            }

            keytest = false; /* disable keypresses */


            /* collect response / force to lower case */
            response = String.fromCharCode(event.which).toLowerCase();

            if (response === 'o') {
                response = "old"
            } else if (response === 'n') {
                response = "new"
            }

            /* determine accuracy */
            if (response == memoryArray[trialCount].wordType) {
                accuracy = 1
            } else {
                accuracy = 0
            };

            memoryArray[trialCount].memoryTrial = trialCount + 1
            memoryArray[trialCount].memoryResponse = response;
            memoryArray[trialCount].memoryRT = time2 - time1;
            memoryArray[trialCount].memoryACC = accuracy;



            if (trialCount != memoryArray.length - 1) {
                testBlank();
            } else {
                expEnd = new Date().getTime();
                endExp();
            }
        }
    }



});
