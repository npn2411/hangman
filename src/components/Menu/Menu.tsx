import { memo } from 'react';
import { speaker } from '@/assets/image';

interface Props {
  handleChangeTopic: () => void;
  handlePlayAudio: () => void;
  selectedTopicName: string;
  wonCount: number;
  guessedWords: string[];
  incorrectGuessed: number;
}

export default memo(function Menu({
  handleChangeTopic,
  handlePlayAudio,
  selectedTopicName,
  wonCount,
  guessedWords,
  incorrectGuessed,
}: Props) {
  return (
    <div className="absolute left-[10%] right-[10%] top-[5%] flex items-start justify-between">
      <div className="z-20">
        <button
          className="hover:glowing z-10 block border-2 border-white px-4 py-2 shadow-inner hover:shadow-current"
          onClick={handleChangeTopic}
        >
          Back
        </button>
        <p className="mt-8">
          Topic:
          <span className="text-green500"> {selectedTopicName}</span>
        </p>
      </div>
      <div className="z-20 -mr-2">
        <div className="grid h-[52px] place-items-center">
          <p className="min-w-[146px]">
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
              incorrectGuessed < 6 ? '' : 'animate-fast-pulse'
            }`}
            disabled={incorrectGuessed < 6 ? true : false}
            onClick={handlePlayAudio}
          >
            <img src={speaker} alt={speaker} />
          </button>
        </div>
      </div>
    </div>
  );
});
