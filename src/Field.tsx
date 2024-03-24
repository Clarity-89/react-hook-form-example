import styled from "@emotion/styled";
import React from "react";
import { FieldError } from "react-hook-form";

interface FieldProps {
  label?: string;
  children: React.ReactElement;
  htmlFor?: string;
  error?: FieldError;
}
export const Field = ({ label, children, htmlFor, error }: FieldProps) => {
  const id = htmlFor || getChildId(children);
  return (
    <Container errorState={!!error}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {!!error && <ErrorMessage role="alert">{error.message}</ErrorMessage>}
    </Container>
  );
};

const getChildId = (children: FieldProps["children"]) => {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
};

const Container = styled.div<{ errorState: boolean }>`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  margin: 16px 0;
  padding: 0;
  border: none;
  width: 100%;

  input,
  textarea {
    border-color: ${({ errorState }) => (errorState ? "red" : "#d9d9d9")};
  }
`;

const Label = styled.label`
  margin-bottom: 2px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
`;
