interface Props {
  children: JSX.Element;
}

export default function InGameScreen({ children }: Props) {
  return (
    <div className="relative min-h-screen animate-bg-white-to-dark">
      {children}
    </div>
  );
}
