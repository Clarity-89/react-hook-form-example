import React from "react";
import styled from "@emotion/styled";

export const Field = ({ label, children }) => {
  const id = getChildId(children);
  return (
    <Container>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
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
  margin: 16px 0;
  padding: 0;
  border: none;
`;

const Label = styled.label``;
