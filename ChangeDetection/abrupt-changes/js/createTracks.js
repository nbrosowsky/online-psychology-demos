
var trackOptions = {
    // Default options for audio randomization //
    instCategories: [["bass-clarinet", "bassoon","english-horn"],
                      ["cello", "violin"], 
                      ["guitar", "piano"], 
                      ["saxophone", "trombone", "trumpet"]
                     ] ,
    beats: [4, 2, 1], // note: audio samples are only 1 second in length
    octave: [1, 2], //currently only two available for each instrument
    notes: [["E3", "Fs3", "Gs3", "A3", "B3", "Cs4", "Ds4", "E4"],
            ["E3", "Fs3", "Gs3", "A3", "B3", "Cs4", "Ds4", "E4"],
            ["E4", "Fs4", "Gs4", "A4", "B4", "Cs5", "Ds5", "E5"],
            ["E4", "Fs4", "Gs4", "A4", "B4", "Cs5", "Ds5", "E5"]
            ],
    bpmRange: [70, 90],
    bpmChange: 10,
    pitchRange: [(1 - 0.05943508), (1 + 0.05943508)],
    pitchChange: 1,
    timeChange: 30,
    nPhrases: 2, //number of unique audio phrases / limited by number of instruments available
    nChange: 1,
    spatialLocation: [-1, 1, -.5, .5], // default locations
    upDown: [1, -1], // helper to randomly change sign if needed
    mLength: 4
}


