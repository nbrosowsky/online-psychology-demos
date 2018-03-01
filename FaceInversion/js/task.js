/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */


//////////////// Stim & Trial Array Creation //////////////////////////////////

/* Creates the trial array
 */
var houseN = Array.apply(null, {
    length: 242
}).map(Number.call, Number)
houseN.shift()
shuffle(houseN)

var faceN = Array.apply(null, {
    length: 393
}).map(Number.call, Number)
faceN.shift()
shuffle(faceN)

var trialType = [
  ["house", "up", "left", "right", "z"],
  ["house", "down", "left", "right", "z"],
  ["house", "up", "right", "left", "m"],
  ["house", "down", "right", "left", "m"],
  ["face", "up", "left", "right", "z"],
  ["face", "down", "left", "right", "z"],
  ["face", "up", "right", "left", "m"],
  ["face", "down", "right", "left", "m"]
]

var trialArray = [];
var block = [];
for (b = 0; b <= 11; b++) {
    block = [];
    for (n = 0; n <= trialType.length - 1; n++) {
        temp = {
            material: trialType[n][0],
            orientation: trialType[n][1],
            imageLocation: trialType[n][2],
            lureLocation: trialType[n][3],
            image: "",
            lure: "",
            reactionTime: "",
            response: "",
            accuracy: "",
            subject: "",
            studyTrial: "",
            memoryTrial: ""
        }
        block.push(temp)
    }
    trialArray = trialArray.concat(shuffle(block));
}


var imgArray = [];

for (n = 0; n <= trialArray.length - 1; n++) {

    trialArray[n].studyTrial = n + 1;
    if (trialArray[n].material === "face") {
        trialArray[n].image = "images/face_" + faceN.pop() + ".jpg"
        trialArray[n].lure = "images/face_" + faceN.pop() + ".jpg"
    } else {
        trialArray[n].image = "images/house_" + houseN.pop() + ".jpg"
        trialArray[n].lure = "images/house_" + houseN.pop() + ".jpg"
    }

    imgArray.push(trialArray[n].image)
    imgArray.push(trialArray[n].lure)
}




// For summary data //
summary = {
    RTFaceUp: [],
    RTFaceDown: [],
    ACCFaceUp: [],
    ACCFaceDown: [],
    RTHouseUp: [],
    RTHouseDown: [],
    ACCHouseUp: [],
    ACCHouseDown: []
}

//////////////////////////////////////////////////////////////////////


////////////// Trial Events ////////////////////////////////////////////

/* set trial intervals in milliseconds */
var blankLength = 500;
var studyLength = 2000;


/* initialize necessary variables */
var response; /* temporary response container */
var accuracy; /* temporary accuracy container */

var expBegin = "NA"; /* first stimulus timestamp */
var expEnd = "NA"; /* end of experiment timestamp */

var trialCount = 0; /* trial counter / keeps track of which trial the subject is on */
var keytest = 0; /* enables and disables keypress effects / only allows responses when keytest == 1 */
var subject = new Date().getTime(); /* creates timestamp for unique subject identifier */

/* trial events in chronological order */
function studyBlank() {
    keytest = 0; /*disable keypresses */
    $("#study").hide();
    $("#study").removeClass("up");
    $("#study").removeClass("down");

    eventTimer.setTimeout(studyTarget, blankLength);
}

function studyTarget() {
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");
    $("#study").addClass(trialArray[trialCount].orientation);
    $("#study").html("<img src='" + trialArray[trialCount].image + "'></img>");
    $("#study").show();
    if (trialCount != trialArray.length - 1) {
        eventTimer.setTimeout(studyBlank, studyLength);
    } else {
        eventTimer.setTimeout(endStudy, studyLength);
    }
    trialCount++
}

function endStudy() {
    $("#study").hide();
    shuffle(trialArray);
    trialCount = 0;

    $("#test").show();
}

function testBlank() {
    $("#test").hide();

    $("#left").removeClass("up");
    $("#left").removeClass("down");
    $("#right").removeClass("up");
    $("#right").removeClass("down");

    eventTimer.setTimeout(testTarget, blankLength);
}

function testTarget() {
    time1 = new Date().getTime();
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");

    $("#left").addClass(trialArray[trialCount].orientation);
    $("#right").addClass(trialArray[trialCount].orientation);

    $("#" + trialArray[trialCount].imageLocation).html("<img src='" + trialArray[trialCount].image + "'></img>");
    $("#" + trialArray[trialCount].lureLocation).html("<img src='" + trialArray[trialCount].lure + "'></img>");


    $("#test").show();
}




////////////// Set up initial display & button functions //////////////////////////////////////
pagination.setup();


/* end instructions and begin experiment */
$("#beginExp").click(function () {

    if (preLoad.manualCheck()) {
        $(".instructionDisplay").hide();
        $(".countDisplay").html(trialCount + " / " + trialArray.length + " trials");
        $(".top").show();
        $(".targetDisplay").removeClass("initHidden");
        $(".targetDisplay").css("display", "flex");
        $(".targetDisplay").addClass("flexCenter");
    } else {
        $(".targetDisplay").css("display", "none");
        $(".instructionDisplay").css("display", "none");
        $("#loading").show();
    }

    // blank();
});


$("#startStudy").click(function () {
    expBegin = new Date().getTime();
    $("#study").html("");
    studyBlank();
})

$("#startTest").click(function () {
    $("#testInstructions").hide();
    $("#test").removeClass("initHidden");
    $("#test").addClass("flexRow");
    $("#test").css("display", "flex");
    $("#test").hide();
    testBlank();
})



/* download data file */
$("#downloadCSV").click(function () {
    /* adds header row to beginning of array and saves csv file */
    exportObjectToCSV('FaceInversion - ' + subject + '.csv', trialArray);
});




/* gets button ID and html from button for response */
function getRecResponse(btnID) {
    //    $("#test").hide();
    time2 = new Date().getTime(); /* get timestamp for response */

    trialArray[trialCount].subject = subject;
    trialArray[trialCount].memoryTrial = trialCount + 1;
    trialArray[trialCount].reactionTime = time2 - time1;
    trialArray[trialCount].response = btnID;


    if (btnID === trialArray[trialCount].imageLocation.toLowerCase()) {
        trialArray[trialCount].accuracy = 1;
    } else {
        trialArray[trialCount].accuracy = 0;
    }
    if (trialCount != trialArray.length - 1) {
        trialCount++; /* increase trial counter by one */
        testBlank();
    } else {
        $(".targetDisplay").hide()
        getSummary();

        $("#resultsDisplay").toggleClass("initHidden");
        $("#resultsDisplay").css("display", "flex");
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

/* summarize the data */
function getSummary() {
    for (i = 0; i <= trialArray.length - 1; i++) {
        if (trialArray[i].material === "face") {
            if (trialArray[i].orientation === "up") {
                summary.RTFaceUp.push(trialArray[i].reactionTime);
                summary.ACCFaceUp.push(trialArray[i].accuracy);
            } else {
                summary.RTFaceDown.push(trialArray[i].reactionTime);
                summary.ACCFaceDown.push(trialArray[i].accuracy);
            }
        } else {
            if (trialArray[i].orientation === "up") {
                summary.RTHouseUp.push(trialArray[i].reactionTime);
                summary.ACCHouseUp.push(trialArray[i].accuracy);
            } else {
                summary.RTHouseDown.push(trialArray[i].reactionTime);
                summary.ACCHouseDown.push(trialArray[i].accuracy);
            }
        }

    }


    // For d3.js charts //
    D3Data = [
        {
            condition: "Face - Upright",
            response:  (1-calcAVG(summary.ACCFaceUp)) * 100
        },
        {
            condition: "Face - Inverted",
            response: (1-calcAVG(summary.ACCFaceDown)) * 100
        },
        {
            condition: "House - Upright",
            response: (1-calcAVG(summary.ACCHouseUp)) * 100
        },
        {
            condition: "House - Inverted",
            response: (1-calcAVG(summary.ACCHouseDown)) * 100
        }
    ];

//
//    // For Google Form //
    var googleURL = "https://docs.google.com/forms/d/e/1FAIpQLScRBdUKmF3M4QBmwZCfCLWEyo36qMoZYQfqZbKlWibpB8TcOw/formResponse"
    var data = {
        // Instructor's name // 
        "entry.836651089": document.getElementsByName("instructor")[0].value,
        
        // subject ID //
        "entry.508578446": trialArray[0].subject,

        // RTs //
        // faces //
        "entry.1339517662": calcAVG(summary.RTFaceUp),
        "entry.464346576": calcAVG(summary.RTFaceDown),

        // houses //
        "entry.907587456": calcAVG(summary.RTHouseUp),
        "entry.976557265": calcAVG(summary.RTHouseDown),
        
        // ACC //
        // faces //
        "entry.992061188": (1-calcAVG(summary.ACCFaceUp))*100,
        "entry.739534827": (1-calcAVG(summary.ACCFaceDown))*100,

        // houses //
        "entry.468725422": (1-calcAVG(summary.ACCHouseUp))*100,
        "entry.1567685492": (1-calcAVG(summary.ACCHouseDown))*100




    }
    // send to google form ///
    postToGoogle(googleURL, data);
}





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
