import { Button } from "@mui/material";
import { ReactNode } from "react";

type ButtonProps = {
  btnText: string | ReactNode;
  onClick?: () => void;
  color?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export const CustomButton = ({
  btnText,
  onClick,
  color,
  type,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled}
      color={color}
      {...rest}
    >
      {btnText}
    </Button>
  );
};
