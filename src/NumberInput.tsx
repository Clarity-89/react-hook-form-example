import styled from "@emotion/styled";
import { InputHTMLAttributes, ChangeEvent } from "react";

interface NumberInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
}

export const NumberInput = ({ value, onChange, ...rest }: NumberInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.valueAsNumber || 0;
    onChange(value);
  };

  return (
    <Input
      type="number"
      min={0}
      onChange={handleChange}
      value={value}
      {...rest}
    />
  );
};

const Input = styled.input`
  padding: 10px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`;