function Track(change, changeType) {
    var b = randomIntFromInterval(trackOptions.bpmRange[0], trackOptions.bpmRange[1]);
    var c = Array(trackOptions.nChange).fill("changeOut").concat(Array(trackOptions.nPhrases - trackOptions.nChange).fill("noChange"));
//    var inst = myShuffle(trackOptions.instruments).slice(0, trackOptions.nPhrases);
    var p = (Math.random() * (trackOptions.pitchRange[1] - trackOptions.pitchRange[0]) + trackOptions.pitchRange[0])
    
    var inst = [];
    for (n = 0; n <= trackOptions.instCategories.length - 1; n++){
        inst.push(myShuffle(trackOptions.instCategories[n])[0])
    }
    inst = myShuffle(inst);
    
    this.mLength = trackOptions.mLength;
    this.timeChange = trackOptions.timeChange;
    this.instruments = inst;
    this.change = change;
    this.changeType = changeType;
    this.conditions = c;

    this.BPM_current = b;

    this.Rate_current = p;

    this.Loc_current = trackOptions.spatialLocation.slice(0, trackOptions.nPhrases)
    var temp = myShuffle(trackOptions.upDown)[0]
    for (n = 0; n <= this.Loc_current.length - 1; n++) {
        this.Loc_current[n] = this.Loc_current[n] * temp
    }

    this.Vol_current = Array(trackOptions.nPhrases).fill(1)
    //    this.Pos_current =[[-5,-5,-5],[-3,-3,-3],[3,3,3],[5,5,5]]

    this.phrases = [];

    this.allNotes = [];
    
    for (r = 0; r < trackOptions.nPhrases; r++) {

        var beats = findBeats();
        var notes = findNotes(beats.length, r);
        this.allNotes.push([notes])
        var noteList = [];
        

        for (n = 0; n < beats.length; n++) {
            x = {
                sound: new Howl({
                    src: "sounds/" + inst[r] + "_" + notes[n] + ".mp3",

                }),
                beat: beats[n][0],
                endBeat: beats[n][1],
                id: null

            };
            x.sound.stereo(this.Loc_current[r]);
            //            x.sound.pannerAttr({
            //                panningModel: 'HRTF',
            //                distanceModel: 'exponential'
            //            })
            //            x.sound.pos(this.Pos_current[r][0],this.Pos_current[r][1],this.Pos_current[r][2])
            noteList.push(x);
        }
        this.phrases.push(noteList)
      
    }


    /// if tempo change
    if (change === "tempo") {
        this.BPM_start = b;
        this.BPM_change = trackOptions.bpmChange * myShuffle(trackOptions.upDown)[0]; // changing 10bpm // need to fix the -1 || 1

    }

    /// if pitch change
    if (change === "pitch") {
        this.Rate_start = p;
        this.Rate_change = (0.05943508*trackOptions.pitchChange) * myShuffle(trackOptions.upDown)[0]; // changing 1 semi-tone // need to fix the -1 || 1

    }

    /// if location change
    if (change === "location_1") {
        this.Loc_start = this.Loc_current.slice();
        this.Loc_change = [];
        for (var i = 0; i < this.Loc_current.length; i++) {

            if (i === 0) {
                this.Loc_change.push(this.Loc_current[i] * -1);
            } else {
                this.Loc_change.push(this.Loc_current[i])
            }
        }


        this.conditions = Array(trackOptions.nChange + 1).fill("changeOut").concat(Array(trackOptions.nPhrases - (trackOptions.nChange + 1)).fill("noChange"));

    }

    /// if location change
    if (change === "location_2") {
        this.Loc_start = this.Loc_current.slice();
        this.Loc_change = [];
        for (var i = 0; i < this.Loc_current.length; i++) {

            if (i === 0 || i === 1) {
                this.Loc_change.push(this.Loc_current[i] * -1);
            } else {
                this.Loc_change.push(this.Loc_current[i])
            }
        }


        this.conditions = Array(trackOptions.nChange + 1).fill("changeOut").concat(Array(trackOptions.nPhrases - (trackOptions.nChange + 1)).fill("noChange"));

    }

    /// if instrument change
    if (change === "instrument") {
        this.instruments = myShuffle(trackOptions.instruments).slice(0, trackOptions.nPhrases + 1);
        this.Vol_current.push(0)
        this.Loc_current.push(this.Loc_current[0])
        this.Vol_changeOut = 1;
        this.Vol_changeIn = 0;
        this.conditions.push("changeIn")



        this.phrases = [];
        var saveOctave;
        for (r = 0; r < trackOptions.nPhrases; r++) {

            var beats = findBeats();
            var notes = findNotes(beats.length);
            var octave = myShuffle(trackOptions.octave)[0]
            if (r === 0) {
                saveOctave = octave;
                saveBeats = beats;
                saveNotes = notes;
            }
            var noteList = [];

            for (n = 0; n < beats.length; n++) {
                x = {
                    sound: new Howl({
                        src: "sounds/" + this.instruments[r] + "_" + octave + "_" + notes[n] + ".mp3",

                    }),
                    beat: beats[n][0],
                    endBeat: beats[n][1],
                    id: null

                };
                x.sound.stereo(this.Loc_current[r]);
                //            x.sound.pannerAttr({
                //                panningModel: 'HRTF',
                //                distanceModel: 'exponential'
                //            })
                //            x.sound.pos(this.Pos_current[r][0],this.Pos_current[r][1],this.Pos_current[r][2])
                noteList.push(x);
            }
            this.phrases.push(noteList)
        }

        // make dupe phrase // 
        var noteList = [];
        var x;

        for (n = 0; n < this.phrases[0].length; n++) {
            x = {
                sound: new Howl({
                    src: "sounds/" + this.instruments[this.instruments.length - 1] + "_" + saveOctave + "_" + saveNotes[n] + ".mp3"

                }),
                beat: saveBeats[n][0],
                endBeat: saveBeats[n][1],
                id: null

            };

            x.sound.stereo(this.Loc_current[0]);
            noteList.push(x);
        }
        this.phrases.push(noteList)



    }


    /// if loudness change 
    /// if melody(pitch) change
    /// if melody (contour) change


}


function findBeats() {
    var count = 0;
    var tempBeats = [];
    while (count < trackOptions.mLength*4) {
        var pickOne = myShuffle(trackOptions.beats)[0];
        if (count + pickOne <= trackOptions.mLength*4) {
            if (count + pickOne === trackOptions.mLength*4) {
                tempBeats.push([count, 0]);
                count = count + pickOne;
            } else {
                tempBeats.push([count, count + pickOne]);
                count = count + pickOne;
            }

        }
    }
    return tempBeats;
}

function findNotes(nBeats, n) {
    var temp = [];
    for (i = 1; i <= nBeats; i++) {
        temp.push(myShuffle(trackOptions.notes[n])[0]);
    }
    return temp;
}


function findLocations(conditions) {
    temp = [];
    temp.push(myShuffle(trackOptions.spatialLocation)[0]);

    for (i = 1; i <= trackOptions.nPhrases - 1; i++) {
        if (conditions[i] == "changeOut") {
            temp.push((temp[i - 1]) * -1);
        } else {
            pickOne = myShuffle(trackOptions.spatialLocation)[0];
            x = temp.concat(pickOne);
            if (allEqual(x) === true) {
                temp.push(pickOne * -1);
            } else {
                temp.push(pickOne);
            }
        }
    }

    return temp;
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
