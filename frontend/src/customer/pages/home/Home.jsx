import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductsByCategory } from "../../../redux/product/action";
import { CLEAR_PRODUCT_ERROR } from "../../../redux/product/actionType";
import ErrorSnackBar from "../../../shared/components/snackBar/ErrorSnackBar";
import { scrollToTop } from "../../../utils/utils";
import MainCarousel from "../../components/home/carousel/main/MainCarousel";
import SectionCarousel from "../../components/home/carousel/section/SectionCarousel";

const Home = () => {
  const productsByCategory = useSelector(
    (store) => store.product.productsByCategory,
  );
  const error = useSelector((store) => store.product.error);

  const dispatch = useDispatch();

  const combinedProducts = [
    ...(productsByCategory["galaxy-s-series"] || []),
    ...(productsByCategory["galaxy-a-series"] || []),
    ...(productsByCategory["galaxy-z-series"] || []),
  ];

  const uniqueSmartphoneData = Array.from(
    new Set(combinedProducts.map(JSON.stringify)),
  ).map(JSON.parse);

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const categories = [
      "galaxy-z-series",
      "galaxy-s-series",
      "galaxy-a-series",
    ];
    categories.forEach((category) => {
      dispatch(findProductsByCategory(category));
    });
  }, [dispatch]);

  return (
    <>
      <MainCarousel />
      <div className="flex flex-col justify-center space-y-10 px-[9.5rem] py-6">
        <SectionCarousel
          data={uniqueSmartphoneData}
          sectionName={"Smartphones"}
        />
      </div>
      {error && (
        <ErrorSnackBar error={error} dispatchType={CLEAR_PRODUCT_ERROR} />
      )}
    </>
  );
};

export default Home;
