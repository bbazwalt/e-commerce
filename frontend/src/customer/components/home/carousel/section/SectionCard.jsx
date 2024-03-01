import { useNavigate } from "react-router-dom";
import "./../../../../../styles/ProductCard.css";

const SectionCard = ({ scrollToTop, product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
    scrollToTop && scrollToTop();
  };

  return (
    <div
      onClick={handleClick}
      className="product-card mx-2 my-4 flex h-[19rem] w-[18rem] cursor-pointer flex-col items-center overflow-hidden rounded-lg border bg-white shadow-lg "
    >
      <div className="mt-6">
        <img
          className="w-fit-content h-fit-content max-h-[12rem] max-w-[12rem] object-cover object-top"
          src={product.image}
          alt={product.title}
        ></img>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <h3 className="text-lg font-medium text-gray-900">{product.title}</h3>
        <p className="mt-2 text-sm text-gray-500">{product.brand}</p>
      </div>
    </div>
  );
};

export default SectionCard;
