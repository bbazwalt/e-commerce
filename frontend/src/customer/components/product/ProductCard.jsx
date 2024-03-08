import { useNavigate } from "react-router-dom";
import "./../../../styles/product/ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card  m-8 mb-16 mt-0 h-[20rem] w-[16rem] cursor-pointer transition-all"
    >
      <div>
        <img
          className="w-fit-content h-fit-content h-full w-full object-cover object-left-top"
          src={product.image}
          alt={product.title}
        ></img>
      </div>
      <div className="text-part bg-white p-3">
        <div>
          <p className="font-bold opacity-60">{product.brand}</p>
          <p>{product.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-bold">{product.color}</p>
          <p className="ml-5 font-bold">{product.storage}</p>
          <p className=" ml-5 font-bold">{product.memory} </p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">₹{product.discountedPrice}</p>
          <p className="line-through opacity-50">₹{product.price}</p>
          <p className="font-semibold text-green-600">
            {product.discountPercent}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
