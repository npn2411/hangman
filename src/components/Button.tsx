import { ReactNode } from 'react';

interface Props {
  className: string;
  name?: string;
  children?: ReactNode;
  onClick?: () => void;
  [key: string]: any;
}

export default function Button({
  name,
  children,
  className,
  onClick,
  ...otherProps
}: Props) {
  return (
    <button className={className} onClick={onClick} {...otherProps}>
      {name || children}
    </button>
  );
}
