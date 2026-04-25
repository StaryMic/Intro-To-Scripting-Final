
def wrap_words_in_quotes(word_list):
    output_words = []
    for word in word_list:
        output_words.append(f"'{word}'")
    return output_words