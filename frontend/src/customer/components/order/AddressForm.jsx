import { Box, Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  createOrder,
  findUserAddresses,
} from "../../../redux/order/customer/action";
import EmptyItemsText from "../../../shared/components/infoText/EmptyItemsText";
import LoadingText from "../../../shared/components/infoText/LoadingText";
import AddressCard from "./AddressCard";

const validationSchema = Yup.object({
  firstName: Yup.string()
    .trim()
    .strict(true)
    .required("First name is required."),
  lastName: Yup.string().trim().strict(true).required("Last name is required."),
  streetAddress: Yup.string()
    .trim()
    .strict(true)
    .required("Street address is required."),
  city: Yup.string().trim().strict(true).required("City is required."),
  state: Yup.string().trim().strict(true).required("State is required."),
  country: Yup.string().trim().strict(true).required("Country is required."),
  postalCode: Yup.string()
    .trim()
    .strict(true)
    .required("Postal code is required.")
    .matches(/^[1-9][0-9]{5}$/, "Invalid postal code format."),
  email: Yup.string()
    .trim()
    .strict(true)
    .required("Email is required.")
    .email("Invalid email address format."),
  phoneNumber: Yup.string()
    .trim()
    .strict(true)
    .required("Phone number is required")
    .matches(/^(?:\+\d{1,3}[- ]?)?\d{10}$/, "Invalid phone number format."),
});

const AddressForm = () => {
  const addresses = useSelector((store) => store.order.addresses);
  const isLoading = useSelector((store) => store.order.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!addresses) {
      dispatch(findUserAddresses());
    }
  }, []);

  const handleSavedAddressSubmit = (item) => {
    const address = item;
    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      streetAddress: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const trimmedValues = Object.keys(values).reduce((acc, key) => {
        acc[key] = values[key].trim();
        return acc;
      }, {});
      const orderData = { address: trimmedValues, navigate };
      dispatch(createOrder(orderData));
    },
  });

  return (
    <div className="ml-10">
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          className="mt-8 h-[36.05rem] overflow-y-scroll rounded-e-md border shadow-md"
        >
          <div className="flex items-center border-b py-2">
            <h1 className="ml-5 py-2 text-xl font-bold">Saved Addresses</h1>
          </div>
          {isLoading && !addresses ? (
            <LoadingText />
          ) : addresses?.length === 0 && !isLoading ? (
            <EmptyItemsText content="addresses" />
          ) : (
            addresses?.map((item) => (
              <div key={item.id} className=" border-b  p-5 py-7">
                <AddressCard item={item} />
                <Button
                  onClick={() => handleSavedAddressSubmit(item)}
                  sx={{ mt: 2 }}
                  size="large"
                  variant="contained"
                >
                  DELIVER HERE
                </Button>
              </div>
            ))
          )}
        </Grid>
        <Grid item xs={12} lg={7}>
          <Box className="rounded-s-md border p-5 shadow-md ">
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    autoComplete="address"
                    multiline
                    rows={4}
                    value={formik.values.streetAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.streetAddress &&
                      Boolean(formik.errors.streetAddress)
                    }
                    helperText={
                      formik.touched.streetAddress &&
                      formik.errors.streetAddress
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    autoComplete="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.state && Boolean(formik.errors.state)}
                    helperText={formik.touched.state && formik.errors.state}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="country"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.country && Boolean(formik.errors.country)
                    }
                    helperText={formik.touched.country && formik.errors.country}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="postalCode"
                    name="postalCode"
                    label="Postal Code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    value={formik.values.postalCode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.postalCode &&
                      Boolean(formik.errors.postalCode)
                    }
                    helperText={
                      formik.touched.postalCode && formik.errors.postalCode
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="phone"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="flex items-center justify-center">
                    <Button
                      type="submit"
                      sx={{ py: 1.5, mt: 2 }}
                      size="large"
                      variant="contained"
                    >
                      DELIVER HERE
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressForm;
