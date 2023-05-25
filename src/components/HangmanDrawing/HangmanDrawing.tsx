// import HANGMAN_DRAWING_PART from './DrawingPart';

interface Props {
  incorrectGuessed: string[];
  youLose: boolean;
}

export default function HangmanDrawing({ incorrectGuessed, youLose }: Props) {
  return (
    <section className="container pt-16">
      <div className="relative grid h-[400px] place-items-center">
        {/* bottom bar */}
        <div
          className={`absolute bottom-0 h-[15px] origin-left bg-white transition-all duration-1000 ${
            incorrectGuessed.length >= 1 ? 'w-[300px]' : 'w-0'
          }`}
        />
        {/* middle bar */}
        <div
          className={`absolute bottom-0 w-[15px] origin-bottom bg-white transition-all duration-1000 ${
            incorrectGuessed.length >= 2 ? 'h-[400px]' : 'h-0'
          }`}
        />
        {/* top bar */}
        <div
          className={`absolute left-1/2 top-0 h-[15px] bg-white transition-all duration-1000 ${
            incorrectGuessed.length >= 3 ? 'w-[160px]' : 'w-0'
          }`}
        />

        {/* head */}
        <div
          className={`${
            incorrectGuessed.length >= 4 ? 'opacity-100' : 'opacity-0'
          } absolute left-1/2 top-[96px] aspect-square w-14 ${
            youLose
              ? 'translate-x-[138px] translate-y-[12px]'
              : 'translate-x-[119px]'
          } rounded-full bg-white transition-all delay-500 duration-[1000ms]`}
        />

        {/* body */}
        <div
          className={`absolute left-1/2 top-[165px] h-[100px] w-[50px] translate-x-[120px] rounded-t-xl bg-white transition-all duration-1000 ${
            incorrectGuessed.length >= 5 ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* left arm */}
        <div
          className={`${
            incorrectGuessed.length >= 6 ? 'opacity-100' : 'opacity-0'
          } curve-reflex absolute left-1/2 top-[164px] origin-top-right translate-x-[75px] transition-all duration-1000 ${
            youLose ? 'rotate-[-15deg]' : 'rotate-0'
          }`}
        />

        {/* right arm */}
        <div
          className={`${
            incorrectGuessed.length >= 7 ? 'opacity-100' : 'opacity-0'
          } curve absolute left-1/2 top-[165px] origin-top-left translate-x-[150px] transition-all duration-1000 ${
            youLose ? 'rotate-[15deg]' : 'rotate-0'
          }`}
        />

        {/* left leg */}
        <div
          className={`${
            incorrectGuessed.length >= 8 ? 'opacity-100' : 'opacity-0'
          } absolute left-1/2 top-[260px] h-[90px] w-[20px] origin-top-right translate-x-[120px] ${
            youLose ? 'rotate-0' : 'rotate-[30deg]'
          } rounded-b-xl bg-white transition-all duration-1000 hover:rotate-0`}
        />

        {/* right leg */}
        <div
          className={`${
            incorrectGuessed.length >= 9 ? 'opacity-100' : 'opacity-0'
          } absolute left-1/2 top-[260px] h-[90px] w-[20px] origin-top-left translate-x-[150px] ${
            youLose ? 'rotate-0' : 'rotate-[-30deg]'
          } rounded-b-xl bg-white transition-all duration-1000`}
        />

        {/* the rop */}
        <div
          className={`${
            incorrectGuessed.length >= 10 ? 'h-[155px]' : 'h-0'
          } absolute left-1/2 top-[15px] w-[10px] translate-x-[132px] bg-white transition-all duration-500`}
        >
          <div
            className={`${
              incorrectGuessed.length >= 10 ? 'w-14' : 'w-0'
            } absolute bottom-0 left-0 h-3  -translate-x-3 rounded-l-full rounded-r-full bg-white transition-all duration-500`}
          ></div>
        </div>

        {/* OLD VER - NOT HAVING ANIMATION */}
        {/* {incorrectGuessed.map((_letter, index: number) => {
        const Element = HANGMAN_DRAWING_PART[index];
        return <span key={index}>{Element(youLose)}</span>;
      })} */}
      </div>
    </section>
  );
}
