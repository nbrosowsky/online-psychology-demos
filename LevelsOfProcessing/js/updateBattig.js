function findRhymes() {
    for (i = 0; i <= Battig.length - 1; i++) {
        var temp

        console.log(Battig[i].word.replace(/[^A-Za-z0-9_]/g, ""))
        temp = RiTa.rhymes(Battig[i].word.replace(/[^A-Za-z0-9_]/g, ""));
        if (temp.length != 0) {
            Battig[i].rhymes = temp
            console.log(Battig[i].rhymes)
        }

    }

}

function saveText(text, filename) {
    var a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(text));
    a.setAttribute('download', filename);
    a.click()
}

var updateBattig = [];

function findSentences() {
    for (n = 0; n <= Battig.length - 1; n++) {
        console.log(((n+1) / (Battig.length)*100))
        Battig[n].sentences = [];
        console.log(Battig[n].word)
        for (i = 0; i <= sentences.length - 1; i++) {
            var found
           
            if ( sentences[i].toLowerCase().match(new RegExp("\\b"+Battig[n].word+"\\b","g"))) {
                found = sentences[i];
//                console.log(found);
                
                found = found.replace(Battig[n].word, "_________")
                Battig[n].sentences.push(found)
            }
        }
        
    }
}

for (i = 0; i <= Battig.length-1; i++){
    if (Battig[i].rhymes){
        if(Battig[i].sentences.length >0){
            if(Battig[i].syl === 2){
                ltdBattig.push(Battig[i])
            }
        }
        
    }
}

for (i = 0; i <= Battig.length-1; i++){
    console.log(i)
     if (Battig[i].sentences.length > 10){
     console.log(i)
         Battig[i].sentences = newShuffle(Battig[i].sentences).slice(0,10)
}
     }