import { useCallback, useEffect, useState } from 'react';
import { Topic } from '@/App';
import { generateRandomWord, removeSpaceFromWord } from '@/utils';
import { correct_sound, heartbeat_flatline } from '@/assets/audios';
import { HangmanDrawing, HiddenWord, KeyBoard, Menu, Modal } from '.';

interface Props {
  topic: Topic;
  setGameStart: (val: boolean) => void;
  setSelectTopicScreen: (val: boolean) => void;
}

export default function InGameScreen({
  topic,
  setGameStart,
  setSelectTopicScreen
}: Props) {
  const [wordToGuess, setWordToGuess] = useState<string>(() =>
    generateRandomWord(topic)
  );
  const [guessedWords, setGuessedWords] = useState<string[]>([]);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wonCount, setWonCount] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  const incorrectGuessedLetters: string[] = guessedLetters.filter((letter) => {
    if (!wordToGuess.includes(letter)) return letter;
  });

  const lettersArray: string[] = removeSpaceFromWord(wordToGuess);

  const youLose: boolean = incorrectGuessedLetters.length === 10;
  const youWin: boolean =
    wordToGuess.length !== 0 &&
    lettersArray.every((letter) => {
      return guessedLetters.includes(letter);
    });

  const showHint: boolean = incorrectGuessedLetters.length < 6 ? false : true;
  const outOfWord: boolean = guessedWords.length === topic.words.length;

  // show modal when user win or lose
  useEffect(() => {
    if (youLose || youWin) {
      setGuessedWords((preWords) => [...preWords, wordToGuess]);
      const waitTime = (youLose && 2500) || (youWin && 1000) || 2500;
      const id = setTimeout(() => {
        setModalShow(true);
      }, waitTime);
      if (youWin) setWonCount((preVal) => preVal + 1);
      else {
        const heartbearFlatline = new Audio(heartbeat_flatline);
        heartbearFlatline.volume = 0.05;
        heartbearFlatline.play();
      }
      return () => clearTimeout(id);
    }
  }, [youWin, youLose, wordToGuess]);

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
    setGuessedLetters([]);
    setGuessedWords([]);
    setWonCount(0);
    setSelectTopicScreen(true);
  }, []);

  const handleContinue = () => {
    for (let i = 0; i < Infinity; i++) {
      const word = generateRandomWord(topic);
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
    setGuessedLetters([]);
    setGuessedWords([]);
    setWonCount(0);
    setGameStart(false);
  };

  return (
    <div className="relative min-h-screen animate-bg-white-to-dark">
      <Menu
        handleChangeTopic={handleChangeTopic}
        handlePlayAudio={handlePlayAudio}
        selectedTopicName={topic.name}
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
}
