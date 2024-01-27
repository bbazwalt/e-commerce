import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuItem } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUser, signout } from "../../../store/auth/action";
import { getCart } from "../../../store/cart/action";
import AuthModal from "../auth/AuthModal";
import "./../../styles/ProductCard.css";
import { navigationData } from "./navigationData";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [isSignin, setIsSignin] = useState(false);
  const auth = useSelector((store) => store.auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();

  const cart = useSelector((store) => store.cart);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(getUser(localStorage.getItem("jwt")));
    }
  }, [localStorage.getItem("jwt")]);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      dispatch(getCart());
    }
  }, [localStorage.getItem("jwt")]);

  const navigate = useNavigate();

  const handleAuthOpen = (isSigninProp) => {
    setIsSignin(isSigninProp);
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
    setOpen(false);
  };

  const handleItemClick = (id, close) => {
    navigate(`/product/${id}`);
    if (close) {
      close();
    }
    setOpen(false);
  };

  const handleSectionClick = (category, section, close) => {
    navigate(`/${category.id}/${section.id}`);
    if (close) {
      close();
    }
    setOpen(false);
  };

  const handleSignout = () => {
    dispatch(signout());
    handleClose();
    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  useEffect(() => {
    if (auth.user) {
      handleClose();
      handleAuthClose();
    }
  }, [auth.user]);

  return (
    <div className="bg-white" style={{ position: "relative", zIndex: 50 }}>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigationData.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigationData.categories.map((category) => (
                      <Tab.Panel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm product-card py-4"
                            >
                              <div className="flex items-center justify-center object-cover object-top w-fit-content h-fit-content overflow-hidden rounded-lg">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <Link
                                onClick={() => handleFeaturedClick()}
                                to={item.href}
                                className="mt-6 text-center block font-medium text-gray-900"
                              >
                                <span
                                  className="absolute inset-0 z-10 "
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
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p
                              id={`${category.id}-${section.id}-heading-mobile`}
                              className="font-medium text-gray-900 cursor-pointer"
                              onClick={() =>
                                handleSectionClick(category, section)
                              }
                            >
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <p
                                    onClick={() => handleItemClick(item.id)}
                                    className="-m-2 block p-2 cursor-pointer text-gray-500"
                                  >
                                    {item.name}
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                {!auth.user && (
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <div
                        onClick={() => handleAuthOpen(true)}
                        className=" cursor-pointer -m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </div>
                    </div>
                    <div className="flow-root">
                      <div
                        onClick={() => handleAuthOpen(false)}
                        className=" cursor-pointer -m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign up
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-2 flex">
                <Link to="/">
                  <img
                    className="h-8 w-auto"
                    src="https://seeklogo.com/images/S/shopify-logo-1C711BCDE4-seeklogo.com.png"
                    alt=""
                  />
                </Link>
              </div>

              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigationData.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open, close }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
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
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
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
                                          className="group relative py-4 text-base sm:text-sm product-card"
                                        >
                                          <div className="flex items-center justify-center object-cover object-top w-fit-content h-fit-content overflow-hidden rounded-lg ">
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
                                            className="mt-6 text-center block font-medium text-gray-900"
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
                                    <div
                                      className={`row-start-1 grid grid-cols-${
                                        category.id === "tablets" ? 2 : 3
                                      } gap-x-8 gap-y-10 text-sm`}
                                    >
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p
                                            id={`${section.name}-heading`}
                                            className="font-medium text-gray-900 cursor-pointer"
                                            onClick={() =>
                                              handleSectionClick(
                                                category,
                                                section,
                                                close
                                              )
                                            }
                                          >
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
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
                                                      close
                                                    )
                                                  }
                                                  className="-m-2 block p-2 cursor-pointer text-gray-500"
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

              <div className="ml-auto flex items-center">
                {!auth.user && (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <div
                      onClick={() => handleAuthOpen(true)}
                      className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign in
                    </div>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <div
                      onClick={() => handleAuthOpen(false)}
                      className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      Sign up
                    </div>
                  </div>
                )}

                {auth.user && (
                  <div className="flex flex-row items-center justify-center">
                    <div
                      className="border-transparent mr-5 text-gray-900 hover:text-gray-700 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-normal transition-colors duration-200 ease-out"
                      type="button"
                      aria-expanded="false"
                      data-headlessui-state=""
                      id="headlessui-popover-button-:r6:"
                    >
                      {auth.user.firstName + " " + auth.user.lastName}
                    </div>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <div className="lg:ml-6 mr-3 lg:mr-0 ">
                      <button
                        className="border-transparent text-gray-700 hover:text-gray-800 relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                        type="button"
                        aria-controls={openMenu ? "profile-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? "true" : undefined}
                        onClick={handleClick}
                        data-headlessui-state=""
                        id="headlessui-popover-button-:r6:"
                      >
                        My account
                      </button>
                      <Menu
                        id="profile-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleClose}
                        MenuListProps={{
                          "aria-labelledby": "profile-button",
                        }}
                      >
                        <MenuItem onClick={handleSignout}>Sign out</MenuItem>
                      </Menu>
                    </div>
                  </div>
                )}
                {auth.user && (
                  <div className="ml-4 flow-root lg:ml-6">
                    <div
                      onClick={handleCartClick}
                      className="group -m-2 flex items-center p-2"
                    >
                      <ShoppingBagIcon
                        className=" cursor-pointer h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {cart?.cart?.totalItems}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <AuthModal
        setIsSignin={setIsSignin}
        handleAuthClose={handleAuthClose}
        isSignin={isSignin}
        openAuth={openAuth}
      />
    </div>
  );
};

export default Navigation;
