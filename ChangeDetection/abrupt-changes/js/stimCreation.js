// basic settings for all trials: 
var allInstruments = ["cello", "piano", "trumpet", "flute"],
    pLocations = [
        [-1, 3], [-1, 4], [1, 3], [1, 4]
    ],
    locations = [-1, -1, 1, 1], //spatial location / order is important //
    octaves = [3, 4, 3, 4], //pitch location / order is important //
    notes = ["E", "F#", "G#", "A", "B", "C#", "D#"],
    bpmRange = [90, 110], // starting bpm randomly between
    pitchRange = [(10000 - 594), (10000 + 594)], //starting pitch randomly between 440 +/- one semi-tone (divide by 10000)
    beatLengths = [8, 4, 2], //eighth,quarter,half
    timeSig = 4, // aka. 4 quarter notes per measure
    measures = 1,
    panners = [],
    noiseSynth,
    currentTrial = 0

// setup panners
for (i = 0; i <= 3; i++) {
    panners[i] = new Tone.Panner(locations[i]).toMaster()

}

// possible change arrays
// two possible location only changes
var LChange = [
    [
        [1, 3], [-1, 4], [-1, 3], [1, 4]
    ],
    [
        [-1, 3], [1, 4], [1, 3], [-1, 4]
    ]
]

// two possible pitch only changes
var PChange = [
    [
        [-1, 4], [-1, 3], [1, 3], [1, 4]
    ],
    [
        [-1, 3], [-1, 4], [1, 4], [1, 3]
    ]
]

// two possible pitch & location changes
var BChange = [
    [
        [1, 4], [-1, 4], [1, 3], [-1, 3]
    ],
    [
        [-1, 3], [1, 3], [-1, 4], [1, 4]
    ]
]
///////



//create an array of trials
var trialArray = [];

function createTrialArray() {

    for (i = 0; i <= 1; i++) {
        var i,
            t = createTrial(allInstruments, "pitch")

        console.log(t.endOctaves)
        trialArray.push(t)
    }

    trialArray = myShuffle(trialArray)


    noiseSynth = new Tone.NoiseSynth([{
        noise: {
            type: "white"
        },
        envelope: {
            attack: 0.005,
            decay: 0,
            sustain: 1
        }
    }]).toMaster()

    noiseSynth.envelope.release = 0.1

};


// sets up trial, ready to played
function initTrial() {
    Tone.Transport.stop();
    Tone.Transport.timeSignature = 6;
    Tone.Transport.bpm.value = trialArray[currentTrial].bpm;

    updatePanners(trialArray[currentTrial].startLoc)
    for (i = 0; i <= 3; i++) {
        samples[trialArray[currentTrial].instruments[i]].connect(panners[i]).toMaster()
        samples[trialArray[currentTrial].instruments[i]].attack = .25
        samples[trialArray[currentTrial].instruments[i]].decay = .25
    }
}

// start playback
function startTrial() {

    // schedule the change in panners to occur between melodies
    Tone.Transport.schedule(function (time) {
        updatePanners(trialArray[currentTrial].endLoc)
    }, "1:5:0");


    // add noise to break
    // schedule noise for beats 4 & 5
    if (trialArray[currentTrial].breakType === "noise") {
        Tone.Transport.scheduleOnce(function (time) {
            noiseSynth.triggerAttackRelease("2n")
        }, "0:4:0");
    }

    // schedule melodies
    for (i = 0; i <= 3; i++) {
        trialArray[currentTrial].startPhrases[i].start(0);
        trialArray[currentTrial].endPhrases[i].start("1m");
    }

    // at the end of both melodies...
    Tone.Transport.schedule(function (time) {
        //        disposeTrial();//disposes of parts
        Tone.Transport.stop(); //stops Transport
        updatePanners(trialArray[currentTrial].startLoc) //set panners back to starting

    }, "2m");

    // start Transport
    // schedule ahead to prevent clipping
    Tone.Transport.start("+0.05")
}

// deletes part
// cannot be replayed after disposed
function disposeTrial() {
    for (i = 0; i <= 3; i++) {
        trialArray[currentTrial].startPhrases[i].dispose();
        trialArray[currentTrial].endPhrases[i].dispose();
    }
}

// I'm only using one set of four panners that will be updated as necessary
function updatePanners(array) {
    for (i = 0; i <= 3; i++) {
        panners[i].pan.value = array[i]
    }
}

