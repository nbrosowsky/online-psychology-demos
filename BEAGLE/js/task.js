/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */



//////////////// Stim & Trial Array Creation //////////////////////////////////

wordList = [
["diamond", "ruby", "emerald", "sapphire", "pearl", "gem", "gemstone", "amethyst", "opal", "gold", "topaz", "garnet", "silver", "jade", "quartz", "turquoise"],
["hour", "second", "minute", "year", "day", "month", "decade", "century", "centuries", "week", "millisecond", "millennium", "nanosecond", "eon"],
["steel", "iron", "silver", "copper", "gold", "aluminum", "platinum", "titanium", "tin", "bronze", "nickel", "lead", "brass", "zinc"],
["magazine", "book", "newspaper", "novel", "journal", "article", "textbook", "pamphlet", "internet", "website", "internetarticle", "paper", "comic", "comicbook", "encyclopedia", "essay", "flyer", "letter", "periodical", "shortstory"],
["sergeant", "general", "lieutenant", "captain", "private", "colonel", "major", "corporal", "officer", "commander", "admiral", "chief", "soldier", "cadet"],
["dog", "cat", "horse", "lion", "bear", "tiger", "cow", "elephant", "deer", "mouse", "pig", "rat", "giraffe", "squirrel", "rabbit", "goat", "zebra", "moose", "sheep", "cheetah", "raccoon", "wolf", "fox", "hamster", "donkey", "elk", "lizard", "turtle"],
["cotton", "silk", "polyester", "wool", "nylon", "rayon", "satin", "spandex", "denim", "leather", "linen", "fleece", "velvet", "jean", "suede", "cashmere", "cloth", "flannel", "lace", "lycra", "blue"],
["red", "green", "yellow", "purple", "orange", "black", "white", "pink", "brown", "grey", "violet", "silver", "gold", "indigo", "magenta", "turquoise", "maroon", "teal", "tan", "aqua", "fuchsia"],
["knife", "fork", "spoon", "spatula", "pan", "pot", "whisk", "blender", "bowl", "ladle", "plate", "cutting", "tongs", "can", "mixer", "strainer", "colander", "cup", "stove"],
["church", "temple", "synagogue", "mosque", "cathedral", "chapel", "monastery", "house", "home", "sanctuary"],
["chair", "table", "couch", "bed", "desk", "sofa", "dresser", "loveseat", "coffee", "lamp", "nightstand", "ottoman", "recliner", "stool", "end", "futon", "armoire", "bookshelf", "bookcase", "cabinet"],
["foot", "shelf", "leg", "arm", "foot", "feet", "finger", "head", "toe", "eye", "hand", "nose", "ear", "mouth", "stomach", "heart", "knee", "neck", "brain", "hair", "elbow", "shoulder", "chest", "back", "butt", "lip", "thigh", "ankle", "face", "liver", "lung", "tongue", "teeth", "torso", "wrist", "bone", "penis", "breast", "hip", "muscle", "nail"],
["apple", "orange", "banana", "grape", "pear", "peach", "strawberry", "kiwi", "pineapple", "watermelon", "tomato", "plum", "grapefruit", "mango", "cherry", "lemon", "blueberry", "cantaloupe", "raspberry", "lime", "tangerine", "melon", "nectarine", "papaya", "apricot", "honeydew", "starfruit"],
["gun", "knife", "sword", "bat", "bomb", "fist", "rope", "mace", "axe", "grenade", "missile", "pistol", "handgun", "club", "hammer", "nunchucks", "stick", "bazooka", "blade", "spear"],
["house", "apartment", "mansion", "condominium", "cave", "shack", "hut", "tent", "dorm", "dormitory", "townhouse", "trailer", "tepee", "cabin", "hotel", "car", "igloo", "boat", "box"],
["beer", "vodka", "wine", "rum", "whiskey", "tequila", "gin", "margarita", "liquor", "champagne", "scotch", "bacardi", "martini", "smirnoff", "bourbon"],
["hammer", "nail", "saw", "screwdriver", "drill", "wrench", "screw", "level", "ruler", "wood", "sander", "knife", "chisel", "pencil", "sandpaper", "nailgun", "pliers"],
["priest", "pope", "bishop", "nun", "cardinal", "minister", "pastor", "deacon", "father", "rabbi", "monk", "reverend", "archbishop", "preacher"],
["salt", "pepper", "garlic", "sugar", "oregano", "spice", "cinnamon", "paprika", "ketchup", "butter", "basil", "vanilla", "mustard", "onion", "vinegar", "herbs", "lemon", "tabasco", "oil", "thyme", "curry", "nutmeg", "parsley"],
["gasoline", "gas", "diesel", "oil", "unleaded", "coal", "solar", "sun", "food", "electricity", "kerosene", "propane", "water", "premium", "regular", "fossil", "leaded", "wood", "hydrogen"],
["doctor", "teacher", "lawyer", "nurse", "fireman", "firefighter", "professor", "accountant", "psychologist", "dentist", "engineer", "secretary", "manager", "cook", "policeman", "athlete", "banker", "carpenter", "janitor", "scientist", "student"],
["mountain", "river", "ocean", "volcano", "lake", "valley", "hill", "rock", "canyon", "plateau", "tree", "plain", "cave", "glacier", "island", "stream", "cliff", "desert", "beach", "dirt", "grass", "waterfall"],
["football", "basketball", "soccer", "baseball", "tennis", "hockey", "swimming", "golf", "volleyball", "lacrosse", "track", "rugby", "softball", "skiing", "cheerleading", "running", "gymnastics", "polo", "racquetball", "wrestling", "bowling", "badminton", "cricket"],
["tornado", "hurricane", "rain", "snow", "hail", "flood", "lightning", "blizzard", "earthquake", "sleet", "monsoon", "thunder", "wind", "tsunami", "storm", "thunderstorm", "typhoon", "drought", "cloud", "sunshine"],
["shirt", "pants", "sock", "underwear", "shoe", "hat", "short", "jacket", "sweater", "bra", "skirt", "jeans", "coat", "dress", "t-shirt", "gloves", "sweatshirt", "boxers", "scarf", "blouse", "tie", "belt", "undershirt"],
["window", "door", "floor", "wall", "roof", "stairs", "steps", "stairway", "stairwell", "staircase", "elevator", "room", "ceiling", "basement", "cellar", "bathroom", "office", "hallway", "hall", "lobby", "brick", "foundation", "entrance", "attic", "carpet"],
["oxygen", "hydrogen", "carbon", "helium", "nitrogen", "gold", "iron", "silver", "sodium", "potassium", "sulfur", "zinc", "copper", "chlorine", "neon", "calcium", "aluminum", "boron", "lithium", "mercury", "magnesium", "water", "argon", "fluorine", "lead", "nickel", "uranium"],
["drum", "guitar", "flute", "piano", "trumpet", "clarinet", "saxophone", "violin", "trombone", "tuba", "cello", "oboe", "bass", "viola", "harp", "horn", "keyboard", "piccolo", "banjo", "harmonica", "cymbal", "organ", "tambourine"],
["dollar", "penny", "cent", "dime", "nickel", "quarter", "peso", "yen", "coin", "franc", "euro", "pound", "check", "lira", "ruble", "bill", "cash", "paper"],
["rap", "rock", "classical", "country", "jazz", "pop", "alternative", "punk", "blues", "reggae", "oldies", "techno", "bluegrass", "soul", "gospel", "opera", "folk", "dance", "metal", "ska"],
["eagle", "robin", "bluejay", "cardinal", "hawk", "bluebird", "crow", "hummingbird", "parrot", "sparrow", "pigeon", "seagull", "dove", "parakeet", "falcon", "canary", "owl", "ostrich", "penguin", "raven", "duck", "finch", "mockingbird", "woodpecker", "flamingo", "oriole", "blackbird", "chicken", "vulture"],
["water", "coke", "milk", "juice", "soda", "sprite", "pepsi", "tea", "coffee", "lemonade", "gatorade", "kool-aid", "pop", "punch", "root"],
["car", "bus", "truck", "airplane", "plane", "train", "bike", "bicycle", "van", "boat", "ship", "motorcycle", "suv", "skateboard", "subway", "taxi", "cab", "scooter", "helicopter", "jeep", "moped", "ford", "minivan"],
["biology", "chemistry", "physics", "psychology", "astronomy", "geology", "earth", "anatomy", "sociology", "kinesiology", "physiology", "anthropology", "biochemistry"],
["doll", "car", "ball", "truck", "lego", "block", "train", "bike", "boat", "puzzle", "computer", "nintendo", "yo-yo"],
["ballet", "tango", "salsa", "jazz", "waltz", "tap", "swing", "ballroom", "break", "line", "square", "slow", "merengue", "macarena", "foxtrot", "mambo"],
["carrot", "lettuce", "broccoli", "tomato", "cucumber", "peas", "corn", "potato", "celery", "onion", "spinach", "squash", "bean", "cauliflower", "cabbage", "radish", "asparagus", "pepper", "tomatoes", "beet", "potatoes", "turnip", "zucchini"],
["sandal", "boot", "heels", "shoe", "tennis", "sneaker", "slipper", "sock", "dress", "nike", "adidas", "clog", "cleat", "loafer", "pump", "reebok", "ant", "spider", "bee", "mosquito", "beetle", "grasshopper", "butterfly", "wasp", "roach", "moth", "gnat", "cockroach", "caterpillar", "bug", "centipede", "cricket", "worm", "dragonfly", "flea", "hornet"],
["rose", "daisy", "tulip", "lily", "carnation", "daffodil", "sunflower", "dandelion", "pansy", "orchid", "petunia", "sun", "violet", "iris", "lilac", "columbine"],
["cancer", "flu", "diabetes", "herpes", "cold", "cold", "leukemia", "hepatitis", "gonorrhea", "malaria", "smallpox", "syphilis", "measles"],
["oak", "pine", "maple", "apple", "aspen", "redwood", "dogwood", "spruce", "evergreen", "birch", "cherry", "orange", "elm", "fir", "palm", "cedar", "pear", "willow", "christmas", "peach", "green", "sycamore"],
["sailboat", "cruise", "yacht", "speedboat", "canoe", "rowboat", "motor", "tugboat", "submarine", "carrier", "battleship", "kayak", "raft", "titanic", "barge", "cargo", "catamaran", "dingy", "pontoon", "steam", "steamboat", "ferry", "schooner", "ski"],
["salmon", "trout", "goldfish", "bass", "catfish", "tuna", "shark", "flounder", "swordfish", "herring", "carp", "beta", "cod", "angelfish", "dolphin", "blowfish", "guppy", "halibut", "perch", "marlin", "minnow", "pike", "piranha", "snapper", "whale", "rattlesnake", "gardener", "cobra", "python", "boa", "anaconda", "copperhead", "viper", "water", "diamondback", "poisonous", "corn", "cottonmouth"],
["marijuana", "pot", "weed", "cocaine/coke", "cocaine", "coke", "heroin", "ecstasy", "alcohol", "lsd", "crack", "tylenol", "aspirin", "mushroom", "acid", "advil", "speed", "nicotine", "caffeine", "morphine", "pcp", "opium", "penicillin", "vicaden"],
["water", "juice", "soda", "pop", "milk", "beer", "alcohol", "oil", "coke", "coffee", "tea", "blood", "wine", "mercury", "gasoline", "rain", "urine", "gatorade", "lemonade", "gas", "kool-aid", "liquor", "sprite"],
["bra", "skirt", "dress", "underwear", "shirt", "heels", "pants", "shoes", "blouse", "makeup", "pantyhose", "stockings", "hose", "nylons", "earrings", "hat", "jewelry", "necklace", "sock", "thong", "ring", "perfume", "bracelet", "lipstick", "shorts", "sweater", "jeans", "jacket", "coat", "purse"],
["bird", "plane", "airplane", "fly", "flies", "helicopter", "bee", "bug", "insect", "kite", "butterfly", "bat", "jet", "superman", "eagle", "dragonfly", "ladybug", "moth", "wasp"],
["pictures", "photograph", "pet", "animal", "money", "children", "baby", "kids", "child", "people", "people", "person", "clothes", "clothing", "jewelry", "dog", "cat", "valuables", "documents", "paper", "tv", "furniture", "wallet", "purse"],
["shovel", "hoe", "rake", "glove", "hose", "spade", "pick", "lawnmower", "dirt", "soil", "plow", "seeds", "trowel", "clipper", "bucket", "pitchfork", "water"]
];


