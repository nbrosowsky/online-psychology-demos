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

var wordLists = [
    {
        lure: "man",
        list: ["woman", "husband", "uncle", "lady", "mouse", "male", "father", "strong", "friend", "beard", "person", "handsome", "muscle", "suit", "old"]
},
    {
        lure: "mountain",
        list: ["hill", "valley", "climb", "summit", "top", "molehill", "peak", "plain", "glacier", "goat", "bike", "climber", "range", "steep", "ski"]
},
    {
        lure: "music",
        list: ["note", "sound", "piano", "sing", "radio", "band", "melody", "horn", "concert", "instrument", "symphony", "jazz", "orchestra", "art", "rhythm"]
},
    {
        lure: "needle",
        list: ["thread", "pin", "eye", "sewing", "sharp", "point", "prick", "thimble", "haystack", "thorn", "hurt", "injection", "syringe", "cloth", "knitting"]
},
    {
        lure: "pen",
        list: ["pencil", "write", "fountain", "leak", "quill", "felt", "Bic", "scribble", "crayon", "Cross", "tip", "marker", "red", "cap", "letter"]
},
    {
        lure: "river",
        list: ["water", "stream", "lake", "Mississippi", "boat", "tide", "swim", "flow", "run", "barge", "creek", "brook", "fish", "bridge", "winding"]
},
    {
        lure: "rough",
        list: ["smooth", "bumpy", "road", "tough", "sandpaper", "jagged", "ready", "coarse", "uneven", "riders", "rugged", "sand", "boards", "ground", "gravel"]
},
    {
        lure: "rubber",
        list: ["elastic", "bounce", "gloves", "tire", "ball", "eraser", "springy", "foam", "galoshes", "soles", "latex", "glue", "flexible", "resilient", "stretch"]
},
    {
        lure: "shirt",
        list: ["blouse", "sleeves", "pants", "tie", "button", "shorts", "iron", "polo", "collar", "vest", "pocket", "jersey", "belt", "linen", "cuffs"]
},
    {
        lure: "sleep",
        list: ["bed", "rest", "awake", "tired", "dream", "wake", "snooze", "blanket", "doze", "slumber", "snore", "nap", "peace", "yawn", "drowsy"]
},
    {
        lure: "slow",
        list: ["fast", "lethargic", "stop", "listless", "snail", "cautious", "delay", "traffic", "turtle", "hesitant", "speed", "quick", "sluggish", "wait", "molasses"]
},
    {
        lure: "smell",
        list: ["nose", "breathe", "sniff", "aroma", "hear", "see", "nostril", "whiff", "scent", "reek", "stench", "fragrance", "perfume", "salts", "rose"]
},
    {
        lure: "smoke",
        list: ["cigarette", "puff", "blaze", "billows", "pollution", "ashes", "cigar", "chimney", "fire", "tobacco", "stink", "pipe", "lungs", "flames", "stain"]
},
    {
        lure: "soft",
        list: ["hard", "light", "pillow", "plush", "loud", "cotton", "fur", "touch", "fluffy", "feather", "furry", "downy", "kitten", "skin", "tender"]
},
    {
        lure: "spider",
        list: ["web", "insect", "bug", "fright", "fly", "arachnid", "crawl", "tarantula", "poison", "bite", "creepy", "animal", "ugly", "feelers", "small"]
},
    {
        lure: "sweet",
        list: ["sour", "candy", "sugar", "bitter", "good", "taste", "tooth", "nice", "honey", "soda", "chocolate", "heart", "cake", "tart", "pie"]
},
    {
        lure: "thief",
        list: ["steal", "robber", "crook", "burglar", "money", "cop", "bad", "rob", "jail", "gun", "villain", "crime", "bank", "bandit", "criminal"]
},
    {
        lure: "trash",
        list: ["garbage", "waste", "can", "refuse", "sewage", "bag", "junk", "rubbish", "sweep", "scraps", "pile", "dump", "landfill", "debris", "litter"]
},
    {
        lure: "window",
        list: ["door", "glass", "pane", "shade", "ledge", "sill", "house", "open", "curtain", "frame", "view", "breeze", "sash", "screen", "shutter"]
},
    {
        lure: "anger",
        list: ["mad", "fear", "hate", "rage", "temper", "fury", "ire", "wrath", "happy", "fight", "hatred", "mean", "calm", "emotion", "enrage"]
},
    {
        lure: "army",
        list: ["Navy", "soldier", "UnitedStates", "rifle", "AirForce", "draft", "military", "Marines", "march", "infantry", "captain", "war", "uniform", "pilot", "combat"]
},
    {
        lure: "black",
        list: ["white", "dark", "cat", "charred", "night", "funeral", "color", "grief", "blue", "death", "ink", "bottom", "coal", "brown", "gray"]
},
    {
        lure: "bread",
        list: ["butter", "food", "eat", "sandwich", "rye", "jam", "milk", "flour", "jelly", "dough", "crust", "slice", "wine", "loaf", "toast"]
},
    {
        lure: "car",
        list: ["truck", "bus", "train", "automobile", "vehicle", "drive", "jeep", "Ford", "race", "keys", "garage", "highway", "sedan", "van", "taxi"]
},
    {
        lure: "chair",
        list: ["table", "sit", "legs", "seat", "couch", "desk", "recliner", "sofa", "wood", "cushion", "swivel", "stool", "sitting", "rocking", "bench"]
},
    {
        lure: "city",
        list: ["town", "crowded", "state", "capital", "streets", "subway", "country", "NewYork", "village", "metropolis", "big", "Chicago", "suburb", "county", "urban"]
},
    {
        lure: "cold",
        list: ["hot", "snow", "warm", "winter", "ice", "wet", "frigid", "chilly", "heat", "weather", "freeze", "air", "shiver", "Arctic", "frost"]
},
    {
        lure: "cup",
        list: ["mug", "saucer", "tea", "measuring", "coaster", "lid", "handle", "coffee", "straw", "goblet", "soup", "stein", "drink", "plastic", "sip"]
},
    {
        lure: "doctor",
        list: ["nurse", "sick", "lawyer", "medicine", "health", "hospital", "dentist", "physician", "ill", "patient", "office", "stethoscope", "surgeon", "clinic", "cure"]
},
    {
        lure: "flag",
        list: ["banner", "American", "symbol", "stars", "anthem", "stripes", "pole", "wave", "raised", "national", "checkered", "emblem", "sign", "freedom", "pendant"]
},
    {
        lure: "foot",
        list: ["shoe", "hand", "toe", "kick", "sandals", "soccer", "yard", "walk", "ankle", "arm", "boot", "inch", "sock", "knee", "mouth"]
},
    {
        lure: "fruit",
        list: ["apple", "vegetable", "orange", "kiwi", "citrus", "ripe", "pear", "banana", "berry", "cherry", "basket", "juice", "salad", "bowl", "cocktail"]
},
    {
        lure: "girl",
        list: ["boy", "dolls", "female", "young", "dress", "pretty", "hair", "niece", "dance", "beautiful", "cute", "date", "aunt", "daughter", "sister"]
},
    {
        lure: "high",
        list: ["low", "clouds", "up", "tall", "tower", "jump", "above", "building", "noon", "cliff", "sky", "over", "airplane", "dive", "elevate"]
},
    {
        lure: "king",
        list: ["queen", "England", "crown", "prince", "George", "dictator", "palace", "throne", "chess", "rule", "subjects", "monarch", "royal", "leader", "reign"]
},
    {
        lure: "lion",
        list: ["tiger", "circus", "jungle", "tamer", "den", "cub", "Africa", "mane", "cage", "feline", "roar", "fierce", "bears", "hunt", "pride"]
 }
]


