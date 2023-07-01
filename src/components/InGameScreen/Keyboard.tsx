import { Button } from '..';

interface Props {
  handleClickKey: (key: string) => void;
  guessedLetters: string[];
  youLose: boolean;
  youWin: boolean;
}

const KEYS = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

export default function KeyBoard({
  handleClickKey,
  guessedLetters,
  youLose,
  youWin
}: Props) {
  return (
    <section className="container mt-12 grid max-w-[700px] grid-rows-3 gap-[12px] p-2">
      {KEYS.map((keyArray: string[], index: number) => (
        <div
          key={index}
          className={`flex items-center ${
            index === 0
              ? 'justify-between'
              : index === 1
              ? 'justify-center gap-3'
              : 'justify-center gap-4'
          }`}
        >
          {keyArray.map((key) => (
            <Button
              key={key}
              name={key}
              className="aspect-square w-[54px] border-2 border-white p-2 text-2xl font-semibold uppercase transition-opacity duration-200 hover:bg-green500"
              style={{
                opacity: guessedLetters.includes(key) ? 0.4 : 1,
                pointerEvents:
                  guessedLetters.includes(key) || youLose || youWin
                    ? 'none'
                    : 'auto'
              }}
              onClick={() => handleClickKey(key)}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
