import React from "react";
import { useNavigate } from "react-router-dom";
import "./../../../styles/ProductCard.css";

const SectionCard = ({ scrollToTop, product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
    scrollToTop && scrollToTop();
  };

  return (
    <div
      onClick={handleClick}
      className="my-4 product-card cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[18rem] h-[19rem] mx-2 border "
    >
      <div className="mt-6">
        <img
          className="object-cover object-top w-fit-content h-fit-content max-h-[12rem] max-w-[12rem]"
          src={product.imageUrl}
          alt=""
        ></img>
      </div>
      <div className="p-4 flex flex-col items-center justify-center">
        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.brand}</p>
      </div>
    </div>
  );
};

export default SectionCard;
