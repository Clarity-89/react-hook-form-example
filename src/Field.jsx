import React from "react";
import styled from "@emotion/styled";

export const Field = ({ label, children, error }) => {
  const id = getChildId(children);
  return (
    <Container>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      {error && <ErrorMessage role={"alert"}>{error}</ErrorMessage>}
    </Container>
  );
};

const getChildId = (children) => {
  const child = React.Children.only(children);

  if ("id" in child?.props) {
    return child.props.id;
  }
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  margin: 16px 0;
  padding: 0;
  border: none;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 2px;
`;

const ErrorMessage = styled.div`
  color: red;
`;