// create study trials //
var mTurkID,
    fbID,
    trialArray = [],
    newWordsArray = [],
    expStart = new Date().getTime(),
    expID = "test Exp",
    i


if (window.opener) {
    fbID = window.opener.userID
} else {
    fbID = new Date().getTime();
}

// create study trial array //
for (i = 0; i <= 7; i++) {
    var l, i

    if (i % 2 > 0) {
        l = "up"
    } else {
        l = "down"
    };

    trialArray.push({
        expStart: expStart,
        expID: expID,
        firebaseId: fbID,
        word: shuffle(shuffle(wordList)[0]).shift(),
        wordType: 'old',
        location: l,
        prime: shuffle(shuffle(wordList)[0]).shift(),
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
for (i = 0; i <= 7; i++) {
    newWordsArray.push({
        expStart: expStart,
        expID: expID,
        firebaseId: fbID,
        word: shuffle(shuffle(wordList)[0]).shift(),
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
var blankLength = 200,
    primeLength = 250,
    fixateLength = 1000,
    targetLength = 250,
    feedbackLength = 1000



var expBegin = "NA",
    expEnd = "NA"

var trialCount = -1; /* trial counter / keeps track of which trial the subject is on */
var keytest = false; /* enables and disables keypress effects / only allows responses when keytest == 1 */
var time1, time2
var phase = "prime"
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
    eventTimer.setTimeout(studyBlank3, primeLength);
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
    eventTimer.setTimeout(studyResponse, targetLength);
}

/* 5. Blank / wait for response */
function studyResponse() {
    $("#up").html("");
    $("#center").html("");
    $("#down").html("");
}

//////// END PRIME EVENTS /////////

function endStudy() {
    // reset trial counter
    trialCount = -1;
    phase = 'probe';

    // hide study display
    $("#targetDisplay").hide();

    // create array of new & old words 
    memoryArray = trialArray.concat(newWordsArray)
    memoryArray = shuffle(memoryArray)
    $(".countDisplay").html("0/" + memoryArray.length + " trials");

    // show test instructions
    $("#testInstructions").css('display', 'flex');

    // change modal instructions //
    $("#modalText").text("We will present you with new letter strings (i.e., ones you did not study). Your task is to rate how rule-compliant or rule-violating each new string is. If you are at a loss, use your gut feeling.")
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
    window.opener.data = memoryArray;
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
    $(".countDisplay").html(0 + " / " + trialArray.length + " trials");
    $(".top").css('visibility', 'visible');

    // trigger study trials
    // initiate blank screen 
    studyBlank();

})

$("#startTest").click(function () {
    // hide instructions
    $("#testInstructions").hide();

    // show test display
    $("#targetDisplay").show();

    // init blank screen 
    testBlank();
})


/* collect response on keypress / ends trial / only when keytest == 1 */
$(document).keydown(function (event) {
    console.log(event.keyCode)
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
        trialArray[trialCount].locationRT = time2 - time1;
        trialArray[trialCount].locationACC = accuracy;

        /* create summary data */

        /* display feedback */
        $("#up").html("");
        $("#down").html("");

        if (response == trialArray[trialCount].location) {
            /* When response is correct... */
            $('#' + trialArray[trialCount].location).html('<p style="font-size: 40px; text-align: center; color: green"> correct </p>');
        } else {
            /* when response is incorrect... */
            $('#' + trialArray[trialCount].location).html('<p style="font-size: 40px; text-align: center; color: red"> incorrect </p>');
        }


        if (trialCount != trialArray.length - 1) {
            eventTimer.setTimeout(studyBlank, feedbackLength);
        } else {
            eventTimer.setTimeout(endStudy, feedbackLength);
        }
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


});
