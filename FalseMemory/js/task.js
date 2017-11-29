/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */


//cats = [];
//for (i = 0; i<= Battig.length-1; i++){
//    if (cats.indexOf(Battig[i].catname) <= -1){
//        cats.push(Battig.[i].catname)
//    }
//}

// List of Categories //
var categoryNames = ["four-footed animal", "kitchen utensil", "alcoholic beverage", "insect", "musical instrument", "type of ship", "occupation or profession", "chemical element", "snake", "bldg for religious servic", "type of fuel", "metal", "carpenters tool", "city", "country", "part of a building", "kind of cloth", "substance to flavor food", "science", "college or university", "girls first name", "type of music", "nonalcoholic beverage", "weapon", "color", "fish", "type of reading material", "type of vehicle", "natural earth formation", "article of furniture", "sport", "toy", "kind of money", "fruit", "type of footgear", "tree", "military title", "article of clothing", "flower", "crime", "weather phenomenon", "relative", "member of the clergy", "bird", "disease", "type of dance", "males first name", "vegetable", "type of human dwelling", "elective office", "precious stone", "part of the human body", "unit of time", "unit of distance", "state", "part of speech"]

var omitCategory = ["college or university", "girls first name", "elective office", "males first name"]


//////////////// Stim & Trial Array Creation //////////////////////////////////
/* Creates the trial array for study phase */
var trialType = ["capital", "rhyme", "category", "sentence"];
var nTrials = 8; // # of trials per trialType
var trialArray = [];
var memoryArray = [];

var wordList = Battig;
var words = [];
var studyWords = [];
var conditions = ["yes", "no"];
var counter = 0;

var oldCapital = [];
var oldRhyme = [];
var oldCategory = [];
var oldSentence = [];
var newWords = [];
var allWords = [];

function createTrialArray() {
    var r = [0, 1];
    for (n = 0; n <= trialType.length - 1; n++) {
        for (t = 0; t <= (nTrials / 2 - 1); t++) {
            for (c = 0; c <= 1; c++) {
                var w, nw, temp, match

                w = newShuffle(Battig).pop();
                w.word = w.word.replace("-", " ")
                match = findMatch(w.word,words)
                while (RiTa.getSyllables(w.word.replace("-", " ")).split("/").length != 2 || //only 2-syllable words
                    match === 1 || //don't allow repeat words
                    w.word.split(" ").length > 1 || //don't allow any item with more than one word
                    omitCategory.indexOf(w.catname) > -1 //don't allow item from omitCategory
                ) {
                    w = newShuffle(Battig).pop();
                    w.word = w.word.replace("-", " ")
                    match = findMatch(w.word,words)
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
                    memoryResponse: 0
                };

                if (temp.cResponse === "yes") {
                    temp.rhyme = newShuffle(w.rhymes)[0];
                    temp.sentence = newShuffle(w.sentences)[0];
                    temp.category = w.catname;
                    if (temp.encodingCondition === "capital") {
                        temp.word = temp.word.toUpperCase();
                    } else {

                        r = myShuffle(r);

                        if (r[0] === 1) {
                            temp.word = temp.word.toUpperCase();
                        }
                    }
                } else {
                    nw = newShuffle(Battig)[0];

                    temp.rhyme = newShuffle(nw.rhymes)[0];
                    temp.sentence = newShuffle(nw.sentences)[0];
                    temp.category = nw.catname;
                }

                if (temp.encodingCondition === "capital") {
                    oldCapital.push(temp.word)
                } else if (temp.encodingCondition === "rhyme") {
                    oldRhyme.push(temp.word)
                } else if (temp.encodingCondition === "category") {
                    oldCategory.push(temp.word)
                } else if (temp.encodingCondition === "sentence") {
                    oldSentence.push(temp.word)
                }

                trialArray.push(temp);


            }

        }

    }

    trialArray = newShuffle(trialArray)


}

