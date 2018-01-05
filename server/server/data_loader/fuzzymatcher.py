from collections import defaultdict, Counter

from typing import Tuple, Set, Iterable, List

class FuzzyMatcher:
    """
    
    Uses ngrams to identify similiar words
    
    You'd think this would be a solved problem but I looked into other
    options on the internet and there are a lot but most of them
    are either O(N^2) or just way too slow.
    This method works surprisingly well for pali and takes mere seconds
    to find similiarties within a 40000 word dictionary.
    
    """
    
    # Future Improvements that aren't a huge deal but would be nice:
    # 1. Certain combinations like kh, dh etc are actually a single
    #    letter and should be treated as such.
    # 2. Instead of using "stopword" style pruning, instead
    #    reduce the weight of common n-grams.
    
    def __init__(self, words:Iterable[str], threshold:float=0.0):
        """
        Add words to be matched against
        
        If threshold is 0.01 than any ngram which appears in more than
        1% of words will be ignored, essentially like a stopword"""
        self.words = words
        self.ngram_mapping = defaultdict(set)
        for word in words:
            self.add(word)
            
        if threshold > 0:
            self._prune_common(len(words) * threshold)
    
    def _prune_common(self, max_count):
        "Prune any ngrams that appear in more than max_count words"
        for k, v in list(self.ngram_mapping.items()):
            if len(v) > max_count:
                del self.ngram_mapping[k]                    
        
    def _make_ngrams(self, word:str, length:int=4) -> Set[str]:
        return {word[i:i+length] for i in range(0, len(word) - length + 1)}
    
    def add(self, word:str):
        ngrams = self._make_ngrams(word)
        for ngram in ngrams:
            self.ngram_mapping[ngram].add(word)
    
    @staticmethod
    def _length_ratio(word:str, other_word:str) -> float:
        "Returns a value between 0 and 1"
        try:
            return min(len(word) / len(other_word), len(other_word) / len(word))
        except DivisionByZero:
            return 0.0
    
    def search(self, word:str, n=10, include_original=False) -> List[Tuple[str, float]]:
        " Return similiar words with a similiarity metric "
        ngrams = self._make_ngrams(word)
        results = Counter()
        for ngram in ngrams:
            results.update(self.ngram_mapping[ngram])
        
        if not include_original and word in results:
            del results[word]
        
        # at least half the ngrams must be in common
        lower_threshold = len(ngrams) * 0.5
        close_matches = [t for t in results.items() if t[1] >= lower_threshold]
        # similarity is based on both the number of ngrams in common and the relative lengths
        ratios = [(other_word, count / len(ngrams) * self._length_ratio(word, other_word) ) 
                  for other_word, count 
                  in close_matches]
        # Sort by ratio and alphabetical order: the latter is only to 
        # produce consistent results between invocations of python
        return sorted(ratios, key=lambda t: (t[1], t[0]), reverse=True)[:n]
