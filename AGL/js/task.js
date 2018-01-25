/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */



//////////////// Stim & Trial Array Creation //////////////////////////////////

var grammar = {
    cite: "Jamieson & Mewhort, 2010; Exp. 2",
    study: ["MTTTTV", "MTTVT", "MTV", "MTVRX", "MTVRXM", "MVRX", "MVRXRR", "MVRXTV", "MVRXV", "MVRXVT", "VXM", "VXRR", "VXRRM", "VXRRRR", "VXTTVT", "VXTVRX", "VXTVT", "VXVRX", "VXVRXV", "VXVT"],
    testGram: ["VXV", "VXVRX", "VXVRXV", "VXVRXR", "VXVT", "VXR", "VXRM", "VXRRR", "VXRRRM", "VXTV", "VXTTV", "VXTTTV", "MVRXVT", "MVRXM", "MVRXR", "MVRXRM", "MVT", "MTV", "MTVRXV", "MTVRXR", "MTVT", "MTTV", "MTTVRX", "MTTTV", "MTTTVT"],
    testUnGram: ["XVRVM", "XRVXV", "XTTTTV", "VXX", "VXMRXV", "VXRVM", "VXRRT", "VXRT", "VVXRM", "VRRRM", "MXVRXM", "MXVT", "MVRTR", "MMVRX", "MTVV", "MTVRTR", "MTM", "MTRV", "MTRVRX", "MTTVTR", "RVT", "RRRXV", "TXRRM", "TVTTXV", "TTVT"]
}


// create study trials //
var studyList = shuffle(grammar.study)

var uID;
if (window.opener) {
    uID = window.opener.userID
} else {
    uID = new Date().getTime();
}

/* Creates the trial array */
var trialArray = [];
var expStart = new Date().getTime();
var expID = "test Exp"
//
//for (i=0; i<=(grammar.testGram.length)-1; i++){

for (i = 0; i <= 3; i++) {
    trialArray.push({
        expStart: expStart,
        expID: expID,
        userID: uID,
        grammar: grammar.cite,
        trial: "",
        trialType: "grammatical",
        stimulus: grammar.testGram[i],
        response: "",
        RT: ""
    })
}

//for (i=0; i<=(grammar.testUnGram.length)-1; i++){
for (i = 0; i <= 3; i++) {
    trialArray.push({
        expStart: expStart,
        expID: expID,
        userID: uID,
        grammar: grammar.cite,
        trial: "",
        trialType: "ungrammatical",
        stimulus: grammar.testUnGram[i],
        response: "",
        RT: ""
    })
}

trialArray = shuffle(trialArray);

for (i = 0; i <= trialArray.length - 1; i++) {
    trialArray[i].trial = i + 1
}

//////////////////////////////////////////////////////////////////////


////////////// Trial Events ////////////////////////////////////////////

/* set trial intervals in milliseconds */
var blankLength = 200;
var studyLength = 300;


var expBegin = "NA"; /* first stimulus timestamp */
var expEnd = "NA"; /* end of experiment timestamp */

var trialCount = -1; /* trial counter / keeps track of which trial the subject is on */
var keytest = 0; /* enables and disables keypress effects / only allows responses when keytest == 1 */
var subject = new Date().getTime(); /* creates timestamp for unique subject identifier */
var time1, time2


// study events //

/* trial events in chronological order */
function studyBlank() {
    trialCount++
    keytest = 0; /*disable keypresses */
    $("#study").hide();

    eventTimer.setTimeout(studyTarget, blankLength);
}

function studyTarget() {
    $(".countDisplay").html((trialCount + 1) + " /" + studyList.length + " trials");
    $("#study").text(studyList[trialCount]);
    $("#study").show();


    if (trialCount != studyList.length - 1) {
        eventTimer.setTimeout(studyBlank, studyLength);
    } else {
        eventTimer.setTimeout(endStudy, studyLength);
    }

}

function endStudy() {
    // reset trial counter
    trialCount = -1;

    // hide study display
    $("#studyDisplay").hide();

    // show test instructions
    $("#testInstructions").show();

    // change modal instructions //
    $("#modalText").text("We will present you with new letter strings (i.e., ones you did not study). Your task is to rate how rule-compliant or rule-violating each new string is. If you are at a loss, use your gut feeling.")
}


// testing events //

function testBlank() {

    trialCount++
    $("#grammarTask").hide();

    if (trialCount != trialArray.length) {
        eventTimer.setTimeout(testTarget, blankLength);
    } else {
        $("#testDisplay").hide();
        $("#ruleDisplay").show();
    }

}

function testTarget() {
    time1 = window.performance.now();
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");
    $("#wordDisplay").html(trialArray[trialCount].stimulus)


    $("#grammarTask").show()


}

function endExp() {
    //.replace(/[^\w\s]/gi, '');//
    var rules = $("#ruleResponse").val()
    rules = rules.replace(/(\r\n|\n|\r)/gm, ' ')
    window.opener.data.ruleResponse = rules;
    window.opener.data.trialArray = trialArray
    window.opener.data.studyList = studyList
    window.opener.data.grammar = grammar.cite
    window.opener.data.expStart = expStart
    window.close()
}



////////////// Set up initial display & button functions //////////////////////////////////////

disableBS(); // disable backspace key
modalInit(); // initiate the modal instruction

// INITIAL DISPLAY //
// display counter
$(".countDisplay").html(0 + " / " + studyList.length + " trials");
$("#topCounter").show();

// display study instructions
$("studyInstructions").show();

// hide all others
$("#testInstructions").hide();
$("#studyDisplay").hide();
$("#testDisplay").hide();
$("#ruleDisplay").hide();


////////////////////////

// initiate the slider from nouislider.js
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [0],
    step: 1,
    range: {
        'min': -100,
        'max': 100
    },
    tooltips: false
});

///// initiate buttons ////


$("#startStudy").click(function () {
    // mark the beginning of the experiment
    expBegin = new Date().getTime();

    // hide study instructions
    $("#studyInstructions").hide();

    // show study display
    $("#studyDisplay").show();

    // trigger study trials
    // initiate blank screen 
    studyBlank();

})

$("#startTest").click(function () {
    // hide instructions
    $("#testInstructions").hide();

    // show test display
    $("#testDisplay").show();

    // init blank screen 
    testBlank();
})


$("#submitResponse").click(function () {

    if (slider.noUiSlider.get() != 0) {
        time2 = window.performance.now();
        $("#grammarTask").hide();

        trialArray[trialCount].response = slider.noUiSlider.get();
        trialArray[trialCount].RT = time2 - time1;

        slider.noUiSlider.set(0);

        testBlank();
    }
})

$("#submitRuleResponse").click(function () {
    endExp();
})
