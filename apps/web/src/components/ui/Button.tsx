type ButtonProps = {
  btnText: string;
  onClick: () => void;
  color?: "primary" | "secondary";
  className?: string;
};

export const Button = ({ btnText, onClick, color, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        color === "primary"
          ? "bg-sky-400 hover:bg-sky-600 text-white"
          : "bg-gray-200 hover:bg-gray-300 text-gray-800"
      } font-bold py-2 px-4 rounded ${className}`}
    >
      {btnText}
    </button>
  );
};
