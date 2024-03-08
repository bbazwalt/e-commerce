import { Avatar, AvatarGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { capitalizeFirstLetter, formatDate } from "../../../utils/utils";

const OrderCard = ({ item }) => {
  const navigate = useNavigate();

  const renderProductTitles = (orderItems) => {
    const titles = orderItems.map((orderItem) => orderItem.product.title);
    const displayedTitles = titles.slice(0, 2);
    const additionalCount = titles.length - 2;
    return (
      <>
        {displayedTitles.map((title, index) => (
          <p key={index}>{title}</p>
        ))}
        {additionalCount > 0 && (
          <p>
            and {additionalCount} other{additionalCount > 1 && "s"}
          </p>
        )}
      </>
    );
  };

  return (
    <div
      onClick={() => navigate(`/order/${item?.id}`)}
      className="flex min-h-[12rem] cursor-pointer flex-col justify-center border p-5 shadow-lg transition-shadow duration-300 hover:shadow-2xl"
    >
      <div className="flex flex-row items-center justify-between ">
        <div className="flex">
          <div className="flex w-[10rem] items-center justify-center">
            <AvatarGroup
              max={2}
              sx={{
                justifyContent: "start",
                "& .MuiAvatarGroup-avatar": {
                  width: "5rem",
                  height: "5rem",
                },
              }}
            >
              {item.orderItems?.map((orderItem) => (
                <Avatar
                  src={orderItem.product?.image}
                  sx={{ width: "5rem", height: "5rem" }}
                ></Avatar>
              ))}
            </AvatarGroup>
          </div>
          <div className="ml-5 space-y-2 ">
            <div className="text-xl font-medium">
              {renderProductTitles(item.orderItems)}
            </div>
            <p className="font-semibold">
              Total Price:
              <span className="text-gray-500">{" ₹" + item?.totalPrice}</span>
            </p>
            <p className="font-semibold">
              Total Discounted Price:
              <span className="text-gray-500">
                {" ₹" + item?.totalDiscountedPrice}
              </span>
            </p>
          </div>
        </div>
        <div className="space-y-6 text-right font-semibold">
          <p>
            {item?.orderStatus === "DELIVERED" ? (
              <span>
                Delivered on
                <span className="text-gray-500">
                  {" " + formatDate(item?.deliveryDate)}
                </span>
              </span>
            ) : (
              <span>
                Order Status:
                <span className="text-gray-500">
                  {" " + capitalizeFirstLetter(item?.orderStatus)}
                </span>
              </span>
            )}
          </p>
          <p>
            Ordered on
            <span className="text-gray-500">
              {" " + formatDate(item?.createdAt)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
