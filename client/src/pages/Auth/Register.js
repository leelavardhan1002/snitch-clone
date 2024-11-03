import React, { useState } from "react";
import { Box, Typography, Link } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { HelperText, StyledButton, StyledContainer, StyledForm, StyledLink, StyledTextField } from "./styles/formStyles";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", formData);
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Create Account - Snitch">
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
            CREATE ACCOUNT
          </Typography>

          <StyledTextField
            fullWidth
            placeholder="Enter your name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <StyledTextField
            fullWidth
            placeholder="Enter your email"
            variant="outlined"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <StyledTextField
            fullWidth
            placeholder="Enter your Password"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <StyledTextField
            fullWidth
            placeholder="Enter your Phone"
            variant="outlined"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <StyledTextField
            fullWidth
            placeholder="Enter your address"
            variant="outlined"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <StyledTextField
            fullWidth
            placeholder="What is your favorite food?"
            variant="outlined"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            required
          />
          <HelperText>
            security question for reset password
          </HelperText>

          <StyledButton
            type="submit"
            variant="contained"
            sx={{ marginBottom: "20px" }}
          >
            CREATE
          </StyledButton>

          <Box textAlign="center">
            Already have an account?{" "}
            <StyledLink
              href="/login"
            >
              Login
            </StyledLink>
          </Box>
        </StyledForm>
      </StyledContainer>
    </Layout>
  );
};

export default CreateAccount;