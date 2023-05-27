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
  const INIT_TOPIC: Topic = {
    id: 0,
    name: '',
    words: [],
  };

  const [gameStart, setGameStart] = useState(false);
  const [isSelectingTopic, setIsSelectingTopic] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(INIT_TOPIC);
  const [wordToGuess, setWordToGuess] = useState('');
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wonCount, setWonCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const incorrectGuessedLetters: string[] = guessedLetters.filter((letter) => {
    if (!wordToGuess.includes(letter)) return letter;
  });
  const outOfWord: boolean =
    guessedWords.length === topics[selectedTopic.id - 1]?.words.length;
  const audio = new SpeechSynthesisUtterance();

  const arrayLettersNoSpace: string[] = useMemo(() => {
    if (!wordToGuess) return [];
    const arrayLettersNoSpace = wordToGuess.split('').filter((letter) => {
      if (letter !== ' ') return letter;
    });
    return arrayLettersNoSpace;
  }, [wordToGuess]);

  const youLose = incorrectGuessedLetters.length === 10;
  const youWin =
    arrayLettersNoSpace.length !== 0 &&
    arrayLettersNoSpace.every((letter) => {
      return guessedLetters.includes(letter);
    });

  const generateRandomWord: (id: number) => string = useCallback(
    (id: number) => {
      const randomNumber = Math.floor(
        Math.random() * topics[id - 1].words.length,
      );
      const word = topics[id - 1].words[randomNumber];
      return word;
    },
    [],
  );

  useEffect(() => {
    if (selectedTopic.id) {
      const word = generateRandomWord(selectedTopic.id);
      setWordToGuess(word);
    }
  }, [selectedTopic]);

  // show modal when user win or lose
  useEffect(() => {
    if (youLose || youWin) {
      setGuessedWords((preWords) => [...preWords, wordToGuess]);
      const waitTime = (youLose && 2500) || (youWin && 1000) || 2500;
      const id = setTimeout(() => {
        setModalShow(true);
      }, waitTime);
      if (youWin) setWonCount(wonCount + 1);
      return () => clearTimeout(id);
    }
  }, [youWin, youLose]);

  const handleStarGame = useCallback((): void => {
    setGameStart(true);
    setIsSelectingTopic(true);
  }, []);

  const handleClickKey = useCallback((key: string): void => {
    if (guessedLetters.includes(key)) return;
    setGuessedLetters((previous) => [...previous, key]);
  }, []);

  const handlePlayAudio = useCallback((): void => {
    audio.text = wordToGuess;
    window.speechSynthesis.speak(audio);
  }, [wordToGuess]);

  const handleContinue = useCallback((): void => {
    for (let i = 0; i < Infinity; i++) {
      const word = generateRandomWord(selectedTopic.id);
      if (!guessedWords.includes(word)) {
        setWordToGuess(word);
        break;
      }
    }
    setModalShow(false);
    setGuessedLetters([]);
  }, [guessedWords, selectedTopic]);

  const handleChangeTopic = useCallback((): void => {
    setModalShow(false);
    setSelectedTopic(INIT_TOPIC);
    setGuessedLetters([]);
    setGuessedWords([]);
    setWonCount(0);
    setIsSelectingTopic(true);
  }, []);

  const handleQuit = useCallback((): void => {
    setModalShow(false);
    setSelectedTopic(INIT_TOPIC);
    setGuessedLetters([]);
    setGuessedWords([]);
    setWonCount(0);
    setIsSelectingTopic(false);
    setGameStart(false);
  }, []);

  return (
    <div className="relative min-h-screen">
      {modalShow && (
        <Modal
          youWin={youWin}
          youLose={youLose}
          handleContinue={handleContinue}
          outOfWord={outOfWord}
          handleQuit={handleQuit}
        />
      )}
      {gameStart ? (
        isSelectingTopic ? (
          <SelectTopicPage
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
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
