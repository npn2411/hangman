const removeSpaceFromWord = (word: string): string[] => {
  const lettersArray = word.split('').filter((letter) => {
    if (letter !== ' ') return letter;
  });
  return lettersArray;
};

export default removeSpaceFromWord;
