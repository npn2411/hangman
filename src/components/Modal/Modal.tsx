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
    <div className="absolute left-0 top-0 z-10 h-screen w-screen origin-center animate-opacity-bg backdrop-blur-[2px]">
      <div className="absolute left-1/2 top-[10%] z-10 grid h-[350px] w-[650px] -translate-x-1/2 place-items-center">
        <h1 className="glowing select-none uppercase text-white/70">
          {(youWin && 'you win') || (youLose && 'game over')}
        </h1>
        <div className="item-center flex gap-10 font-semibold">
          {!runOutOfWord && (
            <button
              onClick={handleContinue}
              className="hover:glowing border-2 border-white px-4 py-2 text-white shadow-inner hover:shadow-current"
            >
              Continue
            </button>
          )}
          <button
            onClick={handleChangeTopic}
            className="hover:glowing border-2 border-white px-4 py-2 text-white shadow-inner hover:shadow-current"
          >
            Change Topic
          </button>
          <button
            onClick={handleQuit}
            className="hover:glowing border-2 border-white px-4 py-2 text-white shadow-inner hover:shadow-current"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}
