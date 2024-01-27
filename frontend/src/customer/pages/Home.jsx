import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductsByCategory } from "../../store/product/action";
import MainCarousel from "../components/home/carousel/MainCarousel";
import SectionCarousel from "../components/home/section/SectionCarousel";

const Home = () => {
  const dispatch = useDispatch();

  const productsByCategory = useSelector(
    (store) => store.product.productsByCategory
  );

  const combinedProducts = [
    ...(productsByCategory["galaxy-s-series"] || []),
    ...(productsByCategory["galaxy-a-series"] || []),
    ...(productsByCategory["galaxy-z-series"] || []),
  ];

  const uniqueSmartphoneData = Array.from(
    new Set(combinedProducts.map(JSON.stringify))
  ).map(JSON.parse);

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div>
      <MainCarousel />
      <div className="space-y-10 py-6 flex flex-col justify-center px-8 lg:px-[9.5rem]">
        <SectionCarousel
          data={uniqueSmartphoneData}
          sectionName={"Smartphones"}
        />
      </div>
    </div>
  );
};

export default Home;
