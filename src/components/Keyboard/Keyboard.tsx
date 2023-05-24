import { KEYS_ROW_1, KEYS_ROW_2, KEYS_ROW_3 } from './keys';

interface Props {
  handleClickKey: (key: string) => void;
  guessedLetters: string[];
  youLose: boolean;
  youWin: boolean;
}

export default function KeyBoard({
  handleClickKey,
  guessedLetters,
  youLose,
  youWin,
}: Props) {
  return (
    <section className="container mt-12 grid max-w-[700px] grid-rows-3 gap-[12px] p-2">
      <div className="flex items-center justify-between">
        {KEYS_ROW_1.map((key) => (
          <button
            key={key}
            className="aspect-square w-[54px] border-2 border-white p-2 text-2xl font-semibold uppercase transition-opacity duration-200 hover:bg-green500"
            style={{
              opacity: guessedLetters.includes(key) ? 0.4 : 1,
              pointerEvents:
                guessedLetters.includes(key) || youLose || youWin
                  ? 'none'
                  : 'auto',
            }}
            onClick={() => handleClickKey(key)}
          >
            {key}
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-3">
        {KEYS_ROW_2.map((key) => (
          <button
            key={key}
            className="aspect-square w-[54px] border-2 border-white p-2 text-2xl font-semibold uppercase transition-opacity duration-200 hover:bg-green500"
            style={{
              opacity: guessedLetters.includes(key) ? 0.4 : 1,
              pointerEvents:
                guessedLetters.includes(key) || youLose || youWin
                  ? 'none'
                  : 'auto',
            }}
            onClick={() => handleClickKey(key)}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-4">
        {KEYS_ROW_3.map((key) => (
          <button
            key={key}
            className="aspect-square w-[54px] border-2 border-white p-2 text-2xl font-semibold uppercase transition-opacity duration-200 hover:bg-green500"
            style={{
              opacity: guessedLetters.includes(key) ? 0.4 : 1,
              pointerEvents:
                guessedLetters.includes(key) || youLose || youWin
                  ? 'none'
                  : 'auto',
            }}
            onClick={() => handleClickKey(key)}
          >
            {key}
          </button>
        ))}
      </div>
    </section>
  );
}
