# levels of processing

The levels of processing model of memory was first proposed by Craik and Lockhart (1972) as an alternative to prior multistore models (e.g., Atkinson and Shiffrin, 1971).


The levels of processing model suggests that it is the depth of mental processing that influences the strength of memories. Experiences that are "deeply" processed should therefore lead to stronger, longer lasting memories, while "shallow" processing should lead to weak memories that are easily forgotten.


Shallow processing is thought to occur when we process only the physical features of some object. For example, we may only process how an object looks (structrual) or sounds (phonemic). Deep processing is thought to occur when we process the semantic information and make connections with previous knowledge. For example, we can think of how an object relates to other objects, or process the meaning of a word.


This experiment is a replication of Craik and Tulving's (1975) Experiment 1. In this experiment we test four different levels of processing using an incidental learning task and recognition memory test. Throughout the first phase of the experiment, you have to make judgments about words:


Is the word in capital letters? (shallow processing)
Does the word rhyme with [WORD]? (shallow processing)
Is the word a(n) type of [CATEGORY]? (deep processing)
Does the word fit the sentence: [SENTENCE]? (deep processing)

In the second phase you are shown a list of words, half old and half new, and identify the old words. Craik and Tulving found memory accuracy to be best for the sentence and category tasks, less for the rhyming task, and poorest for the capital letter task.


*Technical notes: To construct the stimuli, I started with the wordlist from Battig and Montague's (1969) list of categorized norm words (retrieved from the Wordpools R package). I used the datamuse R package/api to find rhyming words (Rhymer R package; Datamuse API), and then used the Tatoeba collection of sentences to find sentences that contained each word (tatoeba.org).


Since not all the words matched with rhymes and/or sentences, and to shrink the file size, I trimmed the wordlist down to only words matched for categories, rhymes, and sentences (~2100 words). This version can be downloaded here as a .csv (Word List). You can also download the original Battig and Montague list as a csv here: Battig and Montague (1969).


[Run Experiment](https://nbrosowsky.github.io/online-psychology-demos/levels-of-processing/index.html)


Further Reading:
- Atkinson, R. C., & Shiffrin, R. M. (1971). The control processes of short-term memory. Stanford: Stanford University.
- Battig, W. F., & Montague, W. E. (1969). Category norms of verbal items in 56 categories A replication and extension of the Connecticut category norms.Journal of experimental Psychology , 80, 1.
- Craik, F. I., & Lockhart, R. S. (1972). Levels of processing: A framework for memory research. Journal of verbal learning and verbal behavior, 11, 671-684.
- Craik, F. I., & Tulving, E. (1975). Depth of processing and the retention of words in episodic memory. Journal of experimental Psychology: general, 104, 268.