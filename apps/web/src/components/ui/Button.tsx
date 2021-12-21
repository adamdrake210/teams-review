type ButtonProps = {
  btnText: string;
  onClick?: () => void;
  color?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const Button = ({
  btnText,
  onClick,
  color,
  className,
  type,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${
        color === "primary"
          ? "bg-sky-400 hover:bg-sky-600 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
      } font-bold py-2 px-4 rounded disabled:bg-slate-400 ${className}`}
      disabled={disabled}
      {...rest}
    >
      {btnText}
    </button>
  );
};
