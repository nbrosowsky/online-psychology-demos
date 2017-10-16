/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */


//////////////// Stim & Trial Array Creation //////////////////////////////////

/* Creates the trial array
 */

var trialType = [
  ["shape", "square", 3, "m", "congruent", "up"],
  ["shape", "square", 2, "m", "incongruent", "up"],
  ["shape", "diamond", 3, "z", "incongruent", "up"],
  ["shape", "diamond", 2, "z", "congruent", "up"],
  ["fill", "square", 3, "m", "congruent", "down"],
  ["fill", "square", 2, "z", "incongruent", "down"],
  ["fill", "diamond", 3, "m", "incongruent", "down"],
  ["fill", "diamond", 2, "z", "congruent", "down"]
]

var trialArray = [];



for (b = 0; b <= 11; b++) {
    var block = [];
    for (n = 0; n <= trialType.length - 1; n++) {
        temp = {
            date: new Date(),
            subject: "",
            trial: "",
            task: trialType[n][0],
            shape: trialType[n][1],
            fill: trialType[n][2],
            cResponse: trialType[n][3],
            congruency: trialType[n][4],
            location: trialType[n][5],
            reactionTime: "",
            response: "",
            accuracy: ""
        }
        block.push(temp)
    }
    trialArray = trialArray.concat(shuffle(block));
}


for (n = 0; n <= trialArray.length - 1; n++) {
    trialArray[n].trial = n + 1;

    if (n != 0) {
        trialArray[n].task === trialArray[n - 1].task ? trialArray[n].taskSwitch = "repeat" : trialArray[n].taskSwitch = "switch";
    } else {
        trialArray[n].taskSwitch = "first";
    }
}


// containers for summary data //
summary = {
    RTSwitch: [],
    RTRepeat: [],
    ACCSwitch: [],
    ACCRepeat: []
}

// for d3.js charts //
RTData = [];
ErrorData = [];
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
    keytest = 0; /* disable keypresses */
    $("#up").html(""); /* hide displays */
    $("#down").html("");

    /* run function fixate after "blankLength" milliseconds */
    eventTimer.setTimeout(trial, blankLength);
}

// /* 2. fixation */
// function fixate() {
//
//     /* display fixation cross */
//     $(".targetDisplay").hide();
//     $(".targetDisplay").html("+");
//     $(".targetDisplay").css("gender", "black");
//     $(".targetDisplay").show();
//
//     /* run function blank2 after "fixateLength" milliseconds */
//     eventTimer.setTimeout(blank2, fixateLength);
// }
//
// /* 3. blank screen */
// function blank2() {
//     $(".targetDisplay").hide(); /* hide display */
//     /* run function blank2 after "blankLength" milliseconds */
//     eventTimer.setTimeout(trial, blankLength);
// }

/* 4. stim presentation / present until response */
function trial() {
    /* update counter display */
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");

    /* allow responses */
    keytest = 1;

    /* present target stim */

    $("#" + trialArray[trialCount].location).html('<img src="' + "images/" + trialArray[trialCount].shape + trialArray[trialCount].fill + '.png"' + 'style="width: 150px"/>');
    /* get timestamp for stim presentation */
    time1 = new Date().getTime();

}

/* collect response on keypress / ends trial / only when keytest == 1 */
$(document).keypress(function (event) {
    if (keytest == 1) {
        keytest = 0; /* disable keypresses */
        time2 = new Date().getTime(); /* get timestamp for response */

        /* collect response / force to lower case */
        response = String.fromCharCode(event.which);
        response = response.toLowerCase();

        /* determine accuracy */
        if (response == trialArray[trialCount].cResponse) {
            accuracy = 1;
        } else {
            accuracy = 0;
        }

        trialArray[trialCount].trial = trialCount + 1
        trialArray[trialCount].subject = subject;
        trialArray[trialCount].response = response;
        trialArray[trialCount].reactionTime = time2 - time1;
        trialArray[trialCount].accuracy = accuracy;

        /* create summary data */

        /* display feedback */
        $("#up").html("");
        $("#down").html("");

        if (response == trialArray[trialCount].cResponse) {
            /* When response is correct... */
            $('#' + trialArray[trialCount].location).html('<p style="font-size: 40px; text-align: center; color: green"> correct </p>');
        } else {
            /* when response is incorrect... */
            $('#' + trialArray[trialCount].location).html('<p style="font-size: 40px; text-align: center; color: red"> incorrect </p>');
        }

        /* end current trial */
        endTrial();

    }
});

