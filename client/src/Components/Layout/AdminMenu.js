import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

const AdminMenuContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  backgroundColor: "#fff",
  minHeight: "100vh",
  padding: theme.spacing(4),
  color: "#000",
}));

const AdminMenuHeader = styled(Typography)({
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

const AdminMenu = () => {
  return (
    <AdminMenuContainer>
      <AdminMenuHeader variant="h1">Admin Panel</AdminMenuHeader>
      <StyledNavLink to="/dashboard/admin/create-category">Create Category</StyledNavLink>
      <StyledNavLink to="/dashboard/admin/create-product">Create Product</StyledNavLink>
      <StyledNavLink to="/dashboard/admin/products">Products</StyledNavLink>
      <StyledNavLink to="/dashboard/admin/orders">Orders</StyledNavLink>
      <StyledNavLink to="/dashboard/admin/users">Users</StyledNavLink>
    </AdminMenuContainer>
  );
};

export default AdminMenu;
