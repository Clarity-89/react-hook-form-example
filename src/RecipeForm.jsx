import React from "react";
import styled from "@emotion/styled";
import { FieldSet } from "./FieldSet.jsx";
import { Field } from "./Field.jsx";
import { useForm } from "react-hook-form";

export const RecipeForm = () => {
  const { register, handleSubmit } = useForm();

  const submitForm = (formData) => {
    console.log(formData);
  };

  return (
    <Container>
      <h1>New recipe</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet label="Basics">
          <Field label="Name">
            <Input {...register("name")} type="text" id="name" />
          </Field>
          <Field label="Description">
            <TextArea {...register("description")} id="description" rows={10} />
          </Field>
          <Field label="Servings">
            <Input {...register("amount")} type="number" id="amount" />
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
