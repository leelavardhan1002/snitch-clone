import React, { useEffect, useState } from "react";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import { toast } from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import {
  Container,
  Grid,
  Paper,
  Typography,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Divider,
  CircularProgress,
  ButtonGroup,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  DeleteOutline as DeleteIcon,
  ShoppingCart as CartIcon,
} from "@mui/icons-material";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Combine duplicate items and add quantity
  const consolidatedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i._id === item._id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  const updateQuantity = (productId, change) => {
    const updatedCart = [...cart];
    const existingItemIndex = consolidatedCart.findIndex(
      (item) => item._id === productId
    );

    if (existingItemIndex !== -1) {
      const item = consolidatedCart[existingItemIndex];
      const newQuantity = (item.quantity || 1) + change;

      if (newQuantity <= 0) {
        // Remove item completely
        const filteredCart = cart.filter((item) => item._id !== productId);
        setCart(filteredCart);
        localStorage.setItem("cart", JSON.stringify(filteredCart));
        toast.success("Item removed");
      } else {
        // Update quantity
        if (change > 0) {
          // Adding item
          updatedCart.push(item);
        } else {
          // Removing one instance
          const indexToRemove = updatedCart.findIndex((i) => i._id === productId);
          updatedCart.splice(indexToRemove, 1);
        }
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    }
  };

  const totalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price, 0)
      .toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
    toast.success("Cart cleared");
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error(error);
      toast.error("Failed to initialize payment system");
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Payment failed");
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.token]);

  return (
    <Layout title="Shopping Cart">
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={4}>
          {auth?.token && (
            <Typography variant="h4" gutterBottom>
              Welcome back, {auth.user.name}
            </Typography>
          )}
          <Typography variant="subtitle1" color="text.secondary">
            {consolidatedCart.length
              ? `Your cart has ${cart.length} item${cart.length !== 1 ? "s" : ""}`
              : "Your cart is empty"}
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Cart Items Section */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="h6">Cart Items</Typography>
                {consolidatedCart.length > 0 && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                )}
              </Box>

              {consolidatedCart.length > 0 ? (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {consolidatedCart.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={2}>
                              <img
                                src={`/api/v1/product/product-image/${item._id}`}
                                alt={item.name}
                                style={{
                                  width: 80,
                                  height: 80,
                                  objectFit: "cover",
                                  borderRadius: 4,
                                }}
                              />
                              <Box>
                                <Typography variant="subtitle2">
                                  {item.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {item.description.substring(0, 60)}...
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="center">
                            <ButtonGroup size="small">
                              <IconButton
                                onClick={() => updateQuantity(item._id, -1)}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <Button disabled>{item.quantity}</Button>
                              <IconButton
                                onClick={() => updateQuantity(item._id, 1)}
                              >
                                <AddIcon />
                              </IconButton>
                            </ButtonGroup>
                          </TableCell>
                          <TableCell align="right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              color="error"
                              onClick={() =>
                                updateQuantity(item._id, -item.quantity)
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  py={4}
                >
                  <CartIcon sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
                  <Typography color="text.secondary" gutterBottom>
                    No items in cart
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/products")}
                    sx={{ mt: 2 }}
                  >
                    Continue Shopping
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Order Summary Section */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box my={2}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography>Subtotal</Typography>
                  <Typography>{totalPrice()}</Typography>
                </Box>
                <Divider />
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mt={1}
                >
                  <Typography variant="h6">Total</Typography>
                  <Typography variant="h6">{totalPrice()}</Typography>
                </Box>
              </Box>

              {auth?.user?.address ? (
                <Box mt={3}>
                  <Typography variant="subtitle2" gutterBottom>
                    Delivery Address
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    paragraph
                  >
                    {auth.user.address}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate("/dashboard/user/profile")}
                    fullWidth
                  >
                    Update Address
                  </Button>

                  {clientToken && consolidatedCart.length > 0 && (
                    <Box mt={3}>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={handlePayment}
                        disabled={loading || !instance}
                        sx={{ mt: 2 }}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Complete Payment"
                        )}
                      </Button>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box mt={3}>
                  {auth?.token ? (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Add Delivery Address
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Login to Checkout
                    </Button>
                  )}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default CartPage;