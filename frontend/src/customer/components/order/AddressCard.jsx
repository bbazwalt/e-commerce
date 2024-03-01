import React from "react";
import { capitalizeFirstLetter, formatDate } from "../../../utils/utils";

const AddressCard = ({ item, isOrder, orderItem }) => {
  return (
    <div className={`flex flex-row items-center justify-between `}>
      <div className="space-y-3">
        <p className="font-semibold">
          {item?.firstName} {item?.lastName}
        </p>
        <p>
          {item?.streetAddress}, {item?.city}, {item?.state}, {item?.country},{" "}
          {item?.postalCode}
        </p>
        <div className="flex flex-row space-x-2">
          <p className="font-semibold">
            Phone Number:{" "}
            <span className="font-normal">{item?.phoneNumber}</span>
          </p>
          <p className="font-semibold">
            Email: <span className="font-normal">{item?.email}</span>
          </p>
        </div>
      </div>
      {isOrder && (
        <div className="space-y-6 text-right font-semibold">
          <p>
            {orderItem?.orderStatus === "DELIVERED" ? (
              <span>
                Delivered on
                <span className="text-gray-500">
                  {" " + formatDate(orderItem?.deliveryDate)}
                </span>
              </span>
            ) : (
              <span>
                Order Status:
                <span className="text-gray-500">
                  {" " + capitalizeFirstLetter(orderItem?.orderStatus)}
                </span>
              </span>
            )}
          </p>
          <p>
            Ordered on
            <span className="text-gray-500">
              {" " + formatDate(orderItem?.orderDate)}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default AddressCard;
