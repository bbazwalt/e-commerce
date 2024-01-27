import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addItemToCart } from "../../../../store/cart/action";
import { findProductsById } from "../../../../store/product/action";
import SectionCard from "../../home/section/SectionCard";

const ProductDetails = () => {
  const productsByCategory = useSelector(
    (store) => store.product.productsByCategory
  );

  const product = useSelector((store) => store.product.product);
  const user = useSelector((store) => store.auth.user);
  const isLoading = useSelector((store) => store.product.isLoading);
  const categoryArr = [product?.category?.parentCategory, product?.category];

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  const handleAddToCart = () => {
    dispatch(addItemToCart({ productId: product?.id, navigate }));
  };

  useEffect(() => {
    dispatch(findProductsById(params.productId));
  }, [params.productId]);

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {categoryArr?.map((category) => (
              <li key={category?.id}>
                <div
                  className="flex items-center"
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  <div
                    onClick={() =>
                      category?.name === categoryArr[1]?.name &&
                      navigate(
                        `/${categoryArr[0]?.name}/${categoryArr[1]?.name}`
                      )
                    }
                    className={`${
                      category?.name === categoryArr[1]?.name &&
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


          <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10 mx-auto max-w-[76rem]">
            <div className="flex flex-col items-center">
              <div className="rounded-lg max-w-[30rem] max-h-[35rem]">
                <img
                  src={product?.imageUrl}
                  alt={""}
                  className="h-[30rem] w-full object-cover object-center"
                />
              </div>
            </div>

            <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-xl lg:px-8 lg:pb-24">
              <div className="lg:col-span-2 ">
                <h1 className="text-lg lg:text-xl font-semibold text-gray-900">
                  {product?.brand}
                </h1>
                <h1 className="text-lg lg:text-xl text-gray-900 opacity-60 pt-1">
                  {product?.title}
                </h1>
              </div>

              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product Information</h2>

                <div className="flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6 ">
                  <p className="font-semibold">₹{product?.discountedPrice}</p>
                  <p className="opacity-50 line-through">₹{product?.price}</p>
                  <p className="text-green-600 font-semibold">
                    {product?.discountPercent}% off
                  </p>
                </div>

                <div className="flex flex-row space-x-12">
                  <h2 className="text-xl mt-8 font-semibold text-gray-900">
                    Color:
                    <span className="text-gray-500 font-normal">
                      {product?.color && " " + product?.color}
                    </span>
                  </h2>
                  <h2 className="text-xl mt-8 font-medium text-gray-900">
                    Storage:
                    <span className="text-gray-500 font-normal">
                      {product?.storage && " " + product.storage}
                    </span>
                  </h2>
                  <h2 className="text-xl mt-8 font-medium text-gray-900">
                    Memory:
                    <span className="text-gray-500 font-normal">
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
                      bgcolor: "#1976D2",
                    }}
                  >
                    Add to cart
                  </Button>
                )}
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        <section className="mx-auto max-w-7xl   px-4 sm:px-6 lg:px-8">
          <section className="pt-10 mx-auto max-w-[76rem]">
            <h1 className="py-5 text-xl font-bold">Similar Products</h1>
            <div className="lg:col-span-4 w-full">
              <div className="flex flex-wrap justify-center bg-white pt-5">
                {productsByCategory[product?.category?.name]?.map(
                  (item) =>
                    item?.id !== product?.id && (
                      <SectionCard scrollToTop={scrollToTop} product={item} />
                    )
                )}
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
