import { hangman } from '../../assets/image/';

interface Props {
  handleStarGame: () => void;
}

export default function HomePage({ handleStarGame }: Props) {
  return (
    <section className="flex flex-col items-center justify-center pt-[15%]">
      <div>
        <img
          src={hangman}
          alt="hangman"
          className="w-full animate-opacity-bg"
        />
        <button
          onClick={handleStarGame}
          className="hover:glowing mx-auto mt-20 block text-6xl text-white"
        >
          START
        </button>
      </div>
    </section>
  );
}
