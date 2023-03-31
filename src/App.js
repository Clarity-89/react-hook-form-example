import styled from "@emotion/styled";
import { RecipeForm } from "./RecipeForm.js";
import "./App.css";

export default function App() {
  const submitForm = (data) => {
    const formData = new FormData();
    formData.append("files", data.picture[0]);
    data = { ...data, picture: data.picture[0].name };
    formData.append("recipe", JSON.stringify(data));

    return fetch("/api/recipes/create", {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        // Handle successful upload
      } else {
        // Handle error
      }
    });
  };

  return (
    <Container>
      <RecipeForm saveData={submitForm} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
