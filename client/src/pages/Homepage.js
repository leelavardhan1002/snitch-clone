import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import ProductSlider from "../Components/ProductSlider/ProductSlider";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Container,
  IconButton,
  Box,
  ThemeProvider,
  createTheme,
  ButtonGroup,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Prices } from "../Components/Prices";
import ProductCard from "../Components/ProductCard/ProductCard";

// Theme remains the same
export const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderColor: "#000",
          color: "#000",
          borderRadius: "0",
          height: "40px",
          "&:hover": {
            borderColor: "#000",
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        },
        contained: {
          backgroundColor: "#000",
          color: "#fff",
          height: "40px",
          borderRadius: "0",
          "&:hover": {
            backgroundColor: "#333",
          },
        },
      },
    },
  },
});

const Homepage = () => {
  // All state and handlers remain the same
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});

  const handleIncrement = (productId) => {
    if ((quantities[productId] || 0) < 5) {
      setQuantities({
        ...quantities,
        [productId]: (quantities[productId] || 0) + 1,
      });
    } else {
      toast.error("Maximum 5 items allowed per product");
    }
  };

  const handleDecrement = (productId) => {
    if ((quantities[productId] || 0) > 0) {
      setQuantities({
        ...quantities,
        [productId]: quantities[productId] - 1,
      });
    }
  };

  // API calls remain the same
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    const items = Array(quantity).fill(product);
    setCart([...cart, ...items]);
    localStorage.setItem("cart", JSON.stringify([...cart, ...items]));
    toast.success(`${quantity} ${product.name}(s) Added to Cart`);
    setQuantities({ ...quantities, [product._id]: 0 });
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    getAllCategory();
    getTotal();
  }, [checked.length, radio.length]);

  return (
    <ThemeProvider theme={theme}>
      <Layout title={"All Products - Best Offers"}>
        <ProductSlider />
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h4" align="center" gutterBottom>
                All Products
              </Typography>
              <Grid container spacing={2}>
                {products?.map((p) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
                    <ProductCard
                      product={p}
                      quantities={quantities}
                      handleIncrement={handleIncrement}
                      handleDecrement={handleDecrement}
                      handleAddToCart={handleAddToCart}
                      navigate={navigate}
                    />
                  </Grid>
                ))}
              </Grid>

              {products?.length < total && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <Button
                    variant="contained"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(page + 1);
                    }}
                  >
                    {loading ? "Loading..." : "Load More"}
                  </Button>
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Layout>
    </ThemeProvider>
  );
};

export default Homepage;
