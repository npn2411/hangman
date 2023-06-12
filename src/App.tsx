import { useState, useCallback, useEffect } from 'react';
import topics from './data_topics';
import { HomePage, SelectTopicPage, InGame } from './components';
import {
  HangmanDrawing,
  HiddenWord,
  KeyBoard,
  Modal,
  Menu,
} from './components/InGame';
import { correct_sound, heartbeat_flatline } from './assets/audios';
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
  const showHint = incorrectGuessedLetters.length < 6 ? false : true;

  const removeSpaceFromWord = (): string[] => {
    const arrayLettersNoSpace = wordToGuess.split('').filter((letter) => {
      if (letter !== ' ') return letter;
    });
    return arrayLettersNoSpace;
  };

  const youLose = incorrectGuessedLetters.length === 10;
  const youWin =
    wordToGuess.length !== 0 &&
    removeSpaceFromWord().every((letter) => {
      return guessedLetters.includes(letter);
    });

  const outOfWord: boolean =
    guessedWords.length === topics[selectedTopic.id - 1]?.words.length;

  const generateRandomWord: (id: number) => string = (id: number) => {
    const randomNumber = Math.floor(
      Math.random() * topics[id - 1].words.length,
    );
    const word = topics[id - 1].words[randomNumber];
    return word;
  };

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
      else {
        const heartbearFlatline = new Audio(heartbeat_flatline);
        heartbearFlatline.volume = 0.05;
        heartbearFlatline.play();
      }
      return () => clearTimeout(id);
    }
  }, [youWin, youLose]);

  const handleStarGame = () => {
    setGameStart(true);
    setIsSelectingTopic(true);
  };

  const handleClickKey = (key: string) => {
    if (wordToGuess.includes(key)) {
      const audio = new Audio(correct_sound);
      audio.play();
    }
    setGuessedLetters((previous) => [...previous, key]);
  };

  const handlePlayAudio = useCallback(() => {
    const audio = new SpeechSynthesisUtterance();
    audio.text = wordToGuess;
    window.speechSynthesis.speak(audio);
  }, [wordToGuess]);

  const handleChangeTopic = useCallback(() => {
    setModalShow(false);
    setSelectedTopic(INIT_TOPIC);
    setGuessedLetters([]);
    setGuessedWords([]);
    setWonCount(0);
    setIsSelectingTopic(true);
  }, []);

  const handleContinue = () => {
    for (let i = 0; i < Infinity; i++) {
      const word = generateRandomWord(selectedTopic.id);
      if (!guessedWords.includes(word)) {
        setWordToGuess(word);
        break;
      }
    }
    setModalShow(false);
    setGuessedLetters([]);
  };

  const handleQuit = () => {
    setModalShow(false);
    setSelectedTopic(INIT_TOPIC);
    setGuessedLetters([]);
    setGuessedWords([]);
    setWonCount(0);
    setIsSelectingTopic(false);
    setGameStart(false);
  };

  return (
    <div className="relative min-h-screen">
      {!gameStart ? (
        <HomePage handleStarGame={handleStarGame} />
      ) : isSelectingTopic ? (
        <SelectTopicPage
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          topicList={topics}
          setIsSelectingTopic={setIsSelectingTopic}
        />
      ) : (
        <InGame>
          <>
            <Menu
              handleChangeTopic={handleChangeTopic}
              handlePlayAudio={handlePlayAudio}
              selectedTopicName={selectedTopic.name}
              wonCount={wonCount}
              guessedWords={guessedWords.length}
              showHint={showHint}
            />
            <HangmanDrawing
              incorrectGuessed={incorrectGuessedLetters.length}
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
          </>
        </InGame>
      )}
      {/* show modal when user win or lose */}
      {modalShow && (
        <Modal
          youWin={youWin}
          youLose={youLose}
          outOfWord={outOfWord}
          handleContinue={handleContinue}
          handleQuit={handleQuit}
        />
      )}
    </div>
  );
};

export default App;
