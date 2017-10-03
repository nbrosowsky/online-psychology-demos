/*
 * Every item in trialArray represents a single trial
 * trialArray properties include any information needed to present the stim and
 * any trial information needed for data analysis
 */


//////////////// Stim & Trial Array Creation //////////////////////////////////
var wordList = [
//        ["diamond", "ruby", "emerald", "sapphire", "pearl", "gem", "gemstone", "amethyst", "opal", "gold", "topaz", "garnet", "silver", "jade", "quartz", "turquoise"],
//        ["hour", "second", "minute", "year", "day", "month", "decade", "century", "centuries", "week", "millisecond", "millennium", "nanosecond", "eon"],
//        ["steel", "iron", "silver", "copper", "gold", "aluminum", "platinum", "titanium", "tin", "bronze", "nickel", "lead", "brass", "zinc"],
        ["magazine", "book", "newspaper", "novel", "journal", "article", "textbook", "pamphlet", "internet", "website", "paper", "comic", "comicbook", "encyclopedia", "essay", "flyer", "letter", "periodical", "shortstory"],
//        ["sergeant", "general", "lieutenant", "captain", "private", "colonel", "major", "corporal", "officer", "commander", "admiral", "chief", "soldier", "cadet"],
        ["dog", "cat", "horse", "lion", "bear", "tiger", "cow", "elephant", "deer", "mouse", "pig", "rat", "giraffe", "squirrel", "rabbit", "goat", "zebra", "moose", "sheep", "cheetah", "raccoon", "wolf", "fox", "hamster", "donkey", "elk", "lizard", "turtle"],
        ["cotton", "silk", "polyester", "wool", "nylon", "rayon", "satin", "spandex", "denim", "leather", "linen", "fleece", "velvet", "jean", "suede", "cashmere", "cloth", "flannel", "lace", "lycra", "blue"],
//        ["red", "green", "yellow", "purple", "orange", "black", "white", "pink", "brown", "grey", "violet", "silver", "gold", "indigo", "magenta", "turquoise", "maroon", "teal", "tan", "aqua", "fuchsia"],
        ["knife", "fork", "spoon", "spatula", "pan", "pot", "whisk", "blender", "bowl", "ladle", "plate", "cutting", "tongs", "can", "mixer", "strainer", "colander", "cup", "stove"],
        ["church", "temple", "synagogue", "mosque", "cathedral", "chapel", "monastery", "house", "home", "sanctuary"],
        ["chair", "table", "couch", "bed", "desk", "sofa", "dresser", "loveseat", "coffee", "lamp", "nightstand", "ottoman", "recliner", "stool", "end", "futon", "armoire", "bookshelf", "bookcase", "cabinet"],
        ["foot", "shelf", "leg", "arm", "foot", "feet", "finger", "head", "toe", "eye", "hand", "nose", "ear", "mouth", "stomach", "heart", "knee", "neck", "brain", "hair", "elbow", "shoulder", "chest", "back", "butt", "lip", "thigh", "ankle", "face", "liver", "lung", "tongue", "teeth", "torso", "wrist", "bone", "hip", "muscle", "nail"],
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
//        ["football", "basketball", "soccer", "baseball", "tennis", "hockey", "swimming", "golf", "volleyball", "lacrosse", "track", "rugby", "softball", "skiing", "cheerleading", "running", "gymnastics", "polo", "racquetball", "wrestling", "bowling", "badminton", "cricket"],
        ["tornado", "hurricane", "rain", "snow", "hail", "flood", "lightning", "blizzard", "earthquake", "sleet", "monsoon", "thunder", "wind", "tsunami", "storm", "thunderstorm", "typhoon", "drought", "cloud", "sunshine"],
        ["shirt", "pants", "sock", "underwear", "shoe", "hat", "short", "jacket", "sweater", "bra", "skirt", "jeans", "coat", "dress", "t-shirt", "gloves", "sweatshirt", "boxers", "scarf", "blouse", "tie", "belt", "undershirt"],
        ["window", "door", "floor", "wall", "roof", "stairs", "steps", "stairway", "stairwell", "staircase", "elevator", "room", "ceiling", "basement", "cellar", "bathroom", "office", "hallway", "hall", "lobby", "brick", "foundation", "entrance", "attic", "carpet"],
        ["oxygen", "hydrogen", "carbon", "helium", "nitrogen", "gold", "iron", "silver", "sodium", "potassium", "sulfur", "zinc", "copper", "chlorine", "neon", "calcium", "aluminum", "boron", "lithium", "mercury", "magnesium", "water", "argon", "fluorine", "lead", "nickel", "uranium"],
        ["drum", "guitar", "flute", "piano", "trumpet", "clarinet", "saxophone", "violin", "trombone", "tuba", "cello", "oboe", "bass", "viola", "harp", "horn", "keyboard", "piccolo", "banjo", "harmonica", "cymbal", "organ", "tambourine"],
        ["dollar", "penny", "cent", "dime", "nickel", "quarter", "peso", "yen", "coin", "franc", "euro", "pound", "check", "lira", "ruble", "bill", "cash", "paper"],
//        ["rap", "rock", "classical", "country", "jazz", "pop", "alternative", "punk", "blues", "reggae", "oldies", "techno", "bluegrass", "soul", "gospel", "opera", "folk", "dance", "metal", "ska"],
        ["eagle", "robin", "bluejay", "cardinal", "hawk", "bluebird", "crow", "hummingbird", "parrot", "sparrow", "pigeon", "seagull", "dove", "parakeet", "falcon", "canary", "owl", "ostrich", "penguin", "raven", "duck", "finch", "mockingbird", "woodpecker", "flamingo", "oriole", "blackbird", "chicken", "vulture"],
        ["water", "coke", "milk", "juice", "soda", "sprite", "pepsi", "tea", "coffee", "lemonade", "gatorade", "kool-aid", "pop", "punch", "root"],
        ["car", "bus", "truck", "airplane", "plane", "train", "bike", "bicycle", "van", "boat", "ship", "motorcycle", "suv", "skateboard", "subway", "taxi", "cab", "scooter", "helicopter", "jeep", "moped", "ford", "minivan"],
//        ["biology", "chemistry", "physics", "psychology", "astronomy", "geology", "earth", "anatomy", "sociology", "kinesiology", "physiology", "anthropology", "biochemistry"],
        ["doll", "car", "ball", "truck", "lego", "block", "train", "bike", "boat", "puzzle", "computer", "nintendo", "yo-yo"],
        ["ballet", "tango", "salsa", "jazz", "waltz", "tap", "swing", "ballroom", "break", "line", "square", "slow", "merengue", "macarena", "foxtrot", "mambo"],
        ["carrot", "lettuce", "broccoli", "tomato", "cucumber", "peas", "corn", "potato", "celery", "onion", "spinach", "squash", "bean", "cauliflower", "cabbage", "radish", "asparagus", "pepper", "tomatoes", "beet", "potatoes", "turnip", "zucchini"],
        ["sandal", "boot", "heels", "shoe", "tennis", "sneaker", "slipper", "sock", "dress", "nike", "adidas", "clog", "cleat", "loafer", "pump", "reebok", "ant", "spider", "bee", "mosquito", "beetle", "grasshopper", "butterfly", "wasp", "roach", "moth", "gnat", "cockroach", "caterpillar", "bug", "centipede", "cricket", "worm", "dragonfly", "flea", "hornet"],
        ["rose", "daisy", "tulip", "lily", "carnation", "daffodil", "sunflower", "dandelion", "pansy", "orchid", "petunia", "sun", "violet", "iris", "lilac", "columbine"],
        ["cancer", "flu", "diabetes", "herpes", "cold", "cold", "leukemia", "hepatitis", "gonorrhea", "malaria", "smallpox", "syphilis", "measles"],
        ["oak", "pine", "maple", "apple", "aspen", "redwood", "dogwood", "spruce", "evergreen", "birch", "cherry", "orange", "elm", "fir", "palm", "cedar", "pear", "willow", "christmas", "peach", "green", "sycamore"],
        ["sailboat", "cruise", "yacht", "speedboat", "canoe", "rowboat", "motor", "tugboat", "submarine", "carrier", "battleship", "kayak", "raft", "titanic", "barge", "cargo", "catamaran", "dingy", "pontoon", "steam", "steamboat", "ferry", "schooner", "ski"],
        ["salmon", "trout", "goldfish", "bass", "catfish", "tuna", "shark", "flounder", "swordfish", "herring", "carp", "beta", "cod", "angelfish", "dolphin", "blowfish", "guppy", "halibut", "perch", "marlin", "minnow", "pike", "piranha", "snapper", "whale", "rattlesnake", "gardener", "cobra", "python", "boa", "anaconda", "copperhead", "viper", "water", "diamondback", "poisonous", "corn", "cottonmouth"],
        ["marijuana", "pot", "weed", "cocaine", "coke", "heroin", "ecstasy", "alcohol", "lsd", "crack", "tylenol", "aspirin", "mushroom", "acid", "advil", "speed", "nicotine", "caffeine", "morphine", "pcp", "opium", "penicillin", "vicaden"],
        ["water", "juice", "soda", "pop", "milk", "beer", "alcohol", "oil", "coke", "coffee", "tea", "blood", "wine", "mercury", "gasoline", "rain", "urine", "gatorade", "lemonade", "gas", "kool-aid", "liquor", "sprite"],
        ["bra", "skirt", "dress", "underwear", "shirt", "heels", "pants", "shoes", "blouse", "makeup", "pantyhose", "stockings", "hose", "nylons", "earrings", "hat", "jewelry", "necklace", "sock", "thong", "ring", "perfume", "bracelet", "lipstick", "shorts", "sweater", "jeans", "jacket", "coat", "purse"],
        ["bird", "plane", "airplane", "fly", "flies", "helicopter", "bee", "bug", "insect", "kite", "butterfly", "bat", "jet", "superman", "eagle", "dragonfly", "ladybug", "moth", "wasp"],
        ["pictures", "photograph", "pet", "animal", "money", "children", "baby", "kids", "child", "people", "people", "person", "clothes", "clothing", "jewelry", "dog", "cat", "valuables", "documents", "paper", "tv", "furniture", "wallet", "purse"],
        ["shovel", "hoe", "rake", "glove", "hose", "spade", "pick", "lawnmower", "dirt", "soil", "plow", "seeds", "trowel", "clipper", "bucket", "pitchfork", "water"]
]


