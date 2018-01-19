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
        userID: window.opener.userID,
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
        userID: window.opener.userID,
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
    $("#study").hide();
    trialCount = -1;
    $("#grammarTask").hide();
    $("#test").show();
}


// testing events //

function testBlank() {

    trialCount++
    $("#grammarTask").hide();

    if (trialCount != trialArray.length) {
        eventTimer.setTimeout(testTarget, blankLength);
    } else {
        window.opener.data.trialArray = trialArray
        window.opener.data.studyList = studyList
        window.opener.data.grammar = grammar.cite
        window.opener.data.expStart = expStart
        window.close()
    }

}

function testTarget() {
    time1 = window.performance.now();
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");
    $("#wordDisplay").html(trialArray[trialCount].stimulus)


    $("#grammarTask").show()


}




////////////// Set up initial display & button functions //////////////////////////////////////

pagination.setup(); // setup pagination for instructions
disableBS(); // disable backspace key
modalInit(); // initiate the modal instruction

// initiate the slider from nouislider.js
var slider = document.getElementById('slider');

noUiSlider.create(slider, {
    start: [0],
    step: 1,
    range: {
        'min': -100,
        'max': 100
    },
    tooltips: true
});

///// initiate buttons ////
/* end instructions and begin experiment */
$("#beginExp").click(function () {
    // hide instructions
    $(".instructionDisplay").hide();

    // display counter
    $(".countDisplay").html(0 + " / " + studyList.length + " trials");
    $(".top").show();

    // deal with flex / jquery issues //
    $(".targetDisplay").removeClass("initHidden");
    $(".targetDisplay").css("display", "flex");
    $(".targetDisplay").addClass("flexCenter");

});


$("#startStudy").click(function () {
    // mark the beginning of the experiment
    expBegin = new Date().getTime();

    // clear the study display & fix font-size //
    $("#study").html("");
    $("#study").css("font-size", "60px");

    // initiate blank screen 
    studyBlank();

})

$("#startTest").click(function () {
    // hide instructions
    $("#testInstructions").hide();

    // deal with flex / jquery issues //
    $("#grammarTask").removeClass("initHidden")
    $("#grammarTask").addClass("flexCenter")
    $("#grammarTask").addClass("flexColumn")
    $("#test").removeClass("initHidden")
    $("#test").addClass("flexCenter")

    // init blank screen 
    testBlank();
})


$("#submitResponse").click(function () {
    time2 = window.performance.now();
    $("#grammarTask").hide();

    trialArray[trialCount].response = slider.noUiSlider.get();
    trialArray[trialCount].RT = time2 - time1;

    slider.noUiSlider.set(0);

    testBlank();

})
