import React from "react";
import { useNavigate } from "react-router-dom";
import "./../../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card w-[15rem] h-[20rem] m-8 mt-0 mb-16 transition-all cursor-pointer"
    >
      <div className="">
        <img
          className="w-full h-full object-cover object-left-top w-fit-content h-fit-content"
          src={product.imageUrl}
          alt=""
        ></img>
      </div>

      <div className="text-part bg-white p-3">
        <div>
          <p className="font-bold opacity-60">{product.brand}</p>
          <p>{product.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-bold">{product.color}</p>
          <p className="font-bold ml-5">{product.storage}</p>
          <p className=" font-bold ml-5">{product.memory} </p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">₹{product.discountedPrice}</p>
          <p className="line-through opacity-50">₹{product.price}</p>
          <p className="text-green-600 font-semibold">
            {product.discountPercent}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
