import styled from "@emotion/styled";
import { useForm, useFieldArray } from "react-hook-form";

import { Field } from "./Field";
import { FieldSet } from "./FieldSet";
import { Recipe } from "./types";

interface Props {
  saveData: (data: Recipe) => void;
}
export const RecipeForm = ({ saveData }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Recipe>();
  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control,
  });

  const submitForm = (formData: Recipe) => {
    saveData(formData);
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
          <Field label="Picture" error={errors.picture}>
            <Input
              {...register("picture", {
                required: "Recipe picture is required",
              })}
              type="file"
              id="picture"
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
                valueAsNumber: true,
                max: {
                  value: 10,
                  message: "Maximum number of servings is 10",
                },
              })}
              type="number"
              id="amount"
            />
          </Field>

          {/*Alternative approach using controlled component*/}
          {/*<Field label="Picture" error={errors.picture}>*/}
          {/*  <Controller*/}
          {/*    control={control}*/}
          {/*    name={"picture"}*/}
          {/*    rules={{ required: "Recipe picture is required" }}*/}
          {/*    render={({ field: { value, onChange, ...field } }) => {*/}
          {/*      return (*/}
          {/*        <Input*/}
          {/*          {...field}*/}
          {/*          value={value?.fileName}*/}
          {/*          onChange={(event) => {*/}
          {/*            onChange(event.target.files[0]);*/}
          {/*          }}*/}
          {/*          type="file"*/}
          {/*          id="picture"*/}
          {/*        />*/}
          {/*      );*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</Field>*/}
        </FieldSet>
        <FieldSet label="Ingredients">
          {fields.map((field, index) => {
            return (
              <Row key={field.id}>
                <Field label="Name">
                  <Input
                    type="text"
                    {...register(`ingredients.${index}.name`)}
                    id={`ingredients[${index}].name`}
                  />
                </Field>
                <Field label="Amount">
                  <Input
                    type="text"
                    {...register(`ingredients.${index}.amount`)}
                    defaultValue={field.amount}
                    id={`ingredients[${index}].amount`}
                  />
                </Field>
                <Button
                  type="button"
                  onClick={() => remove(index)}
                  aria-label={`Remove ingredient ${index}`}
                >
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

const Button = styled.button<{ variant?: "primary" | "secondary" }>`
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
