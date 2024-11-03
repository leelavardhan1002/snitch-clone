import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Components/Layout/Layout";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../Components/ProductCard/ProductCard";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

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
  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    const items = Array(quantity).fill(product);
    setCart([...cart, ...items]);
    localStorage.setItem("cart", JSON.stringify([...cart, ...items]));
    toast.success(`${quantity} ${product.name}(s) Added to Cart`);
    setQuantities({ ...quantities, [product._id]: 0 });
  };

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Category - {category?.name}
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          {products?.length} result(s) found
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
      </Box>
    </Layout>
  );
};

export default CategoryProduct;
