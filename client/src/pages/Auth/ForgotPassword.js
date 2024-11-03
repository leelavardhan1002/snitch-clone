import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { StyledButton, StyledContainer, StyledForm, StyledTextField } from "./styles/formStyles";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();

  // form-submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data.message, { duration: 4000 });
        navigate("/login");
      } else {
        toast.error(res.data.message, { duration: 3000 });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Reset Password - Snitch">
      <StyledContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            sx={{ 
              fontWeight: 400, 
              letterSpacing: "0.05em", 
              marginBottom: "40px" 
            }}
          >
            Reset Password
          </Typography>

          <StyledTextField
            fullWidth
            placeholder="Enter your email"
            variant="outlined"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <StyledTextField
            fullWidth
            placeholder="Enter your favorite food?"
            variant="outlined"
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            required
          />

          <StyledTextField
            fullWidth
            placeholder="Enter your new Password"
            variant="outlined"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <StyledButton
            type="submit"
            variant="contained"
            sx={{ marginTop: "20px" }}
          >
            RESET
          </StyledButton>
        </StyledForm>
      </StyledContainer>
    </Layout>
  );
};

export default ForgotPassword;
