import HANGMAN_DRAWING_PART from './DrawingPart';

interface Props {
  incorrectGuessed: string[];
  youLose: boolean;
}

export default function HangmanDrawing({ incorrectGuessed, youLose }: Props) {
  return (
    <section className="container pt-16">
      <div className="relative grid h-[400px] place-items-center">
        {incorrectGuessed.map((_letter, index: number) => {
          const Element = HANGMAN_DRAWING_PART[index];
          return <span key={index}>{Element(youLose)}</span>;
        })}
      </div>
    </section>
  );
}
