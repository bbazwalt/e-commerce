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
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  createProduct,
  findAllCategories,
} from "../../../redux/product/action";
import { CLEAR_PRODUCT_MESSAGE } from "../../../redux/product/actionType";
import { toTitleCaseForHyphen } from "../../../utils/utils";

const validationSchema = Yup.object({
  image: Yup.string().trim().strict(true).required("Image URL is required."),
  brand: Yup.string().trim().strict(true).required("Brand is required."),
  title: Yup.string().trim().strict(true).required("Title is required."),
  description: Yup.string()
    .trim()
    .strict(true)
    .required("Description is required."),
  color: Yup.string().trim().strict(true).required("Color is required."),
  storage: Yup.string().trim().strict(true).required("Storage is required."),
  memory: Yup.string().trim().strict(true).required("Memory is required."),
  price: Yup.number()
    .min(0, "Price must be zero or positive.")
    .required("Price is required."),
  discountedPrice: Yup.number()
    .min(0, "Discounted price must be zero or positive.")
    .required("Discounted price is required."),
  discountPercent: Yup.number()
    .min(0, "Discount percent must be zero or positive.")
    .max(100, "Discount percent cannot be more than 100.")
    .required("Discount percent is required."),
  quantity: Yup.number()
    .min(0, "Quantity must be zero or positive.")
    .required("Quantity is required."),
  firstLevelCategory: Yup.string()
    .trim()
    .required("First level category is required."),
  secondLevelCategory: Yup.string()
    .trim()
    .required("Second level category is required."),
  thirdLevelCategory: Yup.string()
    .trim()
    .required("Third level category is required."),
});

const AddProductForm = () => {
  const [secondLevelCategories, setSecondLevelCategories] = useState([]);
  const [thirdLevelCategories, setThirdLevelCategories] = useState([]);

  const categories = useSelector((store) => store.product.categories);
  const message = useSelector((store) => store.product.message);
  const isLoading = useSelector((store) => store.product.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAllCategories());
  }, []);

  const handleOnClick = () => {
    dispatch({ type: CLEAR_PRODUCT_MESSAGE });
  };

  const handleFirstLevelChange = (event) => {
    const { value } = event.target;
    formik.setFieldValue("firstLevelCategory", value);
    formik.setFieldValue("secondLevelCategory", "");
    formik.setFieldValue("thirdLevelCategory", "");
    const filteredCategories = categories.filter(
      (category) =>
        category.parentCategory && category.parentCategory.id === value,
    );
    setSecondLevelCategories(filteredCategories);
    setThirdLevelCategories([]);
  };

  const handleSecondLevelChange = (event) => {
    const { value } = event.target;
    formik.setFieldValue("secondLevelCategory", value);
    formik.setFieldValue("thirdLevelCategory", "");
    const filteredCategories = categories.filter(
      (category) =>
        category.parentCategory && category.parentCategory.id === value,
    );
    setThirdLevelCategories(filteredCategories);
  };

  const formik = useFormik({
    initialValues: {
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
      firstLevelCategory: "",
      secondLevelCategory: "",
      thirdLevelCategory: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const trimmedValues = Object.keys(values).reduce((acc, key) => {
        acc[key] =
          typeof values[key] === "string" ? values[key].trim() : values[key];
        return acc;
      }, {});
      const finalValues = {
        ...trimmedValues,
        firstLevelCategory: categories.find(
          (category) => category.id === formik.values.firstLevelCategory,
        )?.name,
        secondLevelCategory: categories.find(
          (category) => category.id === formik.values.secondLevelCategory,
        )?.name,
      };
      dispatch(createProduct(finalValues));
      formik.resetForm();
    },
  });

  return (
    <div className="p-10 pt-0" onClick={handleOnClick}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center" }}
        className=" py-10 text-center"
      >
        Add Product
      </Typography>
      <form onSubmit={formik.handleSubmit} className=" max-h-[20rem]">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Image URL"
              name="image"
              id="image"
              value={formik.values.image}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.image && Boolean(formik.errors.image)}
              helperText={formik.touched.image && formik.errors.image}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Brand"
              name="brand"
              id="brand"
              value={formik.values.brand}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.brand && Boolean(formik.errors.brand)}
              helperText={formik.touched.brand && formik.errors.brand}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Title"
              name="title"
              id="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              label="Color"
              name="color"
              id="color"
              value={formik.values.color}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.color && Boolean(formik.errors.color)}
              helperText={formik.touched.color && formik.errors.color}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              label="Storage"
              name="storage"
              id="storage"
              value={formik.values.storage}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.storage && Boolean(formik.errors.storage)}
              helperText={formik.touched.storage && formik.errors.storage}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              label="Memory"
              name="memory"
              id="memory"
              value={formik.values.memory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.memory && Boolean(formik.errors.memory)}
              helperText={formik.touched.memory && formik.errors.memory}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              required
              fullWidth
              label="Quantity"
              name="quantity"
              id="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.quantity && Boolean(formik.errors.quantity)}
              helperText={formik.touched.quantity && formik.errors.quantity}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Price"
              name="price"
              id="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Discounted Price"
              name="discountedPrice"
              id="discountedPrice"
              value={formik.values.discountedPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.discountedPrice &&
                Boolean(formik.errors.discountedPrice)
              }
              helperText={
                formik.touched.discountedPrice && formik.errors.discountedPrice
              }
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              required
              fullWidth
              label="Discount Percent"
              name="discountPercent"
              id="discountPercent"
              value={formik.values.discountPercent}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.discountPercent &&
                Boolean(formik.errors.discountPercent)
              }
              helperText={
                formik.touched.discountPercent && formik.errors.discountPercent
              }
            />
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>First Level Category</InputLabel>
              <Select
                name="firstLevelCategory"
                value={formik.values.firstLevelCategory}
                onChange={handleFirstLevelChange}
                label="First Level Category"
              >
                {categories?.map((item) => {
                  return (
                    item.level === 1 && (
                      <MenuItem key={item.id} value={item.id}>
                        {toTitleCaseForHyphen(item.name)}
                      </MenuItem>
                    )
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Second Level Category</InputLabel>
              <Select
                name="secondLevelCategory"
                value={formik.values.secondLevelCategory}
                onChange={handleSecondLevelChange}
                label="Second Level Category"
              >
                {secondLevelCategories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {toTitleCaseForHyphen(item.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth required>
              <InputLabel>Third Level Category</InputLabel>
              <Select
                name="thirdLevelCategory"
                value={formik.values.thirdLevelCategory}
                onChange={formik.handleChange}
                label="Third Level Category"
              >
                {thirdLevelCategories.map((item) => (
                  <MenuItem key={item.id} value={item.name}>
                    {toTitleCaseForHyphen(item.name)}
                  </MenuItem>
                ))}
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
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
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
                disabled={isLoading}
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
