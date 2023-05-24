import hangman from '../../assets/image/hangman_title.png';

interface Props {
  handleStarGame: () => void;
}

export default function HomePage({ handleStarGame }: Props) {
  console.log('HomePage');
  return (
    <section className="flex flex-col items-center justify-center pt-[15%]">
      <div>
        <img src={hangman} alt="hangman" className="animate-entrance" />
        <button
          onClick={handleStarGame}
          className="hover:glowing mx-auto mt-20 block text-7xl text-white"
        >
          START
        </button>
      </div>
    </section>
  );
}
