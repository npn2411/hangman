const RIGHT_LEG = (youLose: boolean) => {
  return (
    <div
      className={`absolute left-1/2 top-[250px] h-[100px] w-[20px] origin-top-left translate-x-[150px] ${
        youLose ? 'rotate-0' : 'rotate-[-30deg]'
      } rounded-b-xl bg-white transition-all duration-1000`}
    />
  );
};

const LEFT_LEG = (youLose: boolean) => {
  return (
    <div
      className={`absolute left-1/2 top-[250px] h-[100px] w-[20px] origin-top-right translate-x-[120px] ${
        youLose ? 'rotate-0' : 'rotate-[30deg]'
      } rounded-b-xl bg-white transition-all duration-1000 hover:rotate-0`}
    />
  );
};

const RIGHT_ARM = (youLose: boolean) => {
  return (
    <div
      className={`curve absolute left-1/2 top-[155px] origin-top-left translate-x-[150px] transition-all duration-1000 ${
        youLose ? 'rotate-[15deg]' : 'rotate-0'
      }`}
    />
  );
};

const LEFT_ARM = (youLose: boolean) => {
  return (
    <div
      className={`curve-reflex absolute left-1/2 top-[155px] origin-top-right translate-x-[75px] transition-all duration-1000 ${
        youLose ? 'rotate-[-15deg]' : 'rotate-0'
      }`}
    />
  );
};

const BODY = () => {
  return (
    <div className="absolute left-1/2 top-[155px] h-[100px] w-[50px] translate-x-[120px] rounded-t-xl bg-white" />
  );
};

const HEAD = (
  youLose: boolean,
  setTransitionEnd: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  return (
    <div
      className={`absolute left-1/2 top-[100px] aspect-square w-14 ${
        youLose
          ? 'translate-x-[135px] translate-y-[10px]'
          : 'translate-x-[120px]'
      } rounded-full bg-white transition-all duration-[1250ms]`}
      onTransitionEnd={() => setTransitionEnd(true)}
    />
  );
};

const ROP = () => {
  return (
    <div className="absolute left-1/2 top-[15px] h-[140px] w-[10px] translate-x-[130px] bg-white" />
  );
};

const TOP_BAR = () => {
  return (
    <div className="absolute left-1/2 top-0 h-[15px] w-[160px] bg-white" />
  );
};

const BODY_BAR = () => {
  return (
    <div className="bottom-0 left-1/2 h-[400px] w-[15px] -translate-x-1/2 bg-white" />
  );
};

const BOTTOM_BAR = () => {
  return (
    <div className="absolute bottom-0 left-1/2 h-[15px] w-[300px] -translate-x-1/2 bg-white" />
  );
};

const HANGMAN_DRAWING_PART = [
  BOTTOM_BAR,
  BODY_BAR,
  TOP_BAR,
  HEAD,
  BODY,
  LEFT_ARM,
  RIGHT_ARM,
  LEFT_LEG,
  RIGHT_LEG,
  ROP,
];

export default HANGMAN_DRAWING_PART;
