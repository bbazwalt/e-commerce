import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../../../store/order/action";
import AddressCard from "../address/AddressCard";

const DeliveryAddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.auth.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("streetAddress"),
      city: data.get("city"),
      state: data.get("state"),
      postalCode: data.get("postalCode"),
      phoneNumber: data.get("phoneNumber"),
    };

    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  const handleSavedAddressSubmit = (item) => {
    const address = item;
    const orderData = { address, navigate };
    dispatch(createOrder(orderData));
  };

  return (
    <div className="ml-10">
      <Grid container spacing={4}>
        <Grid
          xs={12}
          lg={5}
          className="border mt-8 rounded-e-md shadow-md h-[31rem] overflow-y-scroll"
        >
          {user?.addresses?.map((item) => (
            <div className="p-5 py-7  border-b cursor-pointer">
              <AddressCard item={item} />
              <Button
                onClick={() => handleSavedAddressSubmit(item)}
                sx={{ mt: 2, bgcolor: "#1976D2" }}
                size="large"
                variant="contained"
              >
                Deliver Here
              </Button>
            </div>
          ))}
        </Grid>

        <Grid item xs={12} lg={7} className="">
          <Box className="border rounded-s-md shadow-md p-5 ">
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    autoComplete="given-name"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State"
                    fullWidth
                    autoComplete="given-name"
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
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="phoneNUmber"
                    name="phoneNumber"
                    label="Phone Number"
                    fullWidth
                    autoComplete="given-name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    type="submit"
                    sx={{ py: 1.5, mt: 2, bgcolor: "#1976D2" }}
                    size="large"
                    variant="contained"
                  >
                    Deliver Here
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default DeliveryAddressForm;
