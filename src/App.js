import styled from "@emotion/styled";
import { RecipeForm } from "./RecipeForm.js";
import "./App.css";

export default function App() {
  return (
    <Container>
      <RecipeForm
        saveData={(data) => {
          console.log(data);
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
