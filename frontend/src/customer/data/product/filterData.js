export const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { id: 1, value: "black", label: "Black" },
      { id: 2, value: "grey", label: "Grey" },
      { id: 3, value: "white", label: "White" },
    ],
  },
  {
    id: "storage",
    name: "Storage",
    options: [
      { id: 4, value: "256GB", label: "256GB" },
      { id: 5, value: "512GB", label: "512GB" },
      { id: 6, value: "1TB", label: "1TB" },
    ],
  },
  {
    id: "memory",
    name: "Memory",
    options: [
      { id: 18, value: "8GB", label: "8GB" },
      { id: 19, value: "12GB", label: "12GB" },
    ],
  },
];

export const singleFilters = [
  {
    id: "price",
    name: "Price",
    options: [
      { id: 7, value: "", label: "All" },
      { id: 22, value: "20000-40000", label: "₹20000 to ₹40000" },
      { id: 23, value: "40000-60000", label: "₹40000 to ₹60000" },
      { id: 8, value: "60000-80000", label: "₹60000 to ₹80000" },
      { id: 9, value: "80000-120000", label: "₹80000 to ₹120000" },
      { id: 10, value: "120000-150000", label: "₹120000 to ₹150000" },
    ],
  },
  {
    id: "discount",
    name: "Discount",
    options: [
      { id: 11, value: "", label: "All" },
      { id: 12, value: "25", label: "25% and above" },
      { id: 13, value: "50", label: "50% and above" },
      { id: 14, value: "75", label: "75% and above" },
    ],
  },
  {
    id: "stock",
    name: "Stock",
    options: [
      { id: 15, value: "", label: "All" },
      { id: 16, value: "inStock", label: "In Stock" },
      { id: 17, value: "outOfStock", label: "Out of Stock" },
    ],
  },
];