//////////////// Stim & Trial Array Creation //////////////////////////////////
/* Creates the trial array for study phase */
var nTrials = 12; // # of words per memory task (max: 15)
var nLists = 6; // # of lists to recall

var trialArray = [];
var memoryItems = {
    lures: [],
    old: [],
    newUn: [],
    newWeak: []
}

/* create word lists for memory task */
function createTrialArray() {
    for (n = 0; n <= nLists - 1; n++) {
        var w
        myShuffle(wordLists)
        w = wordLists.pop();

        temp = {
            date: new Date(),
            subject: "",
            trial: "",
            words: myShuffle(w.list.slice(0, nTrials)),
            lure: w.lure,
            FRresponse: [],
            FRaccuracy: []
        };

        memoryItems.lures = memoryItems.lures.concat(temp.lure)
        memoryItems.old = memoryItems.old.concat(myShuffle(temp.words).slice(0, 2))
        memoryItems.newWeak = memoryItems.newWeak.concat(w.list.slice(12, 14))

        myShuffle(wordLists)
        w = wordLists.pop();
        memoryItems.newUn = memoryItems.newUn.concat(myShuffle(w.list).slice(12, 14))

        trialArray.push(temp)
    }

}

/* creates the checkBoxes for recognition memory test */
function createMemoryTest() {
    var allWords = [];
    allWords = allWords.concat(memoryItems.lures).concat(memoryItems.old).concat(memoryItems.newUn).concat(memoryItems.newWeak)
    allWords = myShuffle(allWords);

    for (list = 0; list <= allWords.length - 1; list++) {
        var d1 = document.getElementById('memoryList');
        d1.insertAdjacentHTML('beforeend', '<li><input class="custom" type="checkbox" name="' + allWords[list] + '" value="' + allWords[list] + '">' + allWords[list] + '</input></li>');
    }
}


