import { memo } from 'react';
import { speaker } from '@/assets/image';
import { Button } from '..';

interface Props {
  handleChangeTopic: () => void;
  handlePlayAudio: () => void;
  selectedTopicName: string;
  wonCount: number;
  guessedWords: number;
  showHint: boolean;
}

export default memo(function Menu({
  handleChangeTopic,
  handlePlayAudio,
  selectedTopicName,
  wonCount,
  guessedWords,
  showHint
}: Props) {
  return (
    <div className="absolute left-[10%] right-[10%] top-[5%] flex items-start justify-between">
      <div className="z-20">
        <Button
          name={'Back'}
          className="hover:glowing z-10 block border-2 border-white px-4 py-2 shadow-inner hover:shadow-current"
          onClick={handleChangeTopic}
        />
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
              {wonCount}/{guessedWords}
            </span>
          </p>
        </div>
        <div className="mt-5 flex items-center gap-2">
          <p>Hint:</p>
          <Button
            className={`aspect-square w-10 disabled:opacity-30 ${
              !showHint ? '' : 'animate-fast-pulse'
            }`}
            disabled={!showHint ? true : false}
            onClick={handlePlayAudio}
          >
            <img src={speaker} alt={speaker} />
          </Button>
        </div>
      </div>
    </div>
  );
});
