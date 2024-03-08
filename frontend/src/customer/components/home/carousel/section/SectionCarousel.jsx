import AliceCarousel from "react-alice-carousel";
import { useSelector } from "react-redux";
import LoadingText from "../../../../../shared/components/infoText/LoadingText";
import NextButton from "./NextButton";
import PrevButton from "./PrevButton";
import SectionCard from "./SectionCard";

const responsive = {
  0: { items: 1 },
  720: { items: 3 },
  1280: { items: 4 },
};

const SectionCarousel = ({ data, sectionName }) => {
  const isLoading = useSelector((store) => store.product.isLoading);

  const items = data.map((item) => <SectionCard product={item} />);

  return isLoading ? (
    <LoadingText />
  ) : (
    <div className="mx-auto max-w-[76rem] overflow-hidden rounded-lg border bg-gray-100 shadow-lg">
      <h2 className="pt-5 text-center text-2xl font-extrabold text-gray-800">
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
