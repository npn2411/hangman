import { Topic } from '@/App';

const generateRandomWord = (topic: Topic): string => {
  const randomNumber = Math.floor(Math.random() * topic.words.length);
  const word = topic.words[randomNumber];
  return word;
};

export default generateRandomWord;
