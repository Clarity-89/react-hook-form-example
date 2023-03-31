import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { RecipeForm } from "./RecipeForm.js";

// setup userEvent
function setup(jsx) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}

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

it("should validate form fields", async () => {
  const mockSave = jest.fn();
  const { user } = setup(<RecipeForm saveData={mockSave} />);
  await user.type(
    screen.getByRole("textbox", { name: /description/i }),
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );
  await user.type(screen.getByRole("spinbutton", { name: /servings/i }), "110");

  await user.click(screen.getByRole("button", { name: /save/i }));
  expect(screen.getAllByRole("alert")).toHaveLength(4);
  expect(mockSave).not.toBeCalled();
});

it("should handle ingredient fields", async () => {
  const { user } = setup(<RecipeForm />);
  const addButton = screen.getByRole("button", { name: /add ingredient/i });

  await user.click(addButton);
  // Ingredient name + recipe name
  expect(screen.getAllByRole("textbox", { name: /name/i })).toHaveLength(2);
  expect(screen.getAllByRole("textbox", { name: /amount/i })).toHaveLength(1);

  await user.click(addButton);
  expect(screen.getAllByRole("textbox", { name: /name/i })).toHaveLength(3);
  expect(screen.getAllByRole("textbox", { name: /amount/i })).toHaveLength(2);

  await user.click(
    screen.getByRole("button", { name: /remove ingredient 1/i })
  );
  expect(screen.getAllByRole("textbox", { name: /name/i })).toHaveLength(2);
  expect(screen.getAllByRole("textbox", { name: /amount/i })).toHaveLength(1);
});

it("should submit correct form data", async () => {
  const mockSave = jest.fn();
  const { user } = setup(<RecipeForm saveData={mockSave} />);

  await user.type(
    screen.getByRole("textbox", { name: /name/i }),
    "Test recipe"
  );
  await user.type(
    screen.getByRole("textbox", { name: /description/i }),
    "Delicious recipe"
  );
  await user.type(screen.getByRole("spinbutton", { name: /servings/i }), "4");

  await user.click(screen.getByRole("button", { name: /add ingredient/i }));

  await user.type(
    screen.getAllByRole("textbox", { name: /name/i })[1],
    "Flour"
  );
  await user.type(screen.getByRole("textbox", { name: /amount/i }), "100 gr");

  // Test image upload
  const input = screen.getByLabelText("Picture");
  const file = new File(["File contents"], "recipeImage.png", {
    type: "image/png",
  });

  await userEvent.upload(input, file);
  expect(input.files[0]).toBe(file);
  expect(input.files.item(0)).toBe(file);
  expect(input.files).toHaveLength(1);

  await user.click(screen.getByRole("button", { name: /save/i }));

  expect(mockSave).toHaveBeenCalledWith(
    expect.objectContaining({
      name: "Test recipe",
      description: "Delicious recipe",
      amount: 4,
      ingredients: [{ name: "Flour", amount: "100 gr" }],
    })
  );
});
