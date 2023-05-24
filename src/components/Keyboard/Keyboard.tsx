import KEYS from './keys';

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
    <section className="container mt-12 max-w-[550px]">
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(50px, 1fr))',
        }}
      >
        {KEYS.map((key) => (
          <button
            key={key}
            className="border-2 border-white p-2 text-2xl font-semibold uppercase transition-opacity duration-200 hover:bg-green500"
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
