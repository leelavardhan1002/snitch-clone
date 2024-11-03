import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  IconButton,
  ListItem,
  Typography,
  styled,
  Menu,
  Tooltip,
  Badge,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import useCategory from "../../Hooks/useCategory";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import { Avatar } from "antd";

// Styled components
const StyledAppBar = styled(AppBar)({
  boxShadow: "none",
  borderBottom: "1px solid #e0e0e0",
  backgroundColor: "white",
  color: "black",
});

const TopBanner = styled(Box)({
  backgroundColor: "#666666",
  color: "white",
  padding: "8px",
  textAlign: "center",
  fontSize: "14px",
});

const StyledIconButton = styled(IconButton)({
  color: "black",
  "&:hover": {
    backgroundColor: "transparent",
  },
});

const MenuItem = styled(ListItem)({
  padding: "12px 24px",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#666666",
  },
  cursor: "pointer",
});

const MenuButton = styled(Typography)({
  cursor: "pointer",
  padding: "8px 16px",
  "&:hover": {
    color: "#666666",
  },
});

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();
  const navigate = useNavigate();

  // Separate state for categories and account menus
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);

  const isCategoryMenuOpen = Boolean(categoryAnchorEl);
  const isAccountMenuOpen = Boolean(accountAnchorEl);

  const handleCategoryClick = (event) => {
    setCategoryAnchorEl(event.currentTarget);
  };

  const handleCategoryClose = () => {
    setCategoryAnchorEl(null);
  };

  const handleAccountClick = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successful", {
      duration: 3000,
    });
    handleAccountClose();
  };

  const handleDashboard = () => {
    navigate(`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`);
    handleAccountClose();
  };

  const handleCategorySelect = (categoryName) => {
    navigate(`/category/${categoryName.toLowerCase().replace(/\s+/g, "-")}`);
    handleCategoryClose();
  };

  const menuConfig = {
    paper: {
      elevation: 0,
      sx: {
        overflow: "visible",
        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
        mt: 1.5,
        "& .MuiAvatar-root": {
          width: 45,
          height: 32,
          ml: -0.5,
          mr: 1,
        },
        "&::before": {
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          right: 14,
          width: 10,
          height: 10,
          bgcolor: "background.paper",
          transform: "translateY(-50%) rotate(45deg)",
          zIndex: 0,
        },
      },
    },
  };

  return (
    <>
      <TopBanner>
        APP EXCLUSIVE FESTIVE SALE IS NOW LIVE! DOWNLOAD APP
      </TopBanner>

      <StyledAppBar position="static">
        <Box
          py={2}
          px={3}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display={'flex'} alignItems={'center'} gap={4}>
          <Box component={Link} to="/">
            <img
              src="//www.snitch.co.in/cdn/shop/files/SNITCH_LOGO_NEW_BLACK.png?v=1721457834"
              alt="logo"
              height={58}
            />
          </Box>
          <Box>
            <MenuButton onClick={handleCategoryClick}>
              Categories
            </MenuButton>
            <Menu
              anchorEl={categoryAnchorEl}
              open={isCategoryMenuOpen}
              onClose={handleCategoryClose}
              slotProps={menuConfig}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category._id}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          </Box>

          <Box display="flex" gap={1} alignItems="center">
            <SearchInput />

            {/* Account Dropdown */}
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleAccountClick}
                size="small"
              >
                <PersonOutlineIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={accountAnchorEl}
              open={isAccountMenuOpen}
              onClose={handleAccountClose}
              slotProps={menuConfig}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {!auth?.user ? (
                <>
                  <MenuItem onClick={() => navigate("/login")}>
                    Login
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/register")}>
                    Signup
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem sx={{ gap: "3px", display: "flex" }}>
                    <Avatar /> {auth?.user?.name}
                  </MenuItem>
                  <MenuItem onClick={handleDashboard}>
                    Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    Logout
                  </MenuItem>
                </>
              )}
            </Menu>

            {/* Cart Icon */}
            <Badge badgeContent={cart?.length} showZero color="error">
              <StyledIconButton onClick={() => navigate("/cart")}>
                <ShoppingBagOutlinedIcon />
              </StyledIconButton>
            </Badge>
          </Box>
        </Box>
      </StyledAppBar>
    </>
  );
};

export default Header;