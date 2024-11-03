import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const UserMenuContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  backgroundColor: "#fff",
  minHeight: "100vh",
  padding: theme.spacing(4),
  color: "#000",
}));

const UserMenuHeader = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: "bold",
  marginBottom: "1.5rem",
  color: "#000",
});

const StyledNavLink = styled(NavLink)({
  display: "block",
  textDecoration: "none",
  color: "#000",
  backgroundColor: "#fff",
  padding: "0.8rem 1.5rem",
  margin: "0.5rem 0",
  border: '1px solid #000',
  borderRadius: "0px", // Sharp corners
  fontSize: "1rem",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#e0e0e0",
  },
});

const UserMenu = () => {
  return (
    <UserMenuContainer>
      <UserMenuHeader variant="h1">User Panel</UserMenuHeader>
      <StyledNavLink to="/dashboard/user/profile">Profile</StyledNavLink>
      <StyledNavLink to="/dashboard/user/orders">Orders</StyledNavLink>
    </UserMenuContainer>
  );
};

export default UserMenu;