/// trial creation 
function createTrial(instrumentArray, changeType) {
    var i,
        changeType = changeType,
        instruments = myShuffle(allInstruments)
    // trial start settings:
    var track = {
        bpm: randomIntFromInterval(bpmRange[0], bpmRange[1]),
        pitch: randomIntFromInterval(pitchRange[0], pitchRange[1]) / 10000,
        instruments: instruments,
        startLoc: locations,
        endLoc: locations,
        startOctaves: octaves,
        endOctaves: octaves,
        changeType: changeType,
        breakType: "noise",
        melodies: [],
        startMelodies: [],
        startPhrases: [],
        endMelodies: [],
        endPhrases: [],
        response: "",
        RT: "",
        accuracy: ""
    }



    // determine change type 
    switch (track.changeType) {
        case 'noChange':
            break;
        case 'location':
            var x = myShuffle(LChange)[0]
            track.endLoc = [x[0][0],x[1][0],x[2][0],x[3][0]]
            break;
        case 'pitch':
            var x = myShuffle(PChange)[0]
            track.endOctaves = [x[0][1],x[1][1],x[2][1],x[3][1]]
            break;
        case 'both':
            var x = myShuffle(BChange)[0]
            track.endLoc = [x[0][0],x[1][0],x[2][0],x[3][0]]
            track.endOctaves = [x[0][1],x[1][1],x[2][1],x[3][1]]
            break;
    }



    //create a random melody for each instrument:
    instruments = myShuffle(instruments);
    for (i = 0; i <= instruments.length - 1; i++) {
        var melodyArray = [],
            startM, endM
        //create random melody
        //match with octave settings for start/end
        melodyArrays = createMelodies(track.startOctaves[i], track.endOctaves[i]);

        track.melodies.push(melodyArrays[2])

        //create the start phrase
        track.startMelodies.push(melodyArrays[0])
        track.startPhrases.push(createPart(instruments[i], melodyArrays[0]))

        //create the end phrase in Tone.js format
        track.endMelodies.push(melodyArrays[1])
        track.endPhrases.push(createPart(instruments[i], melodyArrays[1]))
    }


    return track

}



// creates a random melody in Tone.js format 
function createMelodies(sO, eO) {
    var count = 0,
        s = [],
        e = [],
        noteArray = []

    while (count < measures) {
        var pickOne = myShuffle(beatLengths)[0];
        if (count + (1 / pickOne) <= measures) {
            var n = myShuffle(notes)[0]
            s.push({
                "time": toBQS(count, timeSig),
                "note": n + sO,
                "length": (pickOne + "n")
            })

            e.push({
                "time": toBQS(count, timeSig),
                "note": n + eO,
                "length": (pickOne + "n")
            })

            noteArray.push(n)

            count = count + (1 / pickOne);

        }
    }

    return [s, e, noteArray]

}



// takes melodies and creates a Tone.js part 
// assumes the Tone.js sampler instrument is stored in 'samples['instrumentName']'
function createPart(instrument, melodies) {
    var p = new Tone.Part(function (time, value) {
        samples[instrument].triggerAttackRelease(value.note, value.length, time)
    }, melodies)

    p.humanize = true;
    return p
}

// converts the time in fractions of a measure to Tone.js format 'bars:quarters:sixteenth' 
// so 0.625 would be converted to 0:2:2 (two quarter notes + 1 eighth note)
function toBQS(eBeats, timeSig) {
    var quarters = eBeats * 4;
    var measures = Math.floor(quarters / timeSig);
    var sixteenths = quarters % 1 * 4;
    quarters = Math.floor(quarters) % timeSig;
    sixteenths = sixteenths.toString();
    if (sixteenths.length > 3) {
        // the additional parseFloat removes insignificant trailing zeroes
        sixteenths = parseFloat(parseFloat(sixteenths).toFixed(3));
    }
    var progress = [
	            measures,
	            quarters,
	            sixteenths
	        ];
    return progress.join(':');
}


///////// MISC FUNCTIONS /////////////
/* myShuffle an array */
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

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomNumFromInterval(min, max) {
    return (Math.random() * (max - min + 1) + min);
}

function allEqual(array) {
    for (var i = 1; i < array.length; i++) {
        if (array[i] !== array[0])
            return false;
    }
    return true;
}

function shallowCopy(original) {
    // First create an empty object with
    // same prototype of our original source
    var clone = Object.create(Object.getPrototypeOf(original));

    var i, keys = Object.getOwnPropertyNames(original);

    for (i = 0; i < keys.length; i++) {
        // copy each property into the clone
        Object.defineProperty(clone, keys[i],
            Object.getOwnPropertyDescriptor(original, keys[i])
        );
    }

    return clone;
}
