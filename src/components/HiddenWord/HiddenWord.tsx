interface Props {
  wordToGuess: string;
  guessedLetters: string[];
  youLose: boolean;
}

export default function HiddenWord({
  wordToGuess,
  guessedLetters,
  youLose,
}: Props) {
  return (
    <section className="container mt-12">
      <div className="item-center flex justify-center gap-5">
        {wordToGuess.split('').map((letter: string, index: number) => {
          if (letter === ' ')
            return (
              <span key={index} className="aspect-square h-[60px]">
                {letter}
              </span>
            );
          return (
            <span
              key={index}
              className="z-10 grid aspect-square h-[60px] place-items-center border-2 border-white bg-red500"
            >
              {(guessedLetters?.includes(letter) || youLose) && (
                <p className="pointer-events-none text-3xl font-semibold uppercase text-white">
                  {letter}
                </p>
              )}
            </span>
          );
        })}
      </div>
    </section>
  );
}
