import { Grid } from "@mui/material";
import AddressCard from "../address/AddressCard";

const PlacedProductCard = ({ item, order }) => {
  return (
    <Grid
      container
      item
      className="rounded-md p-5 shadow-xl"
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Grid item xs={6}>
        <div className="flex items-center">
          <img
            className="mx-2 h-[7rem] w-[7rem] object-cover object-top"
            src={item.product.image}
            alt={item.product.title}
          />
          <div className="space-y-2">
            <p className="font-bold">{item.product.brand} </p>
            <p className="text-xl font-normal">{item.product.title}</p>
            <div className="text-md  space-x-5">
              <span className="font-semibold">
                Color:<span className="font-normal"> {item.product.color}</span>
              </span>
              <span className="font-semibold">
                Storage:
                <span className="font-normal"> {item.product.storage}</span>
              </span>
              <span className="font-semibold">
                Memory:
                <span className="font-normal"> {item.product.memory}</span>
              </span>
              <span className="font-semibold">
                Quantity: <span className="font-normal"> {item.quantity} </span>
              </span>
            </div>
            <p className="font-semibold">
              Total Price: <span className="font-normal">₹{item.price}</span>
            </p>
          </div>
        </div>
      </Grid>
      <Grid item>
        <AddressCard item={order.address} />
      </Grid>
    </Grid>
  );
};

export default PlacedProductCard;
