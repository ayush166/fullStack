from django.http import JsonResponse
from nltk.tokenize import word_tokenize
from nltk import ngrams

def generate_ngrams(request):
    string1 = request.GET.get('string1', '')
    string2 = request.GET.get('string2', '')
    
    # Tokenize the strings
    tokens1 = word_tokenize(string1.lower())  # Convert to lower case for case-insensitive matching
    tokens2 = word_tokenize(string2.lower())
    
    # Initialize the response dictionary
    response = {
        'string1': {},
        'string2': {}
    }
    
    # Generate and store ngrams from 1 to 10
    for n in range(1, 11):
        ngrams1 = list(ngrams(tokens1, n)) if len(tokens1) >= n else []
        ngrams2 = list(ngrams(tokens2, n)) if len(tokens2) >= n else []
        
        # Convert ngram tuples to strings
        ngrams1_str = [' '.join(gram) for gram in ngrams1]
        ngrams2_str = [' '.join(gram) for gram in ngrams2]
        
        # Store in the response dictionary
        response['string1'][f'{n}-grams'] = ngrams1_str
        response['string2'][f'{n}-grams'] = ngrams2_str
    
    # Return JSON response with ngrams for each string
    return JsonResponse(response)
