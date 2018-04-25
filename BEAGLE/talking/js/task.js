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
    expStart = new Date(),
    expID = "Exp2",
    i,
    demo,
    expEnd = "incomplete",
    probeTimer,
    responseTimer,
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

    // unrepeated words //
    for (i = 0; i <= Nwords - 1; i++) {
        var i, selectOne, selectTwo, lure

        selectOne = words.shift()
        selectTwo = words.shift()
        lure = words.shift()

        //Do we want to shuffle prime/probe? Or always make word 1 prime and word 2 probe?
        trialArray.push({
            expID: expID,
            firebaseId: fbID,
            word: selectOne.probe[0],
            prime: selectTwo.probe[0],
            lure: lure.probe[0],
            assignmentId: mTurk.turkInfo().assignmentId,
            hitId: mTurk.turkInfo().hitId,
            previewMode: mTurk.turkInfo().hitId,
            workerId: mTurk.turkInfo().workerId,
            talkingTrial: "",
            talkingRT: "",
            memoryTrial: "",
            memoryResponse: "",
            memoryRT: "",
            memoryACC: ""
        })
    }

    // repeated words
    for (i = 0; i <= Nwords - 1; i++) {
        var i, selectOne, selectTwo, lure

        selectOne = words.shift()
        lure = words.shift()


        trialArray.push({
            expID: expID,
            firebaseId: fbID,
            word: selectOne.probe[0],
            prime: selectOne.probe[0],
            lure: lure.probe[0],
            assignmentId: mTurk.turkInfo().assignmentId,
            hitId: mTurk.turkInfo().hitId,
            previewMode: mTurk.turkInfo().hitId,
            workerId: mTurk.turkInfo().workerId,
            talkingTrial: "",
            talkingRT: "",
            memoryTrial: "",
            memoryResponse: "",
            memoryRT: "",
            memoryACC: ""
        })
    }


    trialArray = shuffle(trialArray);
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
    $("#up", "#down").html("");
    $("#center").html("");
    $("#down").html("");

    eventTimer.setTimeout(studyFixate, blankLength);
}

/* 2. fixation cross */
function studyFixate() {
    $("#center").css("color", "black")
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");
    $("#center").html("+")

    eventTimer.setTimeout(studyBlank2, fixateLength);
}

/* 3. Blank 2 */
function studyBlank2() {
    /* clear all target displays */
    $("#up", "#down").html("");
    $("#center").html("");

    eventTimer.setTimeout(studyPrime, blankLength);
}

/* 3. Prime word */
function studyPrime() {
    $("#center").css("color", "green")
    $("#center").html(trialArray[trialCount].prime.toUpperCase())
    eventTimer.setTimeout(studyBlank3, primeLength);
}

/* 4. Blank 3 */
function studyBlank3() {
    /* clear all target displays */
    $("#up", "#down").html("");
    $("#center").html("");

    eventTimer.setTimeout(studyProbe, blankLength);
}

/* 4. Probe word */
function studyProbe() {

    /* clear all target displays */
    $("#up", "#down").html("");
    $("#center").css("color", "red")
    $("#center").html(trialArray[trialCount].word.toUpperCase())


    probeTimer = eventTimer.setTimeout(studyResponse, targetLength);
}

/* 5. Blank / wait for response */
function studyResponse() {
    time1 = window.performance.now();
    keytest = true;

    $("#center").css("color", "black")
    $("#up", "#down").html("");
    $("#center").html("");

    responseTimer = eventTimer.setTimeout(tooSlow, 1000);
}

function tooSlow() {
    /* when response takes longer than 1 second. */
    $("#center").css("color", "black")
    $('#center').html('<p style="font-size: 40px; text-align: center; color: black"> Too Slow! Respond Faster </p>');
    $("#down").html('<p style="font-size: 20px; text-align: center; color: black">(press the spacebar to continue) </p>');
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
    shuffle(trialArray)
    $(".countDisplay").html("0/" + trialArray.length + " trials");

    // show test instructions
    $("#testInstructions").css('display', 'flex');

    // change modal instructions //
    $("#popUpText").html("<p>For the second part of the experiment, we will test your memory for the words you were presented.</p> <p> In the test that follows, we will present you with pairs of words. In each pair, one will be a word that was presented earlier in the experiment (OLD), while the other will be a new word, that was not presented earlier (NEW). </p> <p>Your task is to indicate which of the two words presented is an 'OLD' word (i.e., a word that was presented earlier). </p> <p>To respond, you will click the mouse on the word, you believe to be an OLD word. </p> ")

    $("#reminder").html("<p>*Reminder: Use the mouse to click on the OLD word (i.e., The word that was presented earlier)</p>");
}


//////// MEMORY TEST EVENTS //////

function testBlank() {
    trialCount++
    keytest = false; /*disable keypresses */

    /* clear all target displays */
    $("#up", "#down").html("");
    $("#center").html("");
    $("#down").html("");

    eventTimer.setTimeout(testFixate, blankLength);

}

/* 2. fixation cross */
function testFixate() {
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");
    $("#center").html("+")

    eventTimer.setTimeout(testBlank2, fixateLength);
}

/* 3. Blank 2 */
function testBlank2() {
    /* clear all target displays */
    $("#up", "#down").html("");
    $("#center").html("");
    $("#down").html("");

    eventTimer.setTimeout(testTarget, blankLength);
}

function testTarget() {
    time1 = window.performance.now();
    keytest = true;
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");

    var stims = [trialArray[trialCount].word, trialArray[trialCount].lure]
    shuffle(stims)
    $("#up").html("click the 'old' word")
    $("#center").html("<p class='mem-words'>" + stims[0].toUpperCase() + "</p>" + "<p class='mem-words'>" + stims[1].toUpperCase() + "</p>")

    $('.mem-words').click(function () {
        var r = $(this).text().toLowerCase();
        recordResponse(r);
    })

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


function recordResponse(r) {
    /* get timestamp for response */
    time2 = window.performance.now();



    var response = r;

    /* determine accuracy */
    if (response === trialArray[trialCount].word) {
        accuracy = 1
    } else {
        accuracy = 0
    };

    trialArray[trialCount].memoryTrial = trialCount + 1
    trialArray[trialCount].memoryResponse = response;
    trialArray[trialCount].memoryRT = time2 - time1;
    trialArray[trialCount].memoryACC = accuracy;

    sendData();


    if (trialCount != trialArray.length - 1) {
        testBlank();
    } else {
        expEnd = new Date();
        endExp();
    }

}

/* collect response on keypress / ends trial / only when keytest == 1 */
$(document).keydown(function (event) {

    /* get timestamp for response */
    time2 = window.performance.now();


    if (phase != "instructions") {
        event.preventDefault();

        if (!keytest) {
            return
        };


        if (phase == "prime") {
            // if spacebar is pressed, submit response
            eventTimer.cancelRequest(responseTimer)

            if (event.keyCode === 32) {
                keytest = false; /* disable keypresses */






                trialArray[trialCount].talkingRT = time2 - time1
                trialArray[trialCount].talkingTrial = trialCount + 1
                
                sendData();

                if (time2 - time1 < 1000) {
                    /* when response takes longer than 1 second. */
                    $('#center').html('<p style="font-size: 40px; text-align: center; color: black"> great! </p>');
                    if (trialCount != trialArray.length - 1) {
                        eventTimer.setTimeout(studyBlank, 500);
                    } else {
                        eventTimer.setTimeout(endStudy, 500);
                    }

                } else {
                    if (trialCount != trialArray.length - 1) {
                        studyBlank();
                    } else {
                        endStudy();
                    }
                }


            }
        }

    }



});

function sendData() {
    var t = trialArray
    var eTime = (expEnd === 'incomplete')?'incomplete':expEnd.getTime() - expStart.getTime()
    var st = convertDate(expStart);
    var en = (expEnd === 'incomplete')?'incomplete':convertDate(expEnd);
    
    for (i = 0; i <= t.length - 1; i++) {
        t[i].expStart = st;
        t[i].expEnd = en
        t[i].expTime = eTime;
        t[i].country = $("#country").val();
        t[i].sex = $("[name='sex']:checked").val();
        t[i].age = $("#age").val();
        t[i].hand = $("[name='hand']:checked").val();
        t[i].vision = $("[name='vision']:checked").val();
        t[i].language = $("[name='language']:checked").val();
    }

    window.opener.data = t;
}

function endExp() {
    sendData();
    window.close();
}
