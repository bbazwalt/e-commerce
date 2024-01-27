import { StarBorder } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import AddressCard from "../address/AddressCard";
import OrderTracker from "./OrderTracker";

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-40">
      <div>
        <h1 className="font-semibold text-xl py-7">Delivery Address</h1>
        <AddressCard />
      </div>
      <div className="py-20">
        <OrderTracker activeStep={3} />
      </div>
      <Grid className="gap-y-5" container>
        {[1, 1, 1, 1, 1].map((item) => (
          <Grid
            item
            container
            className=" shadow-xl rounded-md p-5 border" 
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="flex items-center space-x-4">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src="https://images.samsung.com/is/image/samsung/p6pim/in/2307/gallery/in-galaxy-z-fold5-f946-sm-f946bzkdins-thumb-537240639?$172_172_PNG$"
                  alt=""
                />
                <div className="space-y-2 ml-5">
                  <p className="font-semibold">Galaxy Z Fold5</p>
                  <p className="space-x-5 opacity-50 text-xs font-semibold">
                    <span>Color: Black</span>
                    <span>Storage: 512GB</span>
                  </p>
                  <p>Seller: Samsung India Private Limited</p>
                  <p>₹150000</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <Box sx={{ color: blue[500] }}>
                <StarBorder sx={{ fontSize: "2rem" }} className="px-2" />
                <span>Rate & Review Product</span>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default OrderDetails;
