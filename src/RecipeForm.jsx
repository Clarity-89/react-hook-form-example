import React from "react";
import styled from "@emotion/styled";
import { FieldSet } from "./FieldSet.jsx";
import { Field } from "./Field.jsx";
import { useForm } from "react-hook-form";

export const RecipeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (formData) => {
    console.log(formData);
  };

  return (
    <Container>
      <h1>New recipe</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <FieldSet label="Basics">
          <Field label="Name" error={errors.name}>
            <Input
              {...register("name", { required: "Recipe name is required" })}
              type="text"
              id="name"
            />
          </Field>
          <Field label="Description" error={errors.description}>
            <TextArea
              {...register("description", {
                maxLength: {
                  value: 100,
                  message: "Description cannot be longer than 100 characters",
                },
              })}
              id="description"
              rows={10}
            />
          </Field>
          <Field label="Servings" error={errors.amount}>
            <Input
              {...register("amount", {
                max: {
                  value: 10,
                  message: "Maximum number of servings is 10",
                },
              })}
              type="number"
              id="amount"
            />
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
  margin-right: auto;
  background-color: ${({ variant }) =>
    variant === "primary" ? "#3b82f6" : "white"};
  color: ${({ variant }) => (variant === "primary" ? "white" : "#213547")};
`;