/* triggers end of trial */
function endTrial() {
    if (trialCount != trialArray.length - 1) {
        trialCount++; /* increase trial counter by one */
        /* automatically starts next trial / run function blank after "feedbackLength" milliseconds */
        eventTimer.setTimeout(blank, feedbackLength);
    } else {
        /* END OF EXPERIMENT */
        /* send up-to-date data set to parent window */
        expEnd = new Date().getTime();
        summarizeData();
        $(".targetDisplay").hide();

        $("#switchRT").text(summary.RTSwitch.toFixed(0));
        $("#switchACC").text((summary.ACCSwitch * 100).toFixed(0));
        $("#repeatRT").text(summary.RTRepeat.toFixed(0));
        $("#repeatACC").text((summary.ACCRepeat * 100).toFixed(0));
        createRTChart();
        createErrorChart();
        $(".resultsDisplay").show();
    }
}




function summarizeData() {
    var sRT = [];
    var sACC = [];
    var rRT = [];
    var rACC = [];

    for (i = 1; i <= trialArray.length - 1; i++) {
        if (trialArray[i].reactionTime < 3000) {
            if (trialArray[i].taskSwitch === "switch") {
                (trialArray[i].accuracy === 1) ? sRT.push(trialArray[i].reactionTime): function () {};
                sACC.push(trialArray[i].accuracy)
            } else {
                (trialArray[i].accuracy === 1) ? rRT.push(trialArray[i].reactionTime): function () {};
                rACC.push(trialArray[i].accuracy)
            }
        } else {
            (trialArray[i].taskSwitch === "switch") ? sACC.push(0): rACC.push(0);
        }
    }

    summary.RTSwitch = calcAVG(sRT);
    summary.RTRepeat = calcAVG(rRT);
    summary.ACCSwitch = 1 - calcAVG(sACC);
    summary.ACCRepeat = 1 - calcAVG(rACC)

    // For d3.js charts //
    RTData = [
        {
            condition: "Switch Trials",
            response: summary.RTSwitch
        },
        {
            condition: "Repeat Trials",
            response: summary.RTRepeat
        }
    ];

    ErrorData = [
        {
            condition: "Switch Trials",
            response: (summary.ACCSwitch * 100)
        },
        {
            condition: "Repeat Trials",
            response: (summary.ACCRepeat * 100)
        }
    ];


//    // For Google Form //
//    var googleURL = "https://docs.google.com/forms/d/e/1FAIpQLSeY44t8gZOb5BdPwleaZYThzNPKjAkhYExg9cu6dW-aILNwww/formResponse"
//    var data = {
//
//        // subject ID //
//        "entry.106542103": trialArray[0].subject,
//
//        // Age //
//        "entry.2141639151": document.getElementsByName("age")[0].value,
//        // gender //
//        "entry.1866430447": getCheckedRadioValue("gender"),
//        // handedness //
//        "entry.1750504755": getCheckedRadioValue("hand"),
//
//        // switch RT //
//        "entry.734194035": summary.RTSwitch,
//        // repeat RT //
//        "entry.1603213747": summary.RTRepeat,
//
//        // switch error rate //
//        "entry.702986443": summary.ACCSwitch * 100,
//        // repeat error rate //
//        "entry.1231541435": summary.ACCRepeat * 100
//
//
//    }
//    // send to google form ///
//    postToGoogle(googleURL, data);
}



////////////// Set up initial display & button functions //////////////////////////////////////
/* These functions need to run after document has loaded */
pagination.setup();


/* end instructions and begin experiment */
$("#beginExp").click(function () {
    $(".instructionDisplay").hide();
    $(".countDisplay").html(trialCount + " / " + trialArray.length + " trials");
    $(".top").show();
    $(".targetDisplay").show();
    // blank();
});

$("#firstTrial").click(function () {
    expBegin = new Date().getTime();
    $("#up").html("");
    $("#down").html("");
    $(".targetDisplay").toggleClass("noCursor");
    blank();
})


/* download data file */
$("#downloadCSV").click(function () {
    exportObjectToCSV('taskSwitching - ' + subject + '.csv', trialArray);
});






/////////////////// Generic Functions /////////////////////////////////

// Sets up the instruction pop-up //
$(function () {
    // Get the modal
    var modal = document.getElementById('popUpInstructions');

    // Get the button that opens the modal
    var btn = document.getElementById("showInstructions");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function () {
        modal.style.display = "block";
    };

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
})

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
function shuffle(array) {
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

/* find checked radio button */
function getCheckedRadioValue(name) {
    var elements = document.getElementsByName(name);

    for (var i = 0, len = elements.length; i < len; ++i)
        if (elements[i].checked) return elements[i].value;
}
