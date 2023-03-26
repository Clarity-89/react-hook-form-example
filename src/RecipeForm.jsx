import styled from "@emotion/styled";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { FieldSet } from "./FieldSet.jsx";
import { Field } from "./Field.jsx";
import { NumberInput } from "./NumberInput.jsx";

export const RecipeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

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
            <Controller
              name="amount"
              control={control}
              defaultValue={1}
              render={({ field: { ref, ...field } }) => (
                <NumberInput
                  {...field}
                  type="number"
                  id="amount"
                  rules={{
                    max: {
                      value: 10,
                      message: "Maximum number of servings is 10",
                    },
                  }}
                />
              )}
            />
          </Field>
        </FieldSet>
        <FieldSet label="Ingredients">
          {fields.map((field, index) => {
            return (
              <Row key={field.id}>
                <Field label="Name">
                  <Input
                    type="text"
                    {...register(`ingredients[${index}].name`)}
                    id={`ingredients[${index}].name`}
                  />
                </Field>
                <Field label="Amount">
                  <Input
                    type="text"
                    {...register(`ingredients[${index}].amount`)}
                    defaultValue={field.amount}
                    id={`ingredients[${index}].amount`}
                  />
                </Field>
                <Button type="button" onClick={() => remove(index)}>
                  &#8722;
                </Button>
              </Row>
            );
          })}
          <Button
            type="button"
            onClick={() => append({ name: "", amount: "" })}
          >
            Add ingredient
          </Button>
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
  padding: 10px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`;

const TextArea = styled.textarea`
  padding: 4px 11px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
`;

const Button = styled.button`
  font-size: 14px;
  cursor: pointer;
  padding: 0.6em 1.2em;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  margin-right: auto;
  background-color: ${({ variant }) =>
    variant === "primary" ? "#3b82f6" : "white"};
  color: ${({ variant }) => (variant === "primary" ? "white" : "#213547")};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  & > * {
    margin-right: 20px;
  }

  button {
    margin: 25px 0 0 8px;
  }
`;
