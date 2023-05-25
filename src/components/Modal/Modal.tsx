interface Props {
  youWin: boolean;
  youLose: boolean;
  runOutOfWord: boolean;
  handleContinue: () => void;
  handleQuit: () => void;
}

export default function Modal({
  youWin,
  youLose,
  runOutOfWord,
  handleContinue,
  handleQuit,
}: Props) {
  return (
    <div className="absolute left-0 top-0 z-10 h-screen w-screen origin-center animate-opacity-bg backdrop-blur-[2px]">
      <div className="absolute left-1/2 top-[10%] z-10 grid h-[350px] w-[600px] -translate-x-1/2 place-items-center">
        <h1 className="glowing select-none uppercase text-white/70">
          {(youWin && "you're alive") || (youLose && 'game over')}
        </h1>
        {runOutOfWord && (
          <p className="text-center">
            You have went through all the word from this topic, we'll add new
            words soon, please change to other topic. <br />
            THANK YOU!
          </p>
        )}
        <div className="item-center mt-2 flex gap-10 font-semibold">
          {!runOutOfWord && (
            <button
              onClick={handleContinue}
              className="hover:glowing border-4 border-white px-4 py-2 text-white shadow-inner hover:shadow-current"
            >
              Continue
            </button>
          )}
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
