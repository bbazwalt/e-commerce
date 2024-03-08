import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addItemToCart } from "../../../redux/cart/action";
import { findProductById } from "../../../redux/product/action";
import { CLEAR_PRODUCT_ERROR } from "../../../redux/product/actionType";
import LoadingText from "../../../shared/components/infoText/LoadingText";
import ErrorSnackBar from "../../../shared/components/snackBar/ErrorSnackBar";
import { scrollToTop } from "../../../utils/utils";
import SectionCard from "../../components/home/carousel/section/SectionCard";

const ProductDetails = () => {
  const user = useSelector((store) => store.user.user);
  const product = useSelector((store) => store.product.product);
  const productsByCategory = useSelector(
    (store) => store.product.productsByCategory,
  );
  const isLoading = useSelector((store) => store.product.isLoading);
  const error = useSelector((store) => store.product.error);

  const categories = [product?.category?.parentCategory, product?.category];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    dispatch(findProductById(params.productId));
  }, [params.productId]);

  const handleAddToCart = () => {
    dispatch(addItemToCart({ productId: product?.id, navigate }));
  };

  return (
    <div className="bg-white px-20">
      <div className="pt-6">
        {isLoading ? (
          <LoadingText />
        ) : (
          <>
            <nav aria-label="Breadcrumb">
              <ol className="mx-auto flex max-w-7xl items-center space-x-2 px-8">
                {categories?.map((category) => (
                  <li key={category?.id}>
                    <div
                      className="flex items-center"
                      style={{
                        textTransform: "capitalize",
                      }}
                    >
                      <div
                        onClick={() =>
                          category?.name === categories[1]?.name &&
                          navigate(
                            `/${categories[0]?.name}/${categories[1]?.name}`,
                          )
                        }
                        className={`${
                          category?.name === categories[1]?.name &&
                          "cursor-pointer"
                        } mr-2 text-sm font-medium text-gray-900`}
                      >
                        {category?.name.split("-").join(" ")}
                      </div>
                      <svg
                        width={16}
                        height={20}
                        viewBox="0 0 16 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="h-5 w-4 text-gray-300"
                      >
                        <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                      </svg>
                    </div>
                  </li>
                ))}
                <li className="text-sm">
                  <div
                    aria-current="page"
                    className="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {product?.title}
                  </div>
                </li>
              </ol>
            </nav>
            <section className="mx-auto grid max-w-[76rem] grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
              <div className="flex flex-col items-center">
                <div className="max-h-[35rem] max-w-[30rem] rounded-lg">
                  <img
                    src={product?.image}
                    alt={product?.title}
                    className="h-[30rem] w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="col-span-1 mx-auto max-w-xl px-8 pb-24">
                <div className="col-span-2 ">
                  <h1 className="text-2xl font-bold text-gray-500">
                    {product?.brand}
                  </h1>
                  <h1 className="pt-1 text-3xl font-semibold text-gray-900">
                    {product?.title}
                  </h1>
                </div>
                <div className="row-span-3 mt-0">
                  <h2 className="sr-only">Product Information</h2>
                  <div className="mt-6 flex items-center space-x-5 text-xl text-gray-900 ">
                    <p className="font-semibold">₹{product?.discountedPrice}</p>
                    <p className="line-through opacity-50">₹{product?.price}</p>
                    <p className="font-semibold text-green-600">
                      {product?.discountPercent}% off
                    </p>
                  </div>
                  <div className="flex flex-row space-x-12">
                    <h2 className="mt-8 text-xl font-semibold text-gray-900">
                      Color:
                      <span className="font-normal text-gray-500">
                        {product?.color && " " + product?.color}
                      </span>
                    </h2>
                    <h2 className="mt-8 text-xl font-medium text-gray-900">
                      Storage:
                      <span className="font-normal text-gray-500">
                        {product?.storage && " " + product.storage}
                      </span>
                    </h2>
                    <h2 className="mt-8 text-xl font-medium text-gray-900">
                      Memory:
                      <span className="font-normal text-gray-500">
                        {product?.memory && " " + product.memory}
                      </span>
                    </h2>
                  </div>
                  {user && (
                    <Button
                      onClick={handleAddToCart}
                      className="mt-3"
                      variant="contained"
                      sx={{
                        mt: "2rem",
                        px: "2rem",
                        py: "1rem",
                      }}
                    >
                      ADD TO CART
                    </Button>
                  )}
                </div>
                <div className="col-span-2 col-start-1  mt-4 items-end border-gray-200 py-6 pr-8">
                  <div>
                    <div className="space-y-6">
                      <p className="text-base text-gray-900">
                        {product?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section className="mx-auto max-w-7xl px-8">
              <section className=" mx-auto max-w-[76rem]">
                <h1 className="py-5 text-center text-2xl font-bold">
                  Similar Products
                </h1>
                <div className="col-span-4 w-full">
                  <div className="flex flex-wrap justify-center bg-white pt-5">
                    {productsByCategory[product?.category?.name]?.map(
                      (item) =>
                        item?.id !== product?.id && (
                          <SectionCard
                            key={item.id}
                            scrollToTop={scrollToTop}
                            product={item}
                          />
                        ),
                    )}
                  </div>
                </div>
              </section>
            </section>
          </>
        )}
      </div>
      {error && (
        <ErrorSnackBar error={error} dispatchType={CLEAR_PRODUCT_ERROR} />
      )}
    </div>
  );
};

export default ProductDetails;
