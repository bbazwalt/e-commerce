import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FilterListIcon from "@mui/icons-material/FilterList";
import { FormControl, Pagination, Radio, RadioGroup } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { findProducts } from "../../../store/product/action";
import ProductCard from "./ProductCard";
import { filters, singleFilters } from "./filterData";

const sortOptions = [
  { name: "Price: Low to High", value: "price_low", current: false },
  { name: "Price: High to Low", value: "price_high", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Product = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [sortValue, setSortValue] = useState(sortOptions[0].value);

  const product = useSelector((store) => store.product);

  const isLoading = useSelector((store) => store.product.isLoading);

  const productData = product.products.content;

  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();

  const decodedQueryString = decodeURIComponent(location.search);
  const searchParams = new URLSearchParams(decodedQueryString);
  const color = searchParams.get("color");
  const storage = searchParams.get("storage");
  const memory = searchParams.get("memory");
  const price = searchParams.get("price");
  const discount = searchParams.get("discount");
  const sort = searchParams.get("sort");
  const pageNumber = searchParams.get("page");
  const stock = searchParams.get("stock");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pageNumber]);

  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue = searchParams.getAll(sectionId);
    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValue.push(value);
    }

    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","));
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleRadioFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);

    if (value) {
      searchParams.set(sectionId, value);
    } else {
      searchParams.delete(sectionId);
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  const handleSort = (optionValue) => {
    const searchParams = new URLSearchParams(location.search);
    if (optionValue === "price_low") {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", optionValue);
    }
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
    setSortValue(optionValue);
  };

  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  window.addEventListener("load", function () {
    if (window.location.search) {
      // eslint-disable-next-line no-restricted-globals
      history.replaceState(null, "", window.location.pathname);
    }
  });

  useEffect(() => {
    const [minPrice, maxPrice] =
      price === null ? [0, 200000] : price.split("-").map(Number);
    const data = {
      category: param.section,
      colors: color || "",
      storages: storage || "",
      memories: memory || "",
      minPrice,
      maxPrice,
      minDiscount: discount || 0,
      sort: sort || "price_low",
      pageNumber: pageNumber || 1,
      pageSize: 9,
      stock: stock || null,
    };
    dispatch(findProducts(data));
  }, [
    param.section,
    color,
    storage,
    memory,
    price,
    discount,
    sort,
    pageNumber,
    stock,
  ]);

  return (
    <div className="bg-white">
      <div>
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className=" text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <form className="mt-4 border-t border-gray-200">
                    <div className="py-4 flex items-center justify-between">
                      <h1 className="text-l opacity-50 font-bold pl-4">
                        Filters
                      </h1>
                      <div className="pr-4">
                        <FilterListIcon />
                      </div>
                    </div>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      onChange={() =>
                                        handleFilter(option.value, section.id)
                                      }
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="cursor-pointer h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="cursor-pointer ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                    {singleFilters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span
                                  className="font-medium text-gray-900"
                                  id="demo-radio-buttons-group-label"
                                >
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-2">
                                <FormControl>
                                  <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                  >
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={optionIdx}
                                          className="flex items-center -ml-2"
                                        >
                                          <Radio
                                            id={`filter-${section.id}-${optionIdx}`}
                                            onChange={(e) =>
                                              handleRadioFilter(
                                                e.target.value,
                                                section.id
                                              )
                                            }
                                            value={option.value}
                                            color="primary"
                                            size="small"
                                            className="flex-shrink-0 p-0 m-0"
                                          />
                                          <label
                                            htmlFor={`filter-${section.id}-${optionIdx}`}
                                            className="cursor-pointer ml-1 min-w-0 flex-1 text-gray-500"
                                            onClick={() =>
                                              handleRadioFilter(
                                                option.value,
                                                section.id
                                              )
                                            }
                                          >
                                            {option.label}
                                          </label>
                                        </div>
                                      )
                                    )}
                                  </RadioGroup>
                                </FormControl>
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
            <h1
              style={{
                textTransform: "capitalize",
              }}
              className="text-4xl font-bold tracking-tight text-gray-900"
            >
              {param.section.split("-").join(" ").toUpperCase()}
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button
                    value={sortValue}
                    onChange={(e) => handleSort(e.target.value)}
                    className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  >
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <div
                              onClick={() => handleSort(option.value)}
                              className={classNames(
                                option.value === sortValue
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm cursor-pointer"
                              )}
                            >
                              {option.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <div>
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </div>
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              <div className="">
                <form className="hidden lg:block ">
                  <div className="pb-5 flex justify-between items-center">
                    <h1 className="text-lg opacity-50 font-bold">Filters</h1>
                    <FilterListIcon />
                  </div>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    onChange={() =>
                                      handleFilter(option.value, section.id)
                                    }
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}

                  {singleFilters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6 -ml-2">
                            <div className="space-y-2">
                              <FormControl>
                                <RadioGroup
                                  aria-labelledby="demo-radio-buttons-group-label"
                                  name="radio-buttons-group"
                                >
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={optionIdx}
                                      className="flex items-center"
                                    >
                                      <Radio
                                        id={`filter-${section.id}-${optionIdx}`}
                                        onChange={(e) =>
                                          handleRadioFilter(
                                            e.target.value,
                                            section.id
                                          )
                                        }
                                        value={option.value}
                                        color="primary"
                                        size="small"
                                        className="flex-shrink-0 p-0 m-0"
                                      />
                                      <label
                                        htmlFor={`filter-${section.id}-${optionIdx}`}
                                        className="text-sm text-gray-600 cursor-pointer"
                                        onClick={() =>
                                          handleRadioFilter(
                                            option.value,
                                            section.id
                                          )
                                        }
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </div>

              <div className="lg:col-span-4 w-full">
                <div className="flex flex-wrap justify-center bg-white">
                  {isLoading ? (
                    <div className="text-xl ">Please wait. Loading...</div>
                  ) : productData?.length === 0 ? (
                    <div className="text-xl ">
                      No products found with the selected filters.
                    </div>
                  ) : (
                    productData?.map(
                      (item) =>
                        item.id && <ProductCard key={item.id} product={item} />
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
          <section className="w-full px-[3.6rem]">
            <div className="px-4 pb-5 flex justify-center">
              <Pagination
                count={product.products.totalPages}
                color="primary"
                onChange={handlePaginationChange}
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Product;