/* Creates the trial array for study phase */
var trialType = ["survival", "pleasantness", "imagery", "selfReference"];
var trialArray = [];
var words = [];
/* select 48 unique words */
for (i = 0; i <= 47; i++) {
    words.push(shuffle(shuffle(wordList)[0]).pop());
}
/* select 48 unique words */
var newWords = [];
var memoryArray = [];
for (i = 0; i <= 47; i++) {
    newWords.push(shuffle(shuffle(wordList)[0]).pop());
}


var block = [];

for (b = 0; b <= 11; b++) {
    for (n = 0; n <= trialType.length - 1; n++) {
        temp = {
            date: new Date(),
            subject: "",
            trial: "",
            encodingCondition: trialType[n],
            word: words.pop(),
            newWord: newWords.pop(),
            reactionTime: "",
            rating: "",
            memoryTrial: "",
            memoryACC: "",
            memoryRT: ""
        }
        block.push(temp)
    }
}


trialArray = trialArray.concat(shuffle(block));


for (n = 0; n <= trialArray.length - 1; n++) {
    trialArray[n].trial = n + 1;
}


// containers for summary data //
ratings = {
    survival: [],
    pleasantness: [],
    imagery: [],
    selfReference: []
}

memoryACC = {
    survival: [],
    pleasantness: [],
    imagery: [],
    selfReference: []
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
    $("#survival").hide();
    $("#pleasantness").hide();
    $("#imagery").hide();
    $("#selfReference").hide();

    $("#targetWord").html(trialArray[trialCount].word.toUpperCase())
    $("#1-target").show();
    $("#" + trialArray[trialCount].encodingCondition).show();
    /* get timestamp for stim presentation */
    time1 = new Date().getTime();

}

