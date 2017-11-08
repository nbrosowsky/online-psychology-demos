var audioContext = null;
var isPlaying = false; // Are we currently playing?
var startTime; // The start time of the entire sequence.
var current16thNote; // What note is currently last scheduled?
var tempo = 120.0; // tempo (in beats per minute)
var lookahead = 10; // How frequently to call scheduling function //(in milliseconds)
var scheduleAheadTime = 0.250; // How far ahead to schedule audio (sec) // This is calculated from lookahead, and overlaps  // with next interval (in case the timer is late)
var nextNoteTime = 0.0; // when the next note is due.
var noteResolution = 0; // 0 == 16th, 1 == 8th, 2 == quarter note

var timerWorker = null; // The Web Worker used to fire timer messages


var mLength = 4; // number of quarter notes per measure
var Nmeasures = 16; // number of measures to loop
var counter = -1; // count measures 


var changeTicks = (30 * 1000) / lookahead; // number of ticks needed for slow change over 30 seconds // 


var sequencer = new Object;


function loadTrack(track) {
    sequencer = track;
    mLength = track.mLength;
    tempo = sequencer.BPM_start || sequencer.BPM_current;
    changeTicks = (sequencer.timeChange * 1000) / lookahead

}

function resetTrack() {
    // reset tempo //
    tempo = sequencer.BPM_start || sequencer.BPM_current;
    // reset pitch //
    sequencer.Rate_current = sequencer.Rate_start || sequencer.Rate_current

    // reset locations //
    if (sequencer.change === "location_2" || sequencer.change === "location_1")
        for (n = 0; n <= sequencer.Loc_current.length - 1; n++) {
            sequencer.Loc_current[n] = sequencer.Loc_start[n]
        }



    // reset instruments //
    for (n = 0; n <= sequencer.Vol_current.length - 1; n++) {
        if (sequencer.conditions[n] === "changeIn") {
            sequencer.Vol_current[n] = 0;
        } else {
            sequencer.Vol_current[n] = 1;
            sequencer.Vol_changeIn = 0;
            sequencer.Vol_changeOut = 1;
        }
    }



    // reset counter and update Howls //
    counter = -1;
    stopAll();
    updatePlayer();

}


function stopAll() {
    for (n = 0; n < sequencer.phrases.length; n++) {
        for (i = 0; i < sequencer.phrases[n].length; i++) {
            //
            if (sequencer.phrases[n][i].sound.playing()) {
                //                console.log(sequencer.phrases[n][i].sound.id)
                sequencer.phrases[n][i].sound.stop();
            }
        }
    }

}

function onTick() {

    /// update the Howl parameters according to last tick change
    updatePlayer();

    /// if a slow change trial, then make adjustment to sequencer parameters
    if (sequencer.change != "none") {
        if (sequencer.changeType === "slow") {
            slowChange();
        }
    }

}



function slowChange() {
    switch (sequencer.change) {
        case "instrument":

            if (sequencer.Vol_changeIn + (1 / changeTicks) >= 1) {
                return;
            }

            sequencer.Vol_changeIn = sequencer.Vol_changeIn + (1 / changeTicks);
            sequencer.Vol_changeOut = sequencer.Vol_changeOut - (1 / changeTicks);

            sequencer.Vol_current[0] = sequencer.Vol_changeOut;
            sequencer.Vol_current[sequencer.Vol_current.length - 1] = sequencer.Vol_changeIn;
            //            console.log(sequencer.Vol_changeIn);
            //            console.log(sequencer.Vol_changeOut);
            break;

        case "pitch":
            if (sequencer.Rate_change < 0) {
                if (sequencer.Rate_current + (sequencer.Rate_change / changeTicks) >= sequencer.Rate_start + sequencer.Rate_change) {
                    sequencer.Rate_current = sequencer.Rate_current + sequencer.Rate_change / changeTicks;
                } else {
                    sequencer.Rate_current = sequencer.Rate_start + sequencer.Rate_change
                }
            } else if (sequencer.Rate_change > 0) {
                if (sequencer.Rate_current + (sequencer.Rate_change / changeTicks) <= sequencer.Rate_start + sequencer.Rate_change) {
                    sequencer.Rate_current = sequencer.Rate_current + sequencer.Rate_change / changeTicks;
                } else {
                    sequencer.Rate_current = sequencer.Rate_start + sequencer.Rate_change
                }
            }
            console.log(sequencer.Rate_current)
            //            console.log(window.performance.now() - startTime)
            //            console.log(counter)
            break;

        case "location_2":
            if (Math.abs(sequencer.Loc_current[0] + (sequencer.Loc_change[0] / changeTicks)) >= Math.abs(sequencer.Loc_change[0])) {
                sequencer.Loc_current[0] = sequencer.Loc_change[0]
                sequencer.Loc_current[1] = sequencer.Loc_change[1]
                break;
            }

            sequencer.Loc_current[0] = sequencer.Loc_current[0] + ((sequencer.Loc_change[0] * 2) / changeTicks)
            sequencer.Loc_current[1] = sequencer.Loc_current[1] + ((sequencer.Loc_change[1] * 2) / changeTicks)
            //            console.log(sequencer.Loc_current)
            break;
        case "tempo":
            if (sequencer.BPM_change < 0) {
                if (tempo >= sequencer.BPM_start + sequencer.BPM_change) {
                    tempo = tempo + sequencer.BPM_change / changeTicks;
                } else {
                    tempo = sequencer.BPM_start + sequencer.BPM_change
                }
            } else if (sequencer.BPM_change > 0) {
                if (tempo <= sequencer.BPM_start + sequencer.BPM_change) {
                    tempo = tempo + sequencer.BPM_change / changeTicks;
                } else {
                    tempo = sequencer.BPM_start + sequencer.BPM_change
                }
            }
            //
            console.log(tempo)
            //            console.log(window.performance.now() - startTime)
            //            console.log(counter)


            break;

        default:

            break;
    }
}

