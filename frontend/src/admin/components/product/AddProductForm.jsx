import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../../../redux/product/action";
import { CLEAR_PRODUCT_MESSAGE } from "../../../redux/product/actionType";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    image: "",
    brand: "",
    title: "",
    description: "",
    color: "",
    storage: "",
    memory: "",
    price: 0,
    discountedPrice: 0,
    discountPercent: 0,
    quantity: 0,
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
  });

  const dispatch = useDispatch();

  const message = useSelector((store) => store.product.message);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct(productData));
  };

  const handleOnClick = () => {
    dispatch({ type: CLEAR_PRODUCT_MESSAGE });
  };

  return (
    <div className="p-10 pt-0" onClick={handleOnClick}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className=" py-10 text-center"
      >
        Add Product
      </Typography>
      <form onSubmit={handleSubmit} className=" max-h-[20rem]">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Image URL"
              name="image"
              value={productData.image}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              value={productData.title}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              label="Color"
              name="color"
              value={productData.color}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              label="Storage"
              name="storage"
              value={productData.storage}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              label="Memory"
              name="memory"
              value={productData.memory}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Price"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              value={productData.discountedPrice}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Discount Percent"
              name="discountPercent"
              value={productData.discountPercent}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Top Level Category</InputLabel>
              <Select
                name="topLevelCategory"
                value={productData.topLevelCategory}
                onChange={handleChange}
                label="Top Level Category"
              >
                <MenuItem value="electronics">Electronics</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={productData.secondLevelCategory}
                onChange={handleChange}
                label="Second Level Category"
              >
                <MenuItem value="smartphones">Smartphones</MenuItem>
                <MenuItem value="others">Others</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={productData.thirdLevelCategory}
                onChange={handleChange}
                label="Third Level Category"
              >
                <MenuItem value="galaxy-z-series">Galaxy Z Series</MenuItem>
                <MenuItem value="galaxy-s-series">Galaxy S Series</MenuItem>
                <MenuItem value="galaxy-a-series">Galaxy A Series</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="outlined-multiline-static"
              label="Description"
              name="description"
              multiline
              rows={3}
              value={productData.description}
              onChange={handleChange}
            />
          </Grid>
          {message && (
            <Grid
              item
              xs={12}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                color: "#6AB04A",
              }}
            >
              {message}
            </Grid>
          )}
          <Grid item xs={12}>
            <div className="flex items-center justify-center">
              <Button
                variant="contained"
                sx={{ p: 1.8 }}
                className="py-20"
                size="large"
                type="submit"
              >
                ADD PRODUCT
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddProductForm;
