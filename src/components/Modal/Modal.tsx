interface Props {
  youWin: boolean;
  youLose: boolean;
  runOutOfWord: boolean;
  handleContinue: () => void;
  handleChangeTopic: () => void;
  handleQuit: () => void;
}

export default function Modal({
  youWin,
  youLose,
  runOutOfWord,
  handleContinue,
  handleChangeTopic,
  handleQuit,
}: Props) {
  return (
    <div className="fixed z-10 h-screen w-screen origin-center animate-entrance backdrop-blur-[2px]">
      <div className="absolute left-1/2 top-[10%] z-10 grid h-[350px] w-[650px] -translate-x-1/2 place-items-center">
        <h1 className="glowing uppercase text-white/70">
          {(youWin && 'you win') || (youLose && 'game over')}
        </h1>
        <div className="item-center flex gap-10 font-semibold">
          {!runOutOfWord && (
            <button
              onClick={handleContinue}
              className="border-2 border-red500 px-4 py-2 text-red500"
            >
              Continue
            </button>
          )}
          <button
            onClick={handleChangeTopic}
            className="border-2 border-red500 px-4 py-2 text-red500"
          >
            Change Topic
          </button>
          <button
            onClick={handleQuit}
            className="border-2 border-red500 px-4 py-2 text-red500"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}