/* not needed?? */
//function createCheckboxElement(name, checked) {
//    var radioHtml = '<input type="checkbox" name="' + name + '"';
//    if (checked) {
//        radioHtml += ' checked="checked"';
//    }
//    radioHtml += '/>';
//
//    var radioFragment = document.createElement('div');
//    radioFragment.innerHTML = radioHtml;
//
//    return radioFragment.firstChild;
//}

//
//function findMatch(item, array) {
//    var match
//    match = 0;
//    for (look = 0; look <= array.length - 1; look++) {
//        if (array[look] === item) {
//            match = 1;
//        }
//    }
//    return match;
//}

//////////////////////////////////////////////////////////////////////



////////////// Trial Events ////////////////////////////////////////////

/* set trial intervals in milliseconds */
var blankLength = 500;
var memoryLength = 1000;


var trialCount = 0; /* trial counter / keeps track of which trial the subject is on */
var wordCount = 0; /* tracks which word the subject is on during study phasen */
var keytest = 0; /* enables and disables keypress effects / only allows responses when keytest == 1 */

var subject = new Date().getTime(); /* creates timestamp for unique subject identifier */

/* trial events in chronological order */


/* 1. blank screen */
function blank() {
    $("#1-target").hide();
    
    
    if (wordCount === nTrials) {
        /* go to free recall */
        wordCount = 0;
        eventTimer.setTimeout(freeRecall, blankLength)

    } else {
        /* go to next word */
        eventTimer.setTimeout(trial, blankLength);
    }
}


/* 2. word presentation for memoryLength milliseconds */
function trial() {
    /* update counter display */
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");

    /*show word*/

    ////


    wordCount++
    eventTimer.setTimeout(blank, memoryLength);
}

/* 3. display free recall test */
function freeRecall(){
    /* show free recall div */
    
    ///
    
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


$("#submitFreeRecallResponse").click(function(){
    /* determine accuracy / match words to lists */
    
    /* match words using the RiTa minimum distance function? */
    
    ////
    if (trialCount === nTrials - 1){
        /* show instructions for recogntion memory phase */
        /* do I want a distractor task?? */
    } else {
        /* show instructions for next list */
        
    }
    
    
})


$("#submitRecognitionResponse").click(function(){
    
})



/* download data file */
$("#downloadCSV").click(function () {
    exportObjectToCSV('levelsOfProcessing - ' + subject + '.csv', memoryArray);
});



//$("#yesResponse").click(function () {
//    $("#1-target").hide();
//
//    time2 = new Date().getTime(); /* get timestamp for response */
//
//    trialArray[trialCount].trial = trialCount + 1
//    trialArray[trialCount].subject = subject;
//    trialArray[trialCount].reactionTime = time2 - time1;
//    trialArray[trialCount].response = "yes";
//
//    if (trialCount != trialArray.length - 1) {
//        trialCount++; /* increase trial counter by one */
//        blank();
//    } else {
//        $("#1-phase").hide()
//        createMemoryTest();
//        $("#2-phase").toggleClass("initHidden");
//        $("#2-phase").toggleClass("flexCenter")
//        $("#2-instructions").show();
//
//    }
//});
//
//$("#noResponse").click(function () {
//    $("#1-target").hide();
//
//    time2 = new Date().getTime(); /* get timestamp for response */
//
//    trialArray[trialCount].trial = trialCount + 1
//    trialArray[trialCount].subject = subject;
//    trialArray[trialCount].reactionTime = time2 - time1;
//    trialArray[trialCount].response = "no";
//
//    if (trialCount != trialArray.length - 1) {
//        trialCount++; /* increase trial counter by one */
//        blank();
//    } else {
//        $("#1-phase").hide();
//        createMemoryTest();
//        $("#2-phase").toggleClass("initHidden");
//        $("#2-phase").toggleClass("flexCenter")
//        $("#2-instructions").show();
//
//    }
//});
//
//
//
//var checked = [];
//var results = [0, 0, 0, 0, 0];
//$("#submitResponse").click(function () {
//
//    $(".custom:checked").each(function () {
//        checked.push($(this).val())
//    });
//
//    for (i = 0; i <= checked.length - 1; i++) {
//        for (c = 0; c <= oldCapital.length - 1; c++) {
//            if (checked[i] === oldCapital[c]) {
//                results[0]++
//            }
//        }
//    }
//
//    for (i = 0; i <= checked.length - 1; i++) {
//        for (c = 0; c <= oldRhyme.length - 1; c++) {
//            if (checked[i] === oldRhyme[c]) {
//                results[1]++
//            }
//        }
//    }
//
//
//    for (i = 0; i <= checked.length - 1; i++) {
//        for (c = 0; c <= oldCategory.length - 1; c++) {
//            if (checked[i] === oldCategory[c]) {
//                results[2]++
//            }
//        }
//    }
//
//    for (i = 0; i <= checked.length - 1; i++) {
//        for (c = 0; c <= oldSentence.length - 1; c++) {
//            if (checked[i] === oldSentence[c]) {
//                results[3]++
//            }
//        }
//    }
//
//    for (i = 0; i <= checked.length - 1; i++) {
//        for (c = 0; c <= newWords.length - 1; c++) {
//            if (checked[i] === newWords[c]) {
//                results[4]++
//            }
//        }
//    }
//
//    results[4] = newWords.length - results[4];
//
//    for (i = 0; i <= memoryArray.length - 1; i++) {
//        for (m = 0; m <= checked.length - 1; m++) {
//            if (checked[m] === memoryArray[i].word) {
//                memoryArray[i].memoryResponse = 1;
//            }
//        }
//    }
//
//
//    // For d3.js charts //
//    D3Data = [
//        {
//            condition: "Case",
//            response: (results[0] / oldCapital.length) * 100
//        },
//        {
//            condition: "Rhyme",
//            response: (results[1] / oldRhyme.length) * 100
//        },
//        {
//            condition: "Category",
//            response: (results[2] / oldCategory.length) * 100
//        },
//        {
//            condition: "Sentence",
//            response: (results[3] / oldSentence.length) * 100
//        },
//
//    ];
//
//    $("#2-instructions").hide();
//    createChart();
//    $("#resultsDisplay").show();
//
//})


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