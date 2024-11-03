import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select as AntSelect } from "antd";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Stack,
  Divider,
} from "@mui/material";
import { StyledButton, StyledTextField } from "../Auth/styles/formStyles";

const { Option } = AntSelect;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [image, setPhoto] = useState(null);

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/all-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("category", category);
      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <Box sx={{ display: "flex", p: 3 }}>
        <Box sx={{ width: "25%" }}>
          <AdminMenu />
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ width: "75%", p: 3, backgroundColor: "#fff" }}>
          <Typography variant="h4" gutterBottom>
            Create Product
          </Typography>
          <Stack spacing={3} sx={{ width: "75%" }}>
            <FormControl fullWidth>
              <InputLabel>Select a category</InputLabel>
              <Select
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                label="Select a category"
                sx={{
                  borderRadius: 0,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    color: "black",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                }}
              >
                {categories.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <StyledButton variant="outlined" component="label">
              {image ? image.name : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </StyledButton>
            {image && (
              <Box textAlign="center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="product_image"
                  height="200px"
                  style={{ maxWidth: "100%", marginTop: 10 }}
                />
              </Box>
            )}
            <StyledTextField
              label="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
            />
            <StyledTextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
            <StyledTextField
              label="Price"
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
            />
            <StyledTextField
              label="Quantity"
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(e.target.value)}
              fullWidth
            />
            <FormControl fullWidth>
            <InputLabel>Select Shipping</InputLabel>
              <Select
                variant="outlined"
                onChange={(value) => setShipping(value)}
                label="Select Shipping"
                sx={{
                  borderRadius: 0,
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                    color: "black",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "black",
                  },
                }}
              >
                <MenuItem value="0">No</MenuItem>
                <MenuItem value="1">Yes</MenuItem>
              </Select>
            </FormControl>
            <StyledButton variant="contained" color="primary" onClick={handleCreate}>
              Create Product
            </StyledButton>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreateProduct;
