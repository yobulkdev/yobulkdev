# import tensorflow as tf
# import tensorflow_hub as hub
# import numpy as np
# from sklearn.feature_extraction.text import TfidfVectorizer
# from transformers import BertTokenizer

# # Load the BERT model from TensorFlow Hub
# bert_model = "https://tfhub.dev/tensorflow/bert_en_uncased_L-12_H-768_A-12/1"
# bert_layer = hub.Module(bert_model)

# # Load the BERT tokenizer from the Hugging Face Transformers library
# tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")

# # Create a function to calculate the BERT representation of each string
# def bert_representation(strings):
#     # Convert the strings to a list of input examples
#     input_examples = [{"input_ids": [101] + [tokenizer.vocab[token] for token in string.split()] + [102]}
#                       for string in strings]
#     # Pass the inputs through the BERT layer to get the outputs
#     bert_outputs = bert_layer(input_examples)
#     # Extract the last layer of the outputs
#     last_layer = bert_outputs["sequence_output"]
#     return last_layer

# # Use the TfidfVectorizer to calculate the TF-IDF representation of each string
# vectorizer = TfidfVectorizer()

# def tfidf_representation(strings):
#     # Fit the vectorizer on the strings
#     vectorizer.fit_transform(strings)
#     # Transform the strings into their TF-IDF representations
#     tfidf_representations = vectorizer.transform(strings)
#     return tfidf_representations

# # Concatenate the BERT and TF-IDF representations to form a combined representation
# def combined_representation(strings):
#     bert_reps = bert_representation(strings)
#     tfidf_reps = tfidf_representation(strings)
#     combined_reps = np.concatenate([bert_reps, tfidf_reps], axis=-1)
#     return combined_reps

# # Use the combined representation to create a similarity score between the two strings
# def similarity_score(string1, string2):
#     strings = [string1, string2]
#     combined_reps = combined_representation(strings)
#     score = np.dot(combined_reps[0], combined_reps[1])
#     return score

# # Example usage:
# string1 = "string 1"
# string2 = "string 2"
# score = similarity_score(string1, string2)
# print("Similarity score: ", score)
