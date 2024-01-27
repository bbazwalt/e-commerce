import React from "react";
import AliceCarousel from "react-alice-carousel";
import { useSelector } from "react-redux";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import SectionCard from "./SectionCard";

const SectionCarousel = ({ data, sectionName }) => {
  const isLoading = useSelector((store) => store.product.isLoading);

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1280: { items: 4 },
  };

  const items = data.map((item) => <SectionCard product={item} />);

  return isLoading ? (
    <div className="text-xl text-center mt-6">Please wait. Loading...</div>
  ) : (
    <div className="border bg-gray-100 rounded-lg shadow-lg overflow-hidden mx-auto max-w-[76rem]">
      <h2 className="text-center text-2xl font-extrabold text-gray-800 pt-5">
        {sectionName}
      </h2>
      <div className="relative p-5 pt-0 ">
        <AliceCarousel
          items={items}
          responsive={responsive}
          disableDotsControls
          infinite
          renderPrevButton={PrevButton}
          renderNextButton={NextButton}
        />
      </div>
    </div>
  );
};

export default SectionCarousel;