function updatePlayer() {
    for (n = 0; n < sequencer.phrases.length; n++) {
        for (i = 0; i < sequencer.phrases[n].length; i++) {
            sequencer.phrases[n][i].sound.stereo(sequencer.Loc_current[n])
            sequencer.phrases[n][i].sound.rate(sequencer.Rate_current)

        }
    }
}


function nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = (60.0 / tempo); // Notice this picks up the CURRENT 
    // tempo value to calculate beat length.
    nextNoteTime += 0.25 * secondsPerBeat; // Add beat length to last beat time

    current16thNote++; // Advance the beat number, wrap to zero
    if (current16thNote == mLength * 4) {
        current16thNote = 0;
    }
}


function scheduleNote(beatNumber, time) {
    var msPerBeat = (60.0 / tempo) * 1000;

    if ((noteResolution == 1) && (beatNumber % 2))
        return; // we're not playing non-8th 16th notes
    if ((noteResolution == 2) && (beatNumber % 4))
        return; // we're not playing non-quarter 8th notes

    if (beatNumber === 0) {
        counter++
        if (sequencer.changeType === "abrupt") {
            if (counter % 2 != 0) {
                if (sequencer.change === "pitch") {
                    sequencer.Rate_current = (sequencer.Rate_start + sequencer.Rate_change) * 1;
                    console.log(sequencer.Rate_current)
                }

                if (sequencer.change === "tempo") {
                    tempo = (sequencer.BPM_start + sequencer.BPM_change) * 1;
                    console.log(tempo)
                }
            } else {
                if (sequencer.change === "pitch") {
                    sequencer.Rate_current = (sequencer.Rate_start) * 1;
                    console.log(sequencer.Rate_current)
                }

                if (sequencer.change === "tempo") {
                    tempo = (sequencer.BPM_start) * 1;
                    console.log(tempo)
                }
            }
        }

    }
    //
    //    console.log(window.performance.now() - startTime)
    //    startTime = window.performance.now()

    for (n = 0; n < sequencer.phrases.length; n++) {
        for (i = 0; i < sequencer.phrases[n].length; i++) {
            if (sequencer.phrases[n][i].beat === beatNumber) {
                sequencer.phrases[n][i].sound.volume(sequencer.Vol_current[n])
                sequencer.phrases[n][i].sound.id = sequencer.phrases[n][i].sound.play()
            }

        }
    }


}

/// Note fade out // dictates the note length ///
function scheduleFade(beatNumber, time) {
    var msPerBeat = (60.0 / tempo) * 1000;

    if ((noteResolution == 1) && (beatNumber % 2))
        return; // we're not playing non-8th 16th notes
    if ((noteResolution == 2) && (beatNumber % 4))
        return; // we're not playing non-quarter 8th notes


    for (n = 0; n < sequencer.phrases.length; n++) {
        for (i = 0; i < sequencer.phrases[n].length; i++) {
            if (sequencer.phrases[n][i].endBeat === beatNumber) {
                //                console.log(sequencer.phrases[n][i].sound.id)
                sequencer.phrases[n][i].sound.fade(sequencer.Vol_current[n], 0, 100, sequencer.phrases[n][i].sound.id);
            }

        }
    }

//    if (beatNumber === 0) {
//       
//    }

}

function scheduler() {
    // perform function on every web worker timer tick
    onTick();

    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
        scheduleFade(current16thNote, nextNoteTime)
        scheduleNote(current16thNote, nextNoteTime);
        nextNote();
    }

}

function play() {
    isPlaying = !isPlaying;
    startTime = window.performance.now();

    if (isPlaying) { // start playing
        current16thNote = -1;
        nextNoteTime = audioContext.currentTime;
        timerWorker.postMessage("start");
        return "stop";
    } else {
        timerWorker.postMessage("stop");
        resetTrack();
        return "play";
    }
}

function tempPlay() {
    isPlaying = !isPlaying;
    startTime = window.performance.now();

    if (isPlaying) { // start playing
        current16thNote = -1;
        nextNoteTime = audioContext.currentTime;
        timerWorker.postMessage("start");
        return "stop";
    } else {
        timerWorker.postMessage("stop");

        return "play";
    }
}

function init() {

    // NOTE: THIS RELIES ON THE MONKEYPATCH LIBRARY BEING LOADED FROM
    // Http://cwilso.github.io/AudioContext-MonkeyPatch/AudioContextMonkeyPatch.js
    // TO WORK ON CURRENT CHROME!!  But this means our code can be properly
    // spec-compliant, and work on Chrome, Safari and Firefox.

    audioContext = new AudioContext();

    timerWorker = new Worker("js/metronomeworker.js");

    timerWorker.onmessage = function (e) {
        if (e.data == "tick") {
            // console.log("tick!");
            scheduler();
        } else
            console.log("message: " + e.data);
    };
    timerWorker.postMessage({
        "interval": lookahead
    });
}

window.addEventListener("load", init);
