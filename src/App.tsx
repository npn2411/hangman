import { useState, useCallback, useEffect } from 'react';
import topics from './data_topics';
import {
  HomePage,
  SelectTopicPage,
  HangmanDrawing,
  HiddenWord,
  KeyBoard,
  Modal,
} from './components';

export interface Topic {
  id: number;
  name: string;
  img?: string;
  words: string[];
}

const App = () => {
  const INITIAL_TOPIC: Topic = {
    id: 0,
    name: '',
    words: [],
  };

  const [gameStarted, setStartGame] = useState(false);
  const [isSelectingTopic, setIsSelectingTopic] = useState(false);
  const [selectedTopic, setSelectTopic] = useState<Topic>(INITIAL_TOPIC);
  const [wordToGuess, setWordToGuess] = useState('');
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [isTransitionEnd, setTransitionEnd] = useState(false);
  const [isModalAppear, setModalAppear] = useState(false);

  const incorrectGuessedLetters: string[] = guessedLetters.filter((letter) => {
    if (!wordToGuess.includes(letter)) return letter;
  });

  const youLose = incorrectGuessedLetters.length === 10;
  const youWin = wordToGuess.split('').some((letter) => {
    !guessedLetters.includes(letter);
  });

  const runOutOfWord =
    guessedWords.length === topics[selectedTopic.id - 1]?.words.length;

  useEffect(() => {
    if (selectedTopic.id) {
      const id = selectedTopic.id;
      const randomNumber = Math.floor(
        Math.random() * topics[id - 1].words.length,
      );
      const word = topics[id - 1].words[randomNumber];
      setWordToGuess(word);
      setGuessedWords((preWords) => [...preWords, word]);
    }
  }, [selectedTopic]);

  // after the hangman transition is end and 1s later the modal appear
  useEffect(() => {
    if (!isTransitionEnd) return;

    const id = setTimeout(() => {
      setModalAppear(true);
    }, 1000);

    return () => clearTimeout(id);
  }, [isTransitionEnd]);

  const handleStarGame = useCallback(() => {
    setStartGame(true);
    setIsSelectingTopic(true);
  }, []);

  const handleClickKey = useCallback((key: string) => {
    if (guessedLetters.includes(key)) return;
    setGuessedLetters((previous) => [...previous, key]);
  }, []);

  const handleContinue = useCallback(() => {
    const id = selectedTopic.id;
    const randomNumber = Math.floor(
      Math.random() * topics[id - 1].words.length,
    );
    let word = topics[id - 1].words[randomNumber];

    while (guessedWords.includes(word)) {
      word = topics[id - 1].words[randomNumber];
    }

    setWordToGuess(word);
    setGuessedWords((preWords) => [...preWords, word]);
    setModalAppear(false);
    setGuessedLetters([]);
    setTransitionEnd(false);
  }, [guessedWords, selectedTopic]);

  const handleChangeTopic = useCallback(() => {
    setModalAppear(false);
    setIsSelectingTopic(true);
    setSelectTopic(INITIAL_TOPIC);
    setGuessedLetters([]);
    setGuessedWords([]);
    setTransitionEnd(false);
  }, []);

  const handleQuit = useCallback(() => {
    setModalAppear(false);
    setStartGame(false);
    setIsSelectingTopic(false);
    setSelectTopic(INITIAL_TOPIC);
    setGuessedWords([]);
    setGuessedLetters([]);
    setTransitionEnd(false);
  }, []);

  return (
<<<<<<< HEAD
    <div className="min-h-screen py-5 bg-black">
=======
    <div className="relative h-screen w-screen bg-black">
>>>>>>> 0c585fc (update style)
      {isModalAppear && (
        <Modal
          youWin={youWin}
          youLose={youLose}
          handleContinue={handleContinue}
          runOutOfWord={runOutOfWord}
          handleChangeTopic={handleChangeTopic}
          handleQuit={handleQuit}
        />
      )}
      {gameStarted ? (
        isSelectingTopic ? (
          <SelectTopicPage
            selectedTopic={selectedTopic}
            setSelectTopic={setSelectTopic}
            topicList={topics}
            setIsSelectingTopic={setIsSelectingTopic}
          />
        ) : (
          // ingame screen
          <div className="container">
            <button className="mx-auto block pt-12" onClick={handleChangeTopic}>
              BACK
            </button>
            <HangmanDrawing
              incorrectGuessed={incorrectGuessedLetters}
              youLose={youLose}
              setTransitionEnd={setTransitionEnd}
            />
            <HiddenWord
              wordToGuess={wordToGuess}
              guessedLetters={guessedLetters}
              youLose={youLose}
            />
            <KeyBoard
              handleClickKey={handleClickKey}
              guessedLetters={guessedLetters}
              youLose={youLose}
            />
          </div>
        )
      ) : (
        <HomePage handleStarGame={handleStarGame} />
      )}
    </div>
  );
};

export default App;