function createMemoryTest() {
    var n = trialArray.length;
    memoryArray = memoryArray.concat(trialArray);
    for (i = 0; i <= n - 1; i++) {
        var w, nw, temp, match
        console.log(i)
        w = newShuffle(Battig).pop()
        w.word = w.word.replace("-", " ")
        match = findMatch(w.word,words)
        while (RiTa.getSyllables(w.word.replace("-", " ")).split("/").length != 2 || //only 2-syllable words
            match === 1 || //don't allow repeat words
            w.word.split(" ").length > 1 || //don't allow any item with more than one word
            omitCategory.indexOf(w.catname) > -1 //don't allow item from omitCategory
        ) {
            w = newShuffle(Battig).pop()
            w.word = w.word.replace("-", " ")
            match = findMatch(w.word,words)
        };

        words.push(w.word);
        temp = {
            date: new Date(),
            subject: trialArray[0].subject,
            trial: "NA",
            encodingCondition: "NA",
            word: w.word,
            wordType: "new",
            cResponse: "NA",
            response: "NA",
            memoryResponse: 0
        };

        var r = [0, 1];
        r = newShuffle(r);

        if (r[0] === 1) {
            temp.word = temp.word.toUpperCase();
        }
        console.log(temp.word)
        newWords.push(temp.word)
        memoryArray.push(temp)
    }

    allWords = allWords.concat(newWords).concat(oldCapital).concat(oldCategory).concat(oldRhyme).concat(oldSentence)
    allWords = newShuffle(allWords);

    for (list = 0; list <= allWords.length - 1; list++) {
        var d1 = document.getElementById('memoryList');
        d1.insertAdjacentHTML('beforeend', '<li><input class="custom" type="checkbox" name="' + allWords[list] + '" value="' + allWords[list] + '">' + allWords[list] + '</input></li>');
    }
}

function createCheckboxElement(name, checked) {
    var radioHtml = '<input type="checkbox" name="' + name + '"';
    if (checked) {
        radioHtml += ' checked="checked"';
    }
    radioHtml += '/>';

    var radioFragment = document.createElement('div');
    radioFragment.innerHTML = radioHtml;

    return radioFragment.firstChild;
}


function findMatch(item,array) {
    var match
    match = 0;
    for (look = 0; look <= array.length - 1; look ++){
        if (array[look]===item){
            match = 1;
        }
    }
    return match;
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
        $("#targetTask").html("Is the word a(n) " + trialArray[trialCount].category + " ?")
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

$("#startTrials").click(function (){
    $("#firstTrial").hide();
    blank();
})

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
        createMemoryTest();
        $("#2-phase").toggleClass("initHidden");
        $("#2-phase").toggleClass("flexCenter")
        $("#2-instructions").show();

    }
});

$("#noResponse").click(function () {
    $("#1-target").hide();

    time2 = new Date().getTime(); /* get timestamp for response */

    trialArray[trialCount].trial = trialCount + 1
    trialArray[trialCount].subject = subject;
    trialArray[trialCount].reactionTime = time2 - time1;
    trialArray[trialCount].response = "no";

    if (trialCount != trialArray.length - 1) {
        trialCount++; /* increase trial counter by one */
        blank();
    } else {
        $("#1-phase").hide();
        createMemoryTest();
        $("#2-phase").toggleClass("initHidden");
        $("#2-phase").toggleClass("flexCenter")
        $("#2-instructions").show();

    }
});

var checked = [];
var results = [0, 0, 0, 0, 0];
$("#submitResponse").click(function () {

    $(".custom:checked").each(function () {
        checked.push($(this).val())
    });

    for (i = 0; i <= checked.length - 1; i++) {
        for (c = 0; c <= oldCapital.length - 1; c++) {
            if (checked[i] === oldCapital[c]) {
                results[0]++
            }
        }
    }

    for (i = 0; i <= checked.length - 1; i++) {
        for (c = 0; c <= oldRhyme.length - 1; c++) {
            if (checked[i] === oldRhyme[c]) {
                results[1]++
            }
        }
    }


    for (i = 0; i <= checked.length - 1; i++) {
        for (c = 0; c <= oldCategory.length - 1; c++) {
            if (checked[i] === oldCategory[c]) {
                results[2]++
            }
        }
    }

    for (i = 0; i <= checked.length - 1; i++) {
        for (c = 0; c <= oldSentence.length - 1; c++) {
            if (checked[i] === oldSentence[c]) {
                results[3]++
            }
        }
    }

    for (i = 0; i <= checked.length - 1; i++) {
        for (c = 0; c <= newWords.length - 1; c++) {
            if (checked[i] === newWords[c]) {
                results[4]++
            }
        }
    }
    
    results[4] = newWords.length - results[4];
    
    for (i = 0; i<= memoryArray.length-1; i++){
        for (m = 0; m<= checked.length-1; m++){
            if (checked[m] === memoryArray[i].word){ 
                memoryArray[i].memoryResponse = 1;
            }
        }
    }
    
    
    // For d3.js charts //
    D3Data = [
        {
            condition: "Case",
            response: (results[0]/oldCapital.length)*100
        },
        {
            condition: "Rhyme",
            response: (results[1]/oldRhyme.length)*100
        },
        {
            condition: "Category",
            response: (results[2]/oldCategory.length)*100
        },
        {
            condition: "Sentence",
            response: (results[3]/oldSentence.length)*100
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
