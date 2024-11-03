import React, { useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
  Collapse,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/Search";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.error(error);
    }
  };

  const handleExpand = () => setExpanded(!expanded);

  const handleClear = () => {
    setValues({ ...values, keyword: "" });
    setExpanded(false);
  };

  return (
    <Box display="flex" alignItems="center">
      {/* Icon button to expand search bar */}
      {!expanded && (
        <IconButton onClick={handleExpand}>
          <SearchIcon />
        </IconButton>
      )}

      {/* Search input with animation */}
      <Collapse in={expanded} orientation="horizontal" timeout={300}>
        <Box component="form" onSubmit={handleSubmit} display="flex">
          <TextField
            variant="outlined"
            placeholder="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear}>
                    <CloseIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              width: expanded ? 200 : 0,
              transition: "width 0.3s ease",
              overflow: "hidden",
              "& .MuiOutlinedInput-root": {
                height: "36px",
                borderRadius: "20px",
                paddingRight: 0,
              },
            }}
          />
        </Box>
      </Collapse>
    </Box>
  );
};

export default SearchInput;
