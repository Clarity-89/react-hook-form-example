import React from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

export const RecipeForm = () => {
    return (
        <Container>
            <h1>New recipe</h1>
        </Container>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;