type ButtonProps = {
  btnText: string;
};

export const Button = ({ btnText }: ButtonProps) => {
  return (
    <button className="bg-sky-400 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded">
      {btnText}
    </button>
  );
};
