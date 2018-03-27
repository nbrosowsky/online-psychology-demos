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
var wordList = [
    [
    ["2882067", "subject", "verb", 0.785351079598824, 0.8],
     ["2492931", "roots", "leaves", 0.782615083629316, 0.8],
     ["2780933", "square", "kilometers", 0.801444817115917, 0.8],
     ["57205", "afraid", "glad", 0.81819572142572, 0.8],
     ["3017670", "thousand", "fifty", 0.789677940934106, 0.8],
     ["2581215", "sentence", "topic", 0.814799983652612, 0.8],
     ["473249", "closed", "opened", 0.791796633824209, 0.8],
     ["301985", "breathe", "pollution", 0.790121590316345, 0.8],
     ["1500051", "iron", "steel", 0.780679327027744, 0.8],
     ["612476", "corn", "wheat", 0.810346299886881, 0.8],
     ["1447261", "income", "tax", 0.795589190795942, 0.8],
     ["2080249", "payments", "cash", 0.816372679150008, 0.8],
     ["1626122", "ledger", "accounts", 0.782969249022421, 0.8],
     ["918038", "electrons", "nucleus", 0.781847513189151, 0.8],
     ["920920", "elements", "compounds", 0.802698137581777, 0.8],
     ["1273915", "gold", "silver", 0.790096265799716, 0.8],
     ["1538094", "journal", "recorded", 0.801437777543523, 0.8],
     ["703780", "debit", "balance", 0.807368438249394, 0.8]
    ],
    [
     ["1862450", "moon", "planets", 0.706584368157105, 0.7],
     ["2706952", "smell", "taste", 0.700682433445736, 0.7],
     ["421894", "chart", "illustration", 0.691132033761052, 0.7],
     ["377810", "cat", "dog", 0.709198996984343, 0.7],
     ["1412119", "hydrogen", "oxygen", 0.688799818687421, 0.7],
     ["58662", "africa", "continent", 0.693165700784038, 0.7],
     ["41005", "address", "letter", 0.713295238673127, 0.7],
     ["3255647", "winter", "summer", 0.715684895584075, 0.7],
     ["468452", "climate", "weather", 0.680756933396662, 0.7],
     ["2749739", "spain", "france", 0.717879820795504, 0.7],
     ["581784", "constitution", "citizens", 0.717953858861197, 0.7],
     ["830422", "drawing", "map", 0.69530390042604, 0.7],
     ["848159", "driving", "drive", 0.682062835569625, 0.7],
     ["2070176", "patient", "nurse", 0.6899630084035, 0.7],
     ["891018", "education", "schools", 0.707327139257636, 0.7],
     ["90397", "amounts", "numbers", 0.714573953962584, 0.7]
    ], [
     ["2071690", "patients", "hospital", 0.597779743525485, 0.6],
     ["1512256", "item", "merchandise", 0.615937379665932, 0.6],
     ["1167792", "foods", "nutrients", 0.595454703438719, 0.6],
     ["3137754", "vapor", "cycle", 0.61471889721349, 0.6],
     ["2247152", "product", "price", 0.581324735273314, 0.6],
     ["2571687", "sell", "purchase", 0.610571341031582, 0.6],
     ["2514155", "russia", "china", 0.587878337858451, 0.6],
     ["1057924", "farm", "farming", 0.595318878002463, 0.6],
     ["2294623", "purpose", "reader", 0.590072399447625, 0.6],
     ["249705", "birds", "wild", 0.607669350599406, 0.6],
     ["2162672", "policies", "federal", 0.603861558066556, 0.6],
     ["150613", "atoms", "particles", 0.606365844555079, 0.6],
     ["133951", "asia", "lands", 0.594017864324026, 0.6],
     ["2433996", "republican", "communist", 0.605231510316026, 0.6],
     ["3032700", "tissue", "nerve", 0.594509380892965, 0.6],
     ["482823", "clothing", "stomach", 0.587708372956215, 0.6]
    ], [
     ["225501", "beings", "race", 0.515643934423346, 0.5],
     ["1389894", "hour", "hundred", 0.514253917060449, 0.5],
     ["2175634", "population", "increase", 0.484215682792129, 0.5],
     ["570887", "congress", "committee", 0.491351322009404, 0.5],
     ["2375602", "record", "check", 0.498954018092289, 0.5],
     ["778785", "differences", "cultural", 0.492285882509959, 0.5],
     ["3162059", "volume", "measure", 0.481149444631783, 0.5],
     ["1926302", "nice", "pretty", 0.507167486129421, 0.5],
     ["956855", "environment", "survive", 0.501857983805291, 0.5],
     ["2526461", "salt", "swimming", 0.481800729253396, 0.5],
     ["2993537", "territory", "britain", 0.504283004509216, 0.5],
     ["931467", "employees", "wages", 0.482061442761539, 0.5],
     ["1957112", "objects", "moving", 0.489703541123535, 0.5],
     ["597985", "contract", "agreement", 0.489243472105631, 0.5],
     ["3256480", "wire", "field", 0.490908335728762, 0.5],
     ["2084054", "peoples", "culture", 0.485361783914497, 0.5],
     ["2672025", "sir", "replied", 0.512736770661537, 0.5],
     ["2303666", "quality", "prices", 0.488837878195143, 0.5],
     ["2251077", "products", "sold", 0.481606376681098, 0.5]
    ], [
     ["2542659", "science", "scientist", 0.404149212170001, 0.4],
     ["2449719", "response", "sexual", 0.413930300539493, 0.4],
     ["1770233", "maybe", "bad", 0.411556524139755, 0.4],
     ["292389", "branches", "grass", 0.401239034968446, 0.4],
     ["279155", "boston", "chicago", 0.411293088869573, 0.4],
     ["1843830", "miss", "id", 0.390350852850091, 0.4],
     ["245985", "billion", "twenty", 0.404633477388755, 0.4],
     ["274924", "bones", "skin", 0.400649662028935, 0.4],
     ["546285", "completed", "prepared", 0.418442859498453, 0.4],
     ["2509670", "rules", "principles", 0.405023340270611, 0.4],
     ["2230648", "printed", "pages", 0.418981990513392, 0.4],
     ["394251", "centuries", "eastern", 0.391401874273917, 0.4],
     ["909047", "election", "popular", 0.404389937887918, 0.4],
     ["1469636", "industries", "competition", 0.40874785819788, 0.4],
     ["2442627", "research", "technology", 0.394559353428718, 0.4],
     ["2543193", "scientific", "based", 0.381171999804811, 0.4],
     ["694125", "date", "sales", 0.404560475384258, 0.4],
     ["1416889", "ideas", "develop", 0.385634763050891, 0.4],
     ["3004303", "theres", "youre", 0.405836233340092, 0.4]
    ], [
     ["97340", "animal", "growth", 0.312595342842193, 0.3],
     ["1661186", "lines", "direction", 0.31743307923229, 0.3],
     ["1471376", "industry", "centers", 0.310420367636806, 0.3],
     ["1185268", "forms", "consists", 0.303528694431196, 0.3],
     ["1285640", "grandfather", "died", 0.314607834393881, 0.3],
     ["298810", "breakfast", "till", 0.300962188111944, 0.3],
     ["549767", "complex", "nature", 0.289903871710655, 0.3],
     ["2859085", "stretched", "fingers", 0.285612958520643, 0.3],
     ["1813076", "metals", "mixture", 0.312038526129882, 0.3],
     ["1217575", "fun", "telling", 0.288316122176924, 0.3],
     ["2910597", "supported", "official", 0.281900863098649, 0.3],
     ["2457426", "return", "additional", 0.302656714288611, 0.3],
     ["1066116", "farms", "smaller", 0.282698209043617, 0.3],
     ["1337740", "heads", "slightly", 0.286961565854575, 0.3],
     ["3016160", "thoughts", "listening", 0.295785416991342, 0.3],
     ["2607292", "shape", "depends", 0.318776643685027, 0.3],
     ["2562422", "security", "organization", 0.291458765849535, 0.3],
     ["1442760", "includes", "humans", 0.299867915150731, 0.3],
     ["2396369", "related", "main", 0.287843958416724, 0.3],
     ["999733", "expect", "happens", 0.294655647745817, 0.3]
    ], [
     ["460005", "clay", "figures", 0.210299343129992, 0.2],
     ["19211", "action", "mechanical", 0.202805274173243, 0.2],
     ["1579119", "lack", "depend", 0.215088868780173, 0.2],
     ["1998427", "operations", "developed", 0.185223108169168, 0.2],
     ["2968152", "techniques", "concept", 0.218080434385521, 0.2],
     ["1816029", "methods", "construction", 0.217231579491965, 0.2],
     ["315340", "broad", "winds", 0.184241532543247, 0.2],
     ["3006497", "thick", "cutting", 0.181772578732847, 0.2],
     ["1006023", "expensive", "stock", 0.192051958147323, 0.2],
     ["1031129", "faces", "passing", 0.189274179338262, 0.2],
     ["2414350", "remember", "goes", 0.211858796351243, 0.2],
     ["1007251", "experience", "manner", 0.211818530001043, 0.2],
     ["2263010", "promised", "full", 0.187355336915869, 0.2],
     ["3084974", "trouble", "dream", 0.19642591054264, 0.2],
     ["492862", "coat", "forward", 0.181141931144916, 0.2],
     ["2444995", "resources", "created", 0.182246776061301, 0.2],
     ["850371", "drop", "keeps", 0.181680031548595, 0.2],
     ["2565870", "seeing", "likely", 0.19772875608129, 0.2],
     ["1600710", "laughed", "beautiful", 0.196356107708351, 0.2]
    ], [
     ["685960", "dangerous", "employer", 0.099978461642666, 0.1],
     ["2260472", "progress", "widely", 0.116286899998509, 0.1],
     ["1686642", "looks", "curve", 0.0985389344260236, 0.1],
     ["1591995", "largely", "ends", 0.114374394311119, 0.1],
     ["2243772", "produces", "slow", 0.0844287352698142, 0.1],
     ["2204910", "present", "library", 0.100633800338362, 0.1],
     ["3074508", "tree", "loss", 0.0910709439312235, 0.1],
     ["1757848", "married", "earlier", 0.0834484664265149, 0.1],
     ["2379729", "records", "greatly", 0.115076973626292, 0.1],
     ["690895", "darkness", "worked", 0.0820853991136878, 0.1],
     ["841786", "drink", "safety", 0.085122418967671, 0.1],
     ["1590137", "language", "easily", 0.0802102821369702, 0.1],
     ["2762956", "speed", "original", 0.119202768217796, 0.1],
     ["2643186", "showed", "throw", 0.100120911732328, 0.1],
     ["1654808", "liked", "rest", 0.116913744243289, 0.1],
     ["2938537", "taking", "traveled", 0.0897115677719809, 0.1],
     ["1392643", "hours", "truck", 0.111282415698605, 0.1],
     ["2354246", "ready", "hold", 0.0955310424025508, 0.1],
     ["2266377", "properly", "decide", 0.119189793077321, 0.1],
     ["228802", "believed", "loose", 0.0934222511278437, 0.1]
    ], [
     ["2599767", "settled", "bright", -0.0172707454309154, 0],
     ["882420", "eaten", "attitude", 0.0188212521939273, 0],
     ["720573", "demand", "edge", -0.0172005923243676, 0],
     ["2957318", "taxes", "despite", 0.0143496449899846, 0],
     ["1212444", "fuel", "bonds", 0.0110580662597833, 0],
   //  ["1358491", "hes", "crime", -0.0184008097377504, 0],
     ["1561495", "killed", "mineral", 0.0183856084003457, 0],
     ["803579", "disease", "silence", 0.0125582686364545, 0],
     ["1535572", "joined", "fig", -0.0157205096843587, 0],
     ["1490408", "interests", "molecules", 0.0120848969054383, 0],
     ["2720565", "soft", "formal", -0.00772000867448695, 0],
     ["2640451", "shouted", "higher", 0.00919979575882743, 0],
     ["2339606", "rays", "gods", 0.0172149631436903, 0],
     ["2575523", "senate", "shoulder", 0.000328929602309891, 0],
     ["2372245", "recognize", "entire", -0.00692163346048279, 0],
     ["240234", "bent", "serve", 0.000374310622024485, 0],
     ["1349071", "helped", "analysis", -0.0150672313404402, 0],
     ["1290213", "grandpa", "rich", -0.00726002458964169, 0],
     ["109223", "appearance", "tobacco", -0.0114532287593999, 0]
    ]
]

