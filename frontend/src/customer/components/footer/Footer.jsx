import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { scrollToTop } from "../../../utils/utils";

const Footer = () => {
  return (
    <footer className="bottom-0 mb-0 mt-10 pb-0 ">
      <div className="flex flex-col items-center bg-black text-center text-white">
        <div className=" mt-10 flex flex-row justify-center space-x-20">
          <Typography className="pb-5 " variant="h5">
            Smartphones
          </Typography>
          <Link to={"/smartphones/galaxy-z-series"}>
            <div
              onClick={scrollToTop}
              className="pb-5 pt-1 hover:text-gray-300"
            >
              Galaxy Z Series
            </div>
          </Link>
          <Link to={"/smartphones/galaxy-s-series"}>
            <div
              onClick={scrollToTop}
              className="pb-5 pt-1 hover:text-gray-300"
            >
              Galaxy S Series
            </div>
          </Link>
          <Link to={"/smartphones/galaxy-a-series"}>
            <div
              onClick={scrollToTop}
              className="pb-5 pt-1 hover:text-gray-300"
            >
              Galaxy A Series
            </div>
          </Link>
        </div>
        <div className="flex flex-row items-center justify-center py-8">
          <p className="my-2">
            &copy; 2024 E-Commerce. <br />
            All the product trademarks, images, and information belong to their
            respective owners. <br />
            All product details are completely fictitious. This website is
            created solely for non-profit personal project purposes.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
