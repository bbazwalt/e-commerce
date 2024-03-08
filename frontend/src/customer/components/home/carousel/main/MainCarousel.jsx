import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
import { mainCarouselData } from "../../../../data/home/customer/carousel/mainCarouselData";

const MainCarousel = () => {
  const navigate = useNavigate();

  const items = mainCarouselData.map((item) => (
    <div className="mx-auto max-w-[76rem]">
      <img
        onClick={() => navigate(item.path)}
        src={item.image}
        sizes="75%"
        className="mx-auto h-[40rem] max-w-[76rem] cursor-pointer rounded-md object-top"
        role="presentation"
        alt="Main Carousel"
      />
    </div>
  ));

  return (
    <AliceCarousel
      items={items}
      autoPlay
      autoPlayInterval={3000}
      infinite
      style={{ position: "relative", zIndex: 20 }}
    />
  );
};

export default MainCarousel;
