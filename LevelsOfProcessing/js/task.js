/**
 * @fileoverview Creates task stimuli and events
 * 
 * @author N.P. Brosowsky (nbrosowsky@gmail.com)
 * 
 */



/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */



//////////////// Stim & Trial Array Creation //////////////////////////////////
/* Creates the trial array for study phase */
var trialType = ["capital", "rhyme", "category", "sentence"];
var nTrials = 8; // # of trials per trialType
var memoryArray = [],
    trialArray = [],
    newWords = [],
    extraWords = [],
    selectedWords;
var ref = firebase.database().ref();


// get words from firebase database
// if error get words from fallback list 
ref.on("value", function (snapshot) {
    selectedWords = (shuffle(snapshot.val()).slice(0, (nTrials * (trialType.length)) * 3));
    createTrialArray();
}, function (error) {
    console.log("Error: " + error.code);
    selectedWords = (shuffle(fallbackWords).slice(0, (nTrials * (trialType.length)) * 3));
    createTrialArray();
});




function createTrialArray() {
    var date = new Date(),
        subject, i


    //choose one sentence, one rhyme, and discard the rest
    for (i = 0; i <= selectedWords.length - 1; i++) {
        selectedWords[i].word = selectedWords[i].word.toString();
        selectedWords[i].catname = selectedWords[i].catname.toString().toUpperCase();
        selectedWords[i].sentence = shuffle(selectedWords[i].sentences)[0]
        delete selectedWords[i]['sentences'];
        selectedWords[i].rhyme = shuffle(selectedWords[i].rhymes)[0].toUpperCase();
        delete selectedWords[i]['rhymes'];
    }


    trialArray = shuffle(selectedWords).splice(0, selectedWords.length / 3);
    newWords = shuffle(selectedWords).splice(0, selectedWords.length / 2);
    extraWords = selectedWords;



    (userID != undefined) ? subject = userID: subject = new Date().getTime()

    for (i = 0; i <= trialArray.length - 1; i++) {

        // add generic info to new word lists
        newWords[i].wordType = "new";
        newWords[i].response = "NA";
        newWords[i].memoryResponse = 0;
        newWords[i].date = date;
        newWords[i].trial = "NA";
        newWords[i].subject = subject;

        // make half new words uppercase
        if (i % 2 > 0) {
            newWords[i].word = newWords[i].word.toUpperCase()
        }

        //add generic info to old word list
        trialArray[i].wordType = "old";
        trialArray[i].response = "";
        trialArray[i].memoryResponse = 0;
        trialArray[i].date = date;
        trialArray[i].trial = "";
        trialArray[i].subject = subject;



        //create Capital letter trials
        if (i <= (trialArray.length / 4) - 1) {
            trialArray[i].encodingCondition = "capital"

            //half yes/no
            if (i % 2 > 0) {
                trialArray[i].cResponse = "yes"
                trialArray[i].word = trialArray[i].word.toUpperCase()
            } else {
                trialArray[i].cResponse = "no"
            }

            //create rhyming trials
        } else if (i <= (trialArray.length / 4) * 2 - 1) {
            trialArray[i].encodingCondition = "rhyme"

            //half yes/no
            if (i % 2 > 0) {
                trialArray[i].cResponse = "yes"

                //randomly make half the "yes" words uppercase
                if (shuffle([0, 1])[0] == 1) {
                    trialArray[i].word = trialArray[i].word.toUpperCase()
                }
            } else {
                trialArray[i].cResponse = "no"

                //take rhyme from extra words for non-rhyming word
                trialArray[i].rhyme = extraWords[i].rhyme

                //randomly make half the "no" words uppercase
                if (shuffle([0, 1])[0] == 1) {
                    trialArray[i].word = trialArray[i].word.toUpperCase()
                }
            }
        } else if (i <= (trialArray.length / 4) * 3 - 1) {
            trialArray[i].encodingCondition = "category"

            //half yes/no
            if (i % 2 > 0) {
                trialArray[i].cResponse = "yes"

                //randomly make half the "yes" words uppercase
                if (shuffle([0, 1])[0] == 1) {
                    trialArray[i].word = trialArray[i].word.toUpperCase()
                }
            } else {
                trialArray[i].cResponse = "no"

                //take catname from extra words for non-matching category
                trialArray[i].catname = extraWords[i].catname

                //randomly make half the "no" words uppercase
                if (shuffle([0, 1])[0] == 1) {
                    trialArray[i].word = trialArray[i].word.toUpperCase()
                }
            }
        } else {
            trialArray[i].encodingCondition = "sentence"

            //half yes/no
            if (i % 2 > 0) {
                trialArray[i].cResponse = "yes"

                //randomly make half the "yes" words uppercase
                if (shuffle([0, 1])[0] == 1) {
                    trialArray[i].word = trialArray[i].word.toUpperCase()
                }
            } else {
                trialArray[i].cResponse = "no"

                //take catname from extra words for non-matching sentence
                trialArray[i].sentence = extraWords[i].sentence

                //randomly make half the "no" words uppercase
                if (shuffle([0, 1])[0] == 1) {
                    trialArray[i].word = trialArray[i].word.toUpperCase()
                }
            }
        }
    }

    shuffle(trialArray)

    memoryArray = trialArray.concat(newWords)
    memoryArray = shuffle(memoryArray)

    for (list = 0; list <= memoryArray.length - 1; list++) {
        var d1 = document.getElementById('memoryList');
        d1.insertAdjacentHTML('beforeend', '<li><input class="custom" type="checkbox" name="' + memoryArray[list].word + '" value="' + memoryArray[list].word + '">' + memoryArray[list].word + '</input></li>');
    }
    
    ref.off();
}

//////////////////////////////////////////////////////////////////////



////////////// Trial Events ////////////////////////////////////////////

/* set trial intervals in milliseconds */
var blankLength = 400;
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
    eventTimer.setTimeout(trial, blankLength);
}


/* 4. stim presentation / present until response */
function trial() {
    /* update counter display */
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");

    /* present target stim */
    $("#targetWord").css("visibility", "hidden")
    $("#targetTask").hide();
    $("#responseBtns").css("visibility", "hidden")

    if (trialArray[trialCount].encodingCondition === "capital") {
        $("#targetTask").html("Is the word in capital letters?")

    }

    if (trialArray[trialCount].encodingCondition === "rhyme") {
        $("#targetTask").html("Does the word rhyme with " + trialArray[trialCount].rhyme.toUpperCase() + " ?")

    }

    if (trialArray[trialCount].encodingCondition === "category") {
        $("#targetTask").html("Is the word a(n) " + trialArray[trialCount].catname + " ?")
    }

    if (trialArray[trialCount].encodingCondition === "sentence") {
        $("#targetTask").html("Would the word fit the sentence: <br />" + "'..." + trialArray[trialCount].sentence + "...'" + " ?")
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
    $("#responseBtns").css("visibility", "visible")

}


////////////// Set up initial display & button functions //////////////////////////////////////
/* end instructions and begin experiment */
$("#beginExp").click(function () {
    $("#1-instructions").hide();
    $(".countDisplay").html(trialCount + " / " + trialArray.length + " trials");
    $(".top").show();

    $("#firstTrial").show();
    $("#1-target").hide();
});

$("#startTrials").click(function () {
    $("#firstTrial").hide();
    blank();
})

$("#yesResponse").click(function () {
    $("#1-target").hide();

    // record response
    time2 = new Date().getTime(); /* get timestamp for response */
    trialArray[trialCount].trial = trialCount + 1;
    trialArray[trialCount].reactionTime = time2 - time1;
    trialArray[trialCount].response = "yes";

    // next trial
    if (trialCount != trialArray.length - 1) {
        trialCount++; /* increase trial counter by one */
        blank();
    } else {
        $("#1-phase").hide()
        $(".top").hide();
        $("#2-phase").toggleClass("initHidden");
        $("#2-phase").toggleClass("flexCenter")
        $("#2-instructions").show();

    }
});

$("#noResponse").click(function () {
    $("#1-target").hide();

    // record response
    time2 = new Date().getTime(); /* get timestamp for response */
    trialArray[trialCount].trial = trialCount + 1;
    trialArray[trialCount].reactionTime = time2 - time1;
    trialArray[trialCount].response = "no";

    // next trial
    if (trialCount != trialArray.length - 1) {
        trialCount++; /* increase trial counter by one */
        blank();
    } else {
        $("#1-phase").hide();
        $(".top").hide();
        createMemoryTest();
        $("#2-phase").toggleClass("initHidden");
        $("#2-phase").toggleClass("flexCenter")
        $("#2-instructions").show();

    }
});



// add memory responses to memoryArray and summarize for D3.js chart

$("#submitResponse").click(function () {
    var checked = [],
        results = [0, 0, 0, 0, 0],
        oldCapitalR, oldRhymeR, oldCatR, oldSentenceR, newWordsR

    // get names of all checked boxes
    $(".custom:checked").each(function () {
        checked.push($(this).val())
    });


    //find words marked as old
    for (i = 0; i <= memoryArray.length - 1; i++) {
        for (m = 0; m <= checked.length - 1; m++) {
            if (checked[m] === memoryArray[i].word) {
                memoryArray[i].memoryResponse = 1;
            }
        }

        //aggregate results for D3.js chart
        if (memoryArray[i].memoryResponse === 1) {
            if (memoryArray[i].encodingCondition === "capital") {
                results[0]++
            }
            if (memoryArray[i].encodingCondition === "rhyme") {
                results[1]++
            }
            if (memoryArray[i].encodingCondition === "category") {
                results[2]++
            }
            if (memoryArray[i].encodingCondition === "sentence") {
                results[3]++
            }


        }
    }


    // create D3.js chart //
    D3Data = [
        {
            condition: "Case",
            response: (results[0] / nTrials) * 100
        },
        {
            condition: "Rhyme",
            response: (results[1] / nTrials) * 100
        },
        {
            condition: "Category",
            response: (results[2] / nTrials) * 100
        },
        {
            condition: "Sentence",
            response: (results[3] / nTrials) * 100
        },

    ];

    $("#2-instructions").hide();
    createChart();
    $("#resultsDisplay").show();

})


/* download data file */
$("#downloadCSV").click(function () {
    exportObjectToCSV('levelsOfProcessing - ' + subject + '.csv', memoryArray);
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


/* shuffle array */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