///////////// create study trials ////////////////
var mTurkID,
    fbID,
    trialArray = [],
    newWordsArray = [],
    expStart = new Date().getTime(),
    expID = "Exp1",
    i,
    demo,
    expEnd = "incomplete",
    probeTimer


if (window.opener) {
    fbID = window.opener.userID
} else {
    fbID = new Date().getTime();
}

// create study trial array //

// number of words per condition
var Nwords = 1

// for each similarity condition... //
for (s = 0; s <= 8; s++) {
    // ... select six words
    for (i = 0; i <= Nwords - 1; i++) {
        var l, i, selectOne, words

        l = ["up", "down"]
        shuffle(l)

        selectOne = shuffle(wordList[s]).shift()

        //Do we want to shuffle prime/probe? Or always make word 1 prime and word 2 probe?
        words = [selectOne[1], selectOne[2]]
        shuffle(words)

        trialArray.push({
            expID: expID,
            firebaseId: fbID,
            word: words[1],
            wordType: 'old',
            location: l[0],
            prime: words[0],
            similarity: selectOne[4],
            assignmentId: mTurk.turkInfo().assignmentId,
            hitId: mTurk.turkInfo().hitId,
            previewMode: mTurk.turkInfo().hitId,
            workerId: mTurk.turkInfo().workerId,
            locationTrial: "",
            locationResponse: "",
            locationRT: "",
            locationACC: "",
            memoryTrial: "",
            memoryResponse: "",
            memoryRT: "",
            memoryACC: ""
        })
    }
}

