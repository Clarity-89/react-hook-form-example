import React from "react";
import styled from "@emotion/styled";
import { FieldSet } from "./FieldSet.jsx";
import { Field } from "./Field.jsx";

export const RecipeForm = () => {
  return (
    <Container>
      <h1>New recipe</h1>
      <form>
        <FieldSet label="Basics">
          <Field label={"Name"}>
            <Input type="text" name="name" id="name" />
          </Field>
          <Field label={"Description"}>
            <TextArea name="description" id="description" rows={10} />
          </Field>
          <Field label={"Servings"}>
            <Input type="number" name="amount" id="amount" />
          </Field>
        </FieldSet>

        <Field>
          <Button variant="primary">Save</Button>
        </Field>
      </form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 700px;
`;

const Input = styled.input`
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  box-sizing: border-box;
  padding: 4px 11px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`;

const Button = styled.button`
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  background-color: ${({ variant }) =>
    variant === "primary" ? "#3b82f6" : "white"};
  color: ${({ variant }) => (variant === "primary" ? "white" : "#213547")};
`;
