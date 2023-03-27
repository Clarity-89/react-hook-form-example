import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { RecipeForm } from "./RecipeFormjs";

it("should render the basic fields", () => {
  render(<RecipeForm />);
  expect(
    screen.getByRole("heading", { name: "New recipe" })
  ).toBeInTheDocument();
  expect(screen.getByRole("textbox", { name: /name/i })).toBeInTheDocument();
  expect(
    screen.getByRole("textbox", { name: /description/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("spinbutton", { name: /servings/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /add ingredient/i })
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
});
