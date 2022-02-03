import { ReactNode } from "react";

type ButtonProps = {
  btnText: string | ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const DangerButton = ({
  btnText,
  onClick,
  className,
  type,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded disabled:bg-slate-400 uppercase ${className}`}
      disabled={disabled}
      {...rest}
    >
      {btnText}
    </button>
  );
};
