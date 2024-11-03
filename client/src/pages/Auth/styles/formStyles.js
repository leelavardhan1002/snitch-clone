import { Button, Container, Link, styled, TextField, Typography } from "@mui/material";

export const StyledContainer = styled(Container)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "#ffffff",
});

export const StyledForm = styled("form")({
  width: "100%",
  maxWidth: "400px",
});

export const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    "& fieldset": {
      borderColor: "#e0e0e0",
      borderWidth: "0 0 1px 0",
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000000",
    },
  },
  "& .MuiInputLabel-root": {
    color: "#666666",
    "&.Mui-focused": {
      color: "#000000",
    },
  },
  "& .MuiInputBase-input": {
    paddingleft: 0,
    paddingRight: 0,
  },
  marginBottom: "25px",
});

export const StyledButton = styled(Button)({
  backgroundColor: "#000000",
  color: "#ffffff",
  padding: "15px",
  borderRadius: "0",
  width: "100%",
  height: "fit-content",
  "&:hover": {
    backgroundColor: "#333333",
  },
});

export const HelperText = styled(Typography)({
  fontSize: "12px",
  color: "#666666",
  marginTop: "-20px",
  marginBottom: "25px",
});

export const StyledLink = styled(Link)({
  color: "#666666",
  textDecoration: "none",
  fontSize: "0.875rem",
  "&:hover": {
    color: "blue",
    textDecoration: "none",
  },
});
