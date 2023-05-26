import { useState, useCallback, useEffect, useMemo } from 'react';
import topics from './data_topics';
import {
  HomePage,
  SelectTopicPage,
  HangmanDrawing,
  HiddenWord,
  KeyBoard,
  Modal,
  Menu,
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
  const outOfWord: boolean =
    guessedWords.length === topics[selectedTopic.id - 1]?.words.length;
  const audio = new SpeechSynthesisUtterance();

  const makeLettersArrayNoSpace: string[] = useMemo(() => {
    if (!wordToGuess) return [];
    const makeLettersArrayNoSpace = wordToGuess.split('').filter((letter) => {
      if (letter !== ' ') return letter;
    });
    return makeLettersArrayNoSpace;
  }, [wordToGuess]);

  const youLose = incorrectGuessedLetters.length === 10;
  const youWin =
    makeLettersArrayNoSpace.length !== 0 &&
    makeLettersArrayNoSpace.every((letter) => {
      return guessedLetters.includes(letter);
    });

  const generateRandomWord = useCallback((id: number): string => {
    const randomNumber = Math.floor(
      Math.random() * topics[id - 1].words.length,
    );
    const word = topics[id - 1].words[randomNumber];
    return word;
  }, []);

  useEffect(() => {
    if (selectedTopic.id) {
      const word = generateRandomWord(selectedTopic.id);
      setWordToGuess(word);
    }
  }, [selectedTopic]);

  // display a modal after user win or lose
  useEffect(() => {
    if (youLose || youWin) {
      setGuessedWords((preWords) => [...preWords, wordToGuess]);
      const waitTime = (youLose && 2500) || (youWin && 1000) || 0;
      const id = setTimeout(() => {
        setModalAppear(true);
      }, waitTime);
      if (youWin) setWonCount(wonCount + 1);
      return () => clearTimeout(id);
    }
  }, [youWin, youLose]);

  const handleStarGame = useCallback(() => {
    setStartGame(true);
    setIsSelectingTopic(true);
  }, []);

  const handleClickKey = useCallback((key: string) => {
    if (guessedLetters.includes(key)) return;
    setGuessedLetters((previous) => [...previous, key]);
  }, []);

  const handlePlayAudio = useCallback(() => {
    audio.text = wordToGuess;
    window.speechSynthesis.speak(audio);
  }, [wordToGuess]);

  const handleContinue = useCallback(() => {
    for (let i = 0; i < Infinity; i++) {
      const word = generateRandomWord(selectedTopic.id);
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
    setSelectTopic(INITIAL_TOPIC);
    setGuessedLetters([]);
    setGuessedWords([]);
    setWonCount(0);
    setIsSelectingTopic(true);
  }, []);

  const handleQuit = useCallback(() => {
    setModalAppear(false);
    setSelectTopic(INITIAL_TOPIC);
    setGuessedLetters([]);
    setGuessedWords([]);
    setWonCount(0);
    setIsSelectingTopic(false);
    setStartGame(false);
  }, []);

  return (
    <div className="relative min-h-screen">
      {isModalAppear && (
        <Modal
          youWin={youWin}
          youLose={youLose}
          handleContinue={handleContinue}
          outOfWord={outOfWord}
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
          <div className="relative min-h-screen animate-bg-white-to-dark">
            <Menu
              handleChangeTopic={handleChangeTopic}
              handlePlayAudio={handlePlayAudio}
              selectedTopic={selectedTopic}
              wonCount={wonCount}
              guessedWords={guessedWords}
              incorrectGuessedLetters={incorrectGuessedLetters}
            />
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
