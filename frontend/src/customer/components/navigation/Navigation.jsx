import { Popover, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Menu, MenuItem } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../../../redux/cart/action";
import { signOut } from "../../../redux/user/action";
import { useAuth } from "../../../redux/user/authContext";
import LoadingText from "../../../shared/components/infoText/LoadingText";
import { classNames } from "../../../utils/utils";
import { mainLogo } from "../../data/image/imageData";
import { navigationData } from "../../data/navigation/navigationData";
import AuthModal from "../auth/AuthModal";
import "./../../../styles/product/ProductCard.css";

const Navigation = () => {
  const [openAuth, setOpenAuth] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isLoading = useSelector((store) => store.user.isLoading);
  const user = useSelector((store) => store.user.user);
  const cart = useSelector((store) => store.cart);

  const { authSignOut } = useAuth();
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    if (user) {
      handleAuthClose();
    }
  }, [user]);

  const handleAuthOpen = (isSignInProp) => {
    setIsSignIn(isSignInProp);
    setOpenAuth(true);
  };

  const handleAuthClose = () => {
    setOpenAuth(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFeaturedClick = (close) => {
    if (close) {
      close();
    }
  };

  const handleItemClick = (id, close) => {
    navigate(`/product/${id}`);
    if (close) {
      close();
    }
  };

  const handleSectionClick = (category, section, close) => {
    navigate(`/${category.id}/${section.id}`);
    if (close) {
      close();
    }
  };

  const handleSignOut = () => {
    handleClose();
    dispatch(signOut(authSignOut));
    navigate("/");
  };

  const handleMyOrders = () => {
    handleClose();
    navigate("/order/all");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <div className="bg-white" style={{ position: "relative", zIndex: 50 }}>
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-2 flex">
                <Link to="/">
                  <img className="h-6 w-6" src={mainLogo} alt="Main Logo" />
                </Link>
              </div>
              <Popover.Group className="ml-8 block self-stretch ">
                <div className="flex h-full space-x-8">
                  {navigationData.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-[#1976d2] text-[#1976d2]"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out",
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500 shadow-xl">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />
                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8 ">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="product-card group relative py-4 text-base"
                                        >
                                          <div className="w-fit-content h-fit-content flex items-center justify-center overflow-hidden rounded-lg object-cover object-top ">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <Link
                                            onClick={() =>
                                              handleFeaturedClick(close)
                                            }
                                            to={item.href}
                                            className="mt-6 block text-center font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </Link>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1 text-center"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="cursor-pointer font-medium text-gray-900"
                                            onClick={() =>
                                              handleSectionClick(
                                                category,
                                                section,
                                                close,
                                              )
                                            }
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6"
                                          >
                                            {section.items.map((item) => (
                                              <li
                                                key={item.name}
                                                className="flex"
                                              >
                                                <p
                                                  onClick={() =>
                                                    handleItemClick(
                                                      item.id,
                                                      close,
                                                    )
                                                  }
                                                  className="-m-2 block cursor-pointer p-2 text-gray-500"
                                                >
                                                  {item.name}
                                                </p>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </Popover.Group>
              {isLoading ? (
                <div className="mb-4 ml-auto">
                  <LoadingText />
                </div>
              ) : (
                <div className="ml-auto flex items-center">
                  {!user && (
                    <div className="flex flex-1 items-center justify-end space-x-5">
                      <div
                        onClick={() => handleAuthOpen(true)}
                        className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign In
                      </div>
                      <div
                        onClick={() => handleAuthOpen(false)}
                        className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800"
                      >
                        Sign Up
                      </div>
                    </div>
                  )}
                  {user && (
                    <div className="flex flex-row items-center justify-center space-x-5">
                      <div
                        className="relative z-10 -mb-px flex items-center break-words border-b-2 border-transparent pt-px text-sm font-normal text-gray-900 transition-colors duration-200 ease-out hover:text-gray-700"
                        type="button"
                        aria-expanded="false"
                        data-headlessui-state=""
                        id="headlessui-popover-button-:r6:"
                      >
                        {user.fullName}
                      </div>
                      <div
                        onClick={handleCartClick}
                        className="group flex items-center py-2"
                      >
                        <ShoppingBagIcon
                          className=" h-6 w-6 flex-shrink-0 cursor-pointer text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                          {cart?.cart?.totalItems}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="ml-5">
                    <BsThreeDotsVertical
                      className="cursor-pointer"
                      type="button"
                      aria-controls={openMenu ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={openMenu ? "true" : undefined}
                      onClick={handleClick}
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={openMenu}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      {user && (
                        <MenuItem
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            lineHeight: "1.25rem",
                            padding: "0.4rem 0.6rem",
                          }}
                          onClick={handleMyOrders}
                        >
                          My Orders
                        </MenuItem>
                      )}
                      {user && (
                        <MenuItem
                          sx={{
                            fontSize: "0.875rem",
                            fontWeight: 500,
                            lineHeight: "1.25rem",
                            padding: "0.4rem 0.6rem",
                          }}
                          onClick={handleSignOut}
                        >
                          Sign Out
                        </MenuItem>
                      )}
                      <MenuItem
                        sx={{
                          fontSize: "0.875rem",
                          fontWeight: 500,
                          lineHeight: "1.25rem",
                          padding: "0.4rem 0.6rem",
                        }}
                        onClick={() => {
                          handleClose();
                          navigate("/admin");
                        }}
                      >
                        Switch to Admin Page
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
      <AuthModal
        setIsSignIn={setIsSignIn}
        handleAuthClose={handleAuthClose}
        isSignIn={isSignIn}
        openAuth={openAuth}
      />
    </div>
  );
};

export default Navigation;
