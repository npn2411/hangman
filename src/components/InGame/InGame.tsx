interface Props {
  children: JSX.Element;
}

export default function InGame({ children }: Props) {
  return (
    <div className="relative min-h-screen animate-bg-white-to-dark">
      {children}
    </div>
  );
}
