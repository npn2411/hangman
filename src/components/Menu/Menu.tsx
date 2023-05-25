import { memo } from 'react';
import { Topic } from '@/App';
import { speaker } from '@/assets/image';

interface Props {
  handleChangeTopic: () => void;
  handlePlayAudio: () => void;
  selectedTopic: Topic;
  wonCount: number;
  guessedWords: string[];
  incorrectGuessedLetters: string[];
}

export default memo(function Menu({
  handleChangeTopic,
  handlePlayAudio,
  selectedTopic,
  wonCount,
  guessedWords,
  incorrectGuessedLetters,
}: Props) {
  return (
    <div className="absolute left-[10%] right-[10%] top-[5%] flex items-start justify-between">
      <div className="z-10">
        <button
          className="hover:glowing z-10 block border-2 border-white px-4 py-2 shadow-inner hover:shadow-current"
          onClick={handleChangeTopic}
        >
          Back
        </button>
        <p className="mt-8">
          Topic:
          <span className="text-green500"> {selectedTopic.name}</span>
        </p>
      </div>
      <div className="z-10 -mr-2">
        <div className="grid h-[52px] place-items-center">
          <p>
            Correct:{' '}
            <span className="text-green500">
              {wonCount}/{guessedWords.length}
            </span>
          </p>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <p>Hint:</p>
          <button
            className={`aspect-square w-10 disabled:opacity-30 ${
              incorrectGuessedLetters.length < 6 ? '' : 'animate-fast-pulse'
            }`}
            disabled={incorrectGuessedLetters.length < 6 ? true : false}
            onClick={handlePlayAudio}
          >
            <img src={speaker} alt={speaker} />
          </button>
        </div>
      </div>
    </div>
  );
});
