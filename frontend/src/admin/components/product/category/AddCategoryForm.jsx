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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import {
  createCategory,
  findAllCategories,
} from "../../../../redux/product/action";
import { CLEAR_PRODUCT_MESSAGE } from "../../../../redux/product/actionType";
import { toKebabCase, toTitleCaseForHyphen } from "../../../../utils/utils";

const categorySchema = Yup.object().shape({
  categoryName: Yup.string()
    .trim()
    .strict(true)
    .required("Category name is required")
    .min(1, "Category name must be at least 1 characters long"),
  parentCategoryId: Yup.number().nullable(),
});

const AddCategoryForm = () => {
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

  const formik = useFormik({
    initialValues: {
      categoryName: "",
      parentCategoryId: "",
    },
    validationSchema: categorySchema,
    onSubmit: (values) => {
      const newCategory = {
        name: toKebabCase(values.categoryName.trim()),
        parentCategoryId:
          values.parentCategoryId === "" ? null : values.parentCategoryId,
      };
      dispatch(createCategory(newCategory));
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
        Add Category
      </Typography>
      <form onSubmit={formik.handleSubmit} className="max-h-[20rem]">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Parent Category</InputLabel>
              <Select
                fullWidth
                label="Parent Category"
                name="parentCategoryId"
                id="parentCategoryId"
                value={formik.values.parentCategoryId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {toTitleCaseForHyphen(category.name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Category Name"
              name="categoryName"
              id="categoryName"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.categoryName &&
                Boolean(formik.errors.categoryName)
              }
              helperText={
                formik.touched.categoryName && formik.errors.categoryName
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
                ADD CATEGORY
              </Button>
            </div>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddCategoryForm;
