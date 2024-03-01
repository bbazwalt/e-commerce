import { Button } from "@mui/material";
import React from "react";

const PriceDetails = ({
  item,
  handleCheckout,
  isSummary,
  handleBypassPayment,
}) => {
  return (
    <div>
      <p className="pb-4 font-bold uppercase opacity-60">Price Details</p>
      <hr />
      <div className="mb-8 space-y-3 font-semibold">
        <div className="flex justify-between pt-3 text-black">
          <span>Price</span>
          <span>₹{item?.totalPrice}</span>
        </div>
        <div className="flex justify-between pt-3 text-black">
          <span>Discount</span>
          <span className="text-green-600">-₹{item?.discount}</span>
        </div>
        <div className="flex justify-between pt-3 text-black">
          <span>Delivery Charges</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between pt-3 font-bold text-black">
          <span>Total Amount</span>
          <span>₹{item?.totalDiscountedPrice}</span>
        </div>
      </div>
      <Button
        onClick={handleCheckout}
        className="w-full"
        variant="contained"
        sx={{ px: "2rem", py: "1rem", bgcolor: "#1976D2" }}
      >
        CHECKOUT
      </Button>
      {isSummary && (
        <div className="mt-4">
          <Button
            className="mt-15 w-full"
            variant="contained"
            sx={{ px: "2rem", py: "1rem", bgcolor: "green" }}
            onClick={handleBypassPayment}
          >
            BYPASS PAYMENT
          </Button>
        </div>
      )}
    </div>
  );
};

export default PriceDetails;