/* recognition phase */
function rec_blank() {
    $("#2-target").hide();

    /* run function fixate after "blankLength" milliseconds */
    eventTimer.setTimeout(rec_trial, blankLength);
}

function rec_trial() {
    /* update counter display */
    $(".countDisplay").html((trialCount + 1) + " /" + trialArray.length + " trials");

    var trialWords = [trialArray[trialCount].word, trialArray[trialCount].newWord]
    shuffle(trialWords)

    $("#left").html(trialWords[0].toUpperCase());
    $("#right").html(trialWords[1].toUpperCase());

    $("#2-target").show();
    time1 = new Date().getTime();
}



////////////// Set up initial display & button functions //////////////////////////////////////
/* end instructions and begin experiment */
$("#beginExp").click(function () {
    $("#1-instructions").hide();
    $(".countDisplay").html(trialCount + " / " + trialArray.length + " trials");
    $(".top").show();

    blank();
});


$("#beginMemory").click(function () {
    trialCount = 0;
    shuffle(trialArray);

    $("#2-instructions").hide();
    $(".countDisplay").html(trialCount + " / " + trialArray.length + " trials");
    $(".top").show();

    rec_blank();
});



$("#submitResponse").click(function () {
    $("#1-instructions").hide();

    time2 = new Date().getTime(); /* get timestamp for response */

    trialArray[trialCount].trial = trialCount + 1
    trialArray[trialCount].subject = subject;
    trialArray[trialCount].rating = document.querySelector("#" + trialArray[trialCount].encodingCondition + "Input").value;
    trialArray[trialCount].reactionTime = time2 - time1;

    document.querySelector("#" + trialArray[trialCount].encodingCondition + "Input").value = 3
    if (trialCount != trialArray.length - 1) {
        trialCount++; /* increase trial counter by one */
        blank();
    } else {
        $("#1-phase").hide()
        $("#2-target").hide();
        $("#2-phase").toggleClass("initHidden");
        $("#2-phase").toggleClass("flexCenter")
        $("#2-instructions").show();

    }
});


