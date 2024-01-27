import { Adjust } from "@mui/icons-material";
import { Grid } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const OrderCard = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/account/order/${5}`)}
      className="cursor-pointer p-5 shadow-xl border"
    >
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item xs={6}>
          <div className="flex ">
            <img
              className="w-[5rem] h-[5rem] object-cover object-top"
              src="https://images.samsung.com/is/image/samsung/p6pim/in/2307/gallery/in-galaxy-z-fold5-f946-sm-f946bzkdins-thumb-537240639?$172_172_PNG$"
              alt=""
            />
            <div className="ml-5 space-y-2 ">
              <p className="">Galaxy Z Fold5</p>
              <p className="opacity-50 text-xs font-semibold">Storage: 512GB</p>
              <p className="opacity-50 text-xs font-semibold">Color: Black</p>
            </div>
          </div>
        </Grid>
        <Grid item xs={2}>
          <p>₹150000</p>
        </Grid>
        <Grid item xs={4}>
          {true && (
            <div>
              <p>
                <Adjust
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 mr-2 text-sm"
                />
                <span>Delivered on March 03</span>
              </p>
              <p className="text-sm">Your item has been delivered</p>
            </div>
          )}
          {false && (
            <p>
              <span>Expected Delivery on March 03</span>
            </p>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
