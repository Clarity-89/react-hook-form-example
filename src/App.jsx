import { RecipeForm } from "./RecipeForm.jsx";
import styled from "@emotion/styled";
import "./App.css";
function App() {
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
export default App;
