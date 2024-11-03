import React from "react";
import { Container, Typography } from "@mui/material";
import {
  StyledButton,
  StyledForm,
  StyledTextField,
} from "../../pages/Auth/styles/formStyles";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <Container
      sx={{
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
      }}
    >
      <StyledForm onSubmit={handleSubmit}>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 400,
            letterSpacing: "0.05em",
            marginBottom: "30px",
          }}
        >
          Create New Category
        </Typography>

        <StyledTextField
          label="Category"
          fullWidth
          placeholder="Enter new category"
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />

        <StyledButton type="submit" variant="contained">
          Submit
        </StyledButton>
      </StyledForm>
    </Container>
  );
};

export default CategoryForm;
