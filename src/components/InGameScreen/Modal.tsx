interface Props {
  youWin: boolean;
  youLose: boolean;
  outOfWord: boolean;
  handleContinue: () => void;
  handleQuit: () => void;
}

export default (function Modal({
  youWin,
  youLose,
  outOfWord,
  handleContinue,
  handleQuit,
}: Props) {
  return (
    <div className="absolute inset-0 z-10 origin-center animate-opacity-bg backdrop-blur-[2px]">
      <div className="absolute left-1/2 top-[10%] z-10 grid h-[350px] w-[600px] -translate-x-1/2 place-items-center">
        <h1 className="glowing select-none uppercase text-white/70">
          {(youWin && "you're alive") || (youLose && 'game over')}
        </h1>
        {outOfWord && (
          <p className="text-center">
            You have went through all the words from this topic, we&apos;ll add
            new words soon, please change to other topic. <br />
            THANK YOU!!
          </p>
        )}
        <div className="item-center mt-2 flex gap-14 font-semibold">
          {!outOfWord && (
            <button
              onClick={handleContinue}
              className="hover:glowing border-4 border-white px-4 py-2 text-white shadow-inner hover:shadow-current"
            >
              Continue
            </button>
          )}
          <button
            onClick={handleQuit}
            className="hover:glowing border-4 border-white px-4 py-2 text-white shadow-inner hover:shadow-current"
          >
            Quit Game
          </button>
        </div>
      </div>
    </div>
  );
});
