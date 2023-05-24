import HANGMAN_DRAWING_PART from './DrawingPart';

interface Props {
  incorrectGuessed: string[];
  youLose: boolean;
  setTransitionEnd: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function HangmanDrawing({
  incorrectGuessed,
  youLose,
  setTransitionEnd,
}: Props) {
  return (
    <section className="container mt-12">
      <div className="relative grid h-[400px] place-items-center">
        {incorrectGuessed.map((letter, index: number) => {
          const Element = HANGMAN_DRAWING_PART[index];
          return Element(youLose, setTransitionEnd);
        })}
      </div>
    </section>
  );
}
