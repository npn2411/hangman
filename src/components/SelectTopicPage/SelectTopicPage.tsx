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
      <div className="p-5">
        <div className="mx-auto h-[155px] w-[70%] rounded-3xl border-4 border-green500 px-6 py-4 text-center">
          <span className="mx-auto block text-3xl capitalize text-red500">
            {selectedTopic.name || 'Select Topic'}
          </span>
          <p className="mt-5 line-clamp-2">
            {selectedTopic.words.map((word: string, index: number) => {
              if (index === selectedTopic.words.length - 1) return word;
              return word + ', ';
            })}
          </p>
        </div>
        <div className="mt-10 grid grid-cols-4 gap-10 p-5">
          {topicList.map(({ id, name, img, words }: Topic) => (
            <div
              className="grid cursor-pointer place-items-center rounded-3xl border-4 border-gray-600 bg-gray-800 p-4 text-center"
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
        className="hover:glowing mx-auto mt-4 block rounded-md border-4 px-4 py-2 text-3xl shadow-inner hover:shadow-white"
        onClick={() => setIsSelectingTopic(false)}
      >
        OK
      </button>
    </section>
  );
});
