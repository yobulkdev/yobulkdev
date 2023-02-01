from transformers import AutoTokenizer, AutoModelForMaskedLM
import torch
tokenizer = AutoTokenizer.from_pretrained("bert-base-uncased")
model = AutoModelForMaskedLM.from_pretrained("bert-base-uncased")

def bert_tfidf_match(list1, list2):
    # Tokenize the strings
    encoded_list_1 = [tokenizer.encode_plus(string, return_tensors="pt", padding=True, truncation=True) for string in list1]
    encoded_list_2 = [tokenizer.encode_plus(string, return_tensors="pt", padding=True, truncation=True) for string in list2]   
    results = {}
    for i, word1 in enumerate(encoded_list_1):
        results[list1[i]] = ["", 0]
        output1 = model(word1["input_ids"])[0].mean(dim=1)
        for j, word2 in enumerate(encoded_list_2):
            output2 = model(word2["input_ids"])[0].mean(dim=1)
            cosine_similarity = torch.nn.functional.cosine_similarity(output1, output2).item()
            if cosine_similarity > results[list1[i]][1]:
                results[list1[i]][0] = list2[j]
                results[list1[i]][1] = cosine_similarity
    for i in list(results.keys()):
        results[i] = results[i][0]
    return results
