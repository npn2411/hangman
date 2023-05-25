import { memo } from 'react';
import { Topic } from '@/App';

interface Props {
  topicList: Topic[];
  selectedTopic: Topic;
  setSelectTopic: React.Dispatch<React.SetStateAction<Topic>>;
  setIsSelectingTopic: React.Dispatch<React.SetStateAction<boolean>>;
}

export default memo(function SelectTopicPage({
  topicList,
  selectedTopic,
  setSelectTopic,
  setIsSelectingTopic,
}: Props) {
  return (
    <section className="container">
      <div className="mt-10">
        <div className="mx-auto h-[155px] w-[70%] rounded-3xl border-4 border-green500 px-6 py-4 text-center">
          <span className="mx-auto block text-3xl capitalize text-red500">
            {selectedTopic.name || 'Select Topic'}
          </span>
          <p className="mt-5 line-clamp-2 text-black">
            {selectedTopic.words.map((word: string, index: number) => {
              if (index === selectedTopic.words.length - 1) return word;
              return word + ', ';
            })}
          </p>
        </div>
        <div className="grid grid-cols-4 gap-10 p-10">
          {topicList.map(({ id, name, img, words }: Topic) => (
            <div
              className="grid cursor-pointer place-items-center rounded-3xl border-4 border-gray-400 bg-gray-600 p-4 text-center"
              onClick={() =>
                setSelectTopic({
                  id,
                  name,
                  words,
                })
              }
              style={{
                borderColor: selectedTopic.id === id ? '#22c55e' : '',
              }}
              key={name}
            >
              <p className="capitalize">{name}</p>
              <div className="mt-5 h-[120px]">
                <img src={img} alt={name} className="h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`hover:glowing mx-auto mb-5 block rounded-xl border-4 border-red500 px-4 py-2 text-3xl text-red500 ${selectedTopic.id == 0 && 'cursor-not-allowed'}`}
        onClick={() => setIsSelectingTopic(false)}
        disabled={selectedTopic.id == 0 ? true:false}
      >
        Play
      </button>
    </section>
  );
});
