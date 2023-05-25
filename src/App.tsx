import { useState, useCallback, useEffect, useMemo } from 'react';
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
  const [wonCount, setWonCount] = useState(0);
  const [isModalAppear, setModalAppear] = useState(false);

  const incorrectGuessedLetters: string[] = guessedLetters.filter((letter) => {
    if (!wordToGuess.includes(letter)) return letter;
  });

  const youLose = incorrectGuessedLetters.length === 10;

  const removedSpaceWord = useMemo(() => {
    if (!wordToGuess) return '';

    const removedSpaceWord = wordToGuess.split('').filter((letter) => {
      if (letter !== ' ') return letter;
    });
    return removedSpaceWord;
  }, [wordToGuess]);

  const youWin =
    removedSpaceWord !== '' &&
    removedSpaceWord.every((letter) => {
      return guessedLetters.includes(letter);
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
    }
  }, [selectedTopic]);

  useEffect(() => {
    if (!youLose && !youWin) return;

    setGuessedWords((preWords) => [...preWords, wordToGuess]);

    const waitTime = (youLose && 2500) || (youWin && 1000) || 0;

    const id = setTimeout(() => {
      setModalAppear(true);
    }, waitTime);

    if (youWin) setWonCount(wonCount + 1);
    return () => clearTimeout(id);
  }, [youWin, youLose]);

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

    for (let i = 0; i < Infinity; i++) {
      const randomNumber = Math.floor(
        Math.random() * topics[id - 1].words.length,
      );
      const word = topics[id - 1].words[randomNumber];
      if (!guessedWords.includes(word)) {
        setWordToGuess(word);
        break;
      }
    }

    setModalAppear(false);
    setGuessedLetters([]);
  }, [guessedWords, selectedTopic]);

  const handleChangeTopic = useCallback(() => {
    setModalAppear(false);
    setIsSelectingTopic(true);
    setSelectTopic(INITIAL_TOPIC);
    setGuessedLetters([]);
    setGuessedWords([]);
    setWonCount(0);
  }, []);

  const handleQuit = useCallback(() => {
    setModalAppear(false);
    setStartGame(false);
    setIsSelectingTopic(false);
    setSelectTopic(INITIAL_TOPIC);
    setGuessedWords([]);
    setGuessedLetters([]);
    setWonCount(0);
  }, []);

  return (
    <div className="min-h-screen">
      {isModalAppear && (
        <Modal
          youWin={youWin}
          youLose={youLose}
          handleContinue={handleContinue}
          runOutOfWord={runOutOfWord}
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
          <div className="relative h-screen animate-bg-white-to-dark">
            <div className="absolute left-[10%] right-[10%] top-[5%] flex items-start justify-between">
              <button
                className="hover:glowing z-10 block rounded-xl border-2 border-white px-4 py-2 shadow-inner hover:shadow-current"
                onClick={handleChangeTopic}
              >
                Back
              </button>
              <div className="z-10 -mr-2">
                <p>
                  Topic:
                  <span className="text-green500"> {selectedTopic.name}</span>
                </p>
                <p className="mt-10">
                  Correct:{' '}
                  <span className="text-green500">
                    {wonCount}/{guessedWords.length}
                  </span>
                </p>
              </div>
            </div>
            <HangmanDrawing
              incorrectGuessed={incorrectGuessedLetters}
              youLose={youLose}
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
              youWin={youWin}
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