// select words for identical prime/probe
for (i = 0; i <= Nwords - 1; i++) {
    var l, i, selectOne, words, index

    // randomly choose a similarity condition
    index = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    shuffle(index)

    // randomly choose a location for prime
    l = ["up", "down"]
    shuffle(l)

    selectOne = shuffle(wordList[index[0]]).shift()

    //Do we want to shuffle prime/probe? Or always make word 1 prime and word 2 probe?
    words = [selectOne[1], selectOne[2]]
    shuffle(words)

    trialArray.push({
        expID: expID,
        firebaseId: fbID,
        word: words[1],
        wordType: 'old',
        location: l[0],
        prime: words[1],
        similarity: 1,
        assignmentId: mTurk.turkInfo().assignmentId,
        hitId: mTurk.turkInfo().hitId,
        previewMode: mTurk.turkInfo().hitId,
        workerId: mTurk.turkInfo().workerId,
        locationTrial: "",
        locationResponse: "",
        locationRT: "",
        locationACC: "",
        memoryTrial: "",
        memoryResponse: "",
        memoryRT: "",
        memoryACC: ""
    })
}


trialArray = shuffle(trialArray);


// create array of new words (to be added after the study phase) //

// flatten array of remaining words
var leftover = [].concat.apply([], wordList)

for (i = 0; i <= (Nwords * 10) - 1; i++) {

    var l, i, selectOne, words
    selectOne = shuffle(leftover).shift()

    //Do we want to shuffle prime/probe? Or always make word 1 prime and word 2 probe?
    words = [selectOne[1], selectOne[2]]
    shuffle(words)

    newWordsArray.push({
        expID: expID,
        firebaseId: fbID,
        word: words[1],
        wordType: 'new',
        location: 'NA',
        prime: "NA",
        assignmentId: mTurk.turkInfo().assignmentId,
        hitId: mTurk.turkInfo().hitId,
        previewMode: mTurk.turkInfo().hitId,
        workerId: mTurk.turkInfo().workerId,
        locationTrial: "NA",
        locationResponse: "NA",
        locationRT: "NA",
        locationACC: "NA",
        memoryTrial: "",
        memoryResponse: "",
        memoryRT: "",
        memoryACC: ""
    })

}



//////////////////////////////////////////////////////////////////////




////////////// Trial Events ////////////////////////////////////////////

/* set trial intervals in milliseconds */
var blankLength = 250,
    primeLength = 500,
    fixateLength = 500,
    targetLength = 1000,
    feedbackLength = 1000



var expBegin = "NA",
    expEnd = "NA"

var trialCount = -1; /* trial counter / keeps track of which trial the subject is on */
var keytest = false; /* enables and disables keypress effects / only allows responses when keytest == 1 */
var time1, time2
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
    $("#down").html("");

    eventTimer.setTimeout(studyPrime, blankLength);
}

