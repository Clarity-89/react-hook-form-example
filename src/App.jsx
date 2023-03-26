import styled from "@emotion/styled";
import { RecipeForm } from "./RecipeForm.jsx";
import "./App.css";

export default function App() {
  return (
    <Container>
      <RecipeForm />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
