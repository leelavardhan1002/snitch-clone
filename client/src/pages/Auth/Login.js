import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, Link } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { StyledButton, StyledContainer, StyledForm, StyledLink, StyledTextField } from "./styles/formStyles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Login - Snitch">
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
            LOGIN
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
            placeholder="Enter your Password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              marginBottom: "25px"
            }}
          >
            <StyledLink
              onClick={() => navigate("/forgot-password")}
              sx={{ cursor: 'pointer' }}
            >
              Forgot Password?
            </StyledLink>
          </Box>

          <StyledButton
            type="submit"
            variant="contained"
            sx={{ marginBottom: "20px" }}
          >
            LOG IN
          </StyledButton>

          <Box textAlign="center">
            Don't have an account?{" "}
            <StyledLink
              href="/register"
            >
              Create Account
            </StyledLink>
          </Box>
        </StyledForm>
      </StyledContainer>
    </Layout>
  );
};

export default Login;