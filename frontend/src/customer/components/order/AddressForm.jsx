import { Box, Button, Grid, TextField } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingText from "../../../shared/components/infoText/LoadingText";
import { createOrder, getUserAddresses } from "../../../redux/order/customer/action";
import AddressCard from "./AddressCard";

const AddressForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector((store) => store.order.isLoading);
  const addresses = useSelector((store) => store.order.addresses);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("streetAddress"),
      city: data.get("city"),
      state: data.get("state"),
      country: data.get("country"),
      postalCode: data.get("postalCode"),
      email: data.get("email"),
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

  useEffect(() => {
    if (!addresses) {
      dispatch(getUserAddresses());
    }
  }, []);

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
          ) : (
            addresses?.map((item) => (
              <div key={item.id} className=" border-b  p-5 py-7">
                <AddressCard item={item} />
                <Button
                  onClick={() => handleSavedAddressSubmit(item)}
                  sx={{ mt: 2, bgcolor: "#1976D2" }}
                  size="large"
                  variant="contained"
                >
                  DELIVER HERE
                </Button>
              </div>
            ))
          )}
        </Grid>

        <Grid item xs={12} lg={7} className="">
          <Box className="rounded-s-md border p-5 shadow-md ">
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
                    autoComplete="family-name"
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
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <div className="flex items-center justify-center">
                    <Button
                      type="submit"
                      sx={{ py: 1.5, mt: 2, bgcolor: "#1976D2" }}
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
