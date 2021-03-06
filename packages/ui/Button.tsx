type ButtonProps = {
  btnText: string;
};

export const Button = ({ btnText }: ButtonProps) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      {btnText}
    </button>
  );
};