/* gets button ID and html from button for response */
function getRecResponse(btnID) {
    $("#1-instructions").hide();
    time2 = new Date().getTime(); /* get timestamp for response */

    trialArray[trialCount].memoryTrial = trialCount + 1
    trialArray[trialCount].memoryRT = time2 - time1;


    if ($("#" + btnID).html().toLowerCase() === trialArray[trialCount].word.toLowerCase()) {
        trialArray[trialCount].memoryACC = 1;
    } else {
        trialArray[trialCount].memoryACC = 0;
    }
    if (trialCount != trialArray.length - 1) {
        trialCount++; /* increase trial counter by one */
        rec_blank();
    } else {
        $("#2-phase").hide()
        getSummary();

        $("#resultsDisplay").toggleClass("initHidden");
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

/* download data file */
$("#downloadCSV").click(function () {
    exportObjectToCSV('taskSwitching - ' + subject + '.csv', trialArray);
});


/* summarize the data */
function getSummary() {
    for (i = 0; i <= trialArray.length - 1; i++) {
        ratings[trialArray[i].encodingCondition] = Number(trialArray[i].rating) + Number(ratings[trialArray[i].encodingCondition]);
        memoryACC[trialArray[i].encodingCondition] = Number(trialArray[i].memoryACC) + Number(memoryACC[trialArray[i].encodingCondition]);
    }

    ratings.survival = ratings.survival / (trialArray.length / 4)
    ratings.pleasantness = ratings.pleasantness / (trialArray.length / 4)
    ratings.imagery = ratings.imagery / (trialArray.length / 4)
    ratings.selfReference = ratings.selfReference / (trialArray.length / 4)

    memoryACC.survival = (memoryACC.survival / (trialArray.length / 4)) * 100
    memoryACC.pleasantness = (memoryACC.pleasantness / (trialArray.length / 4)) * 100
    memoryACC.imagery = (memoryACC.imagery / (trialArray.length / 4)) * 100
    memoryACC.selfReference = (memoryACC.selfReference / (trialArray.length / 4)) * 100

    // For d3.js charts //
    D3Data = [
        {
            condition: "Survival",
            response: memoryACC.survival
        },
        {
            condition: "Pleasantness",
            response: memoryACC.pleasantness
        },
        {
            condition: "Imagery",
            response: memoryACC.imagery
        },
        {
            condition: "Self-Reference",
            response: memoryACC.selfReference
        }
    ];


    // For Google Form //
    var googleURL = "https://docs.google.com/forms/d/e/1FAIpQLSeFloGjJO_wU-u_4Uuv-fSfTm5Hsto0Eo6tXzTVqqeoNfZccg/formResponse"
    var data = {

        // subject ID //
        "entry.918765135": trialArray[0].subject,

        // survival Rating //
        "entry.254745122": ratings.survival,
        // pleasantness Rating //
        "entry.829469158": ratings.pleasantness,
        // imagery Rating //
        "entry.1937775764": ratings.imagery,
        // self-reference Rating //
        "entry.1085361898": ratings.selfReference,

        // survival memory score //
        "entry.126810252": memoryACC.survival,
        //pleasantness memory score //
        "entry.1594130621" : memoryACC.pleasantness,

        // imagery memory score //
        "entry.1760213268": memoryACC.imagery,

        // self-reference memory score //
        "entry.500942876": memoryACC.selfReference,




    }
    // send to google form ///
    postToGoogle(googleURL, data);
}


/////////////////// Generic Functions /////////////////////////////////

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