/* 3. Prime word */
function studyPrime() {
    $("#center").html(trialArray[trialCount].prime.toUpperCase())
    eventTimer.setTimeout(studyProbe, primeLength);
}

/* 4. Blank 3 */
function studyBlank3() {
    /* clear all target displays */
    $("#up").html("");
    $("#center").html("");
    $("#down").html("");

    eventTimer.setTimeout(studyProbe, blankLength);
}

/* 4. Probe word */
function studyProbe() {
    time1 = window.performance.now();
    keytest = true;

    /* clear all target displays */
    $("#up").html("");
    $("#center").html("");
    $("#down").html("");

    $("#" + trialArray[trialCount].location).html(trialArray[trialCount].word.toUpperCase())
    probeTimer = eventTimer.setTimeout(studyResponse, targetLength);
}

/* 5. Blank / wait for response */
function studyResponse() {
    $("#up").html("");
    //$("#center").html("");
    $("#down").html("");
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
    var fbData
    fbData.data = memoryArray;
    fbData.expStart = expStart;
    fbData.expEnd = new Date().getTime();
    fbData.demographics = {
        country: $("#country").val(),
        sex: $("[name='sex']").val(),
        age: $("#age").val(),
        hand: $("[name='hand']").val(),
        vision: $("[name='vision']").val(),
        language: $("[name='language']").val(),
        firebaseID: fbID,
        assignmentId: mTurk.turkInfo().assignmentId,
        hitId: mTurk.turkInfo().hitId,
        workerId: mTurk.turkInfo().workerId

    };
    window.opener.data = fbData;
    $("#data", opener.window.document).val(JSON.stringify(memoryArray));
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
    console.log(event.keyCode)

    if (phase != "instructions") {
        event.preventDefault();
        if (!keytest) {
            return
        };


        if (phase == "prime") {
            if (event.keyCode != 38 && event.keyCode != 40) {
                return
            }

            keytest = false; /* disable keypresses */
            time2 = window.performance.now(); /* get timestamp for response */

            /* collect response / force to lower case */
            response = event.keyCode;
            if (response == 38) {
                response = "up"
            } else if (response == 40) {
                response = "down"
            }

            /* determine accuracy */
            if (response == trialArray[trialCount].location) {
                accuracy = 1
            } else {
                accuracy = 0
            };

            trialArray[trialCount].locationTrial = trialCount + 1
            trialArray[trialCount].locationResponse = response;
            trialArray[trialCount].locationT1 = time1;
            trialArray[trialCount].locationT2 = time2;
            trialArray[trialCount].locationRT = time2 - time1;
            trialArray[trialCount].locationACC = accuracy;

            /* create summary data */

            /* display feedback */
            //$("#up").html("");
            //$("#down").html("");


            eventTimer.setTimeout(feedback, 1000 - (time2 - time1))

        }

        if (phase == "probe") {
            if (String.fromCharCode(event.which).toLowerCase() != 'o' && String.fromCharCode(event.which).toLowerCase() != 'n') {
                return
            }

            keytest = false; /* disable keypresses */
            time2 = window.performance.now(); /* get timestamp for response */

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

            /* create summary data */

            /* display feedback */
            //            $("#up").html("");
            //            $("#down").html("");
            //
            //            if (response == trialArray[trialCount].cResponse) {
            //                /* When response is correct... */
            //                $('#' + trialArray[trialCount].location).html('<p style="font-size: 40px; text-align: center; color: green"> correct </p>');
            //            } else {
            //                /* when response is incorrect... */
            //                $('#' + trialArray[trialCount].location).html('<p style="font-size: 40px; text-align: center; color: red"> incorrect </p>');
            //            }


            if (trialCount != memoryArray.length - 1) {
                testBlank();
            } else {

                endExp();
            }
        }
    }



});
