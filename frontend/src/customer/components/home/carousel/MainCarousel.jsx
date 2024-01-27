import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
import { mainCarouselData } from "./mainCarouselData";

const MainCarousel = () => {
  const navigate = useNavigate();

  const items = mainCarouselData.map((item) => (
    <div className="mx-auto max-w-[76rem]">
      <img
        onClick={() => navigate(item.path)}
        src={item.image}
        sizes="75%"
        className="mx-auto max-w-[76rem] rounded-md cursor-pointer lg:w-[100rem] lg:h-[40rem] object-top"
        role="presentation"
        alt=""
      />
    </div>
  ));

  return (
    <div>
      <AliceCarousel
        items={items}
        autoPlay
        autoPlayInterval={3000}
        infinite
        style={{ position: "relative", zIndex: 20 }}
      />
    </div>
  );
};

export default MainCarousel;
