// ProductCard.js
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
  ButtonGroup,
  ThemeProvider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { theme } from "../../pages/Homepage";

const ProductCard = ({
  product,
  quantities,
  handleIncrement,
  handleDecrement,
  handleAddToCart,
  navigate,
}) => (
  <ThemeProvider theme={theme}>
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        height="300"
        image={`/api/v1/product/product-image/${product._id}`}
        alt={product.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <Typography variant="h6">{product.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description.substring(0, 30)}
        </Typography>
        <Typography variant="h6" color="primary">
          ${product.price}
        </Typography>

        <Box
          sx={{ mt: "auto", display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <ButtonGroup variant="outlined" size="small">
              <IconButton
                onClick={() => handleDecrement(product._id)}
                disabled={!quantities[product._id]}
              >
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ px: 2, display: "flex", alignItems: "center" }}>
                {quantities[product._id] || 0}
              </Typography>
              <IconButton
                onClick={() => handleIncrement(product._id)}
                disabled={quantities[product._id] >= 5}
              >
                <AddIcon />
              </IconButton>
            </ButtonGroup>
          </Box>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigate(`/product/${product.slug}`)}
          >
            More Details
          </Button>

          <Button
            variant="contained"
            fullWidth
            disabled={!quantities[product._id]}
            onClick={() => handleAddToCart(product)}
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  </ThemeProvider>
);

export default ProductCard;
