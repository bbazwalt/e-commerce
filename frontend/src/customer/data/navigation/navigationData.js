import { s24Ultra, zfold5 } from "../image/imageData";

export const navigationData = {
  categories: [
    {
      id: "smartphones",
      name: "Smartphones",
      featured: [
        {
          name: "New Arrivals",
          href: "/smartphones/galaxy-z-series",
          imageSrc: zfold5,
          imageAlt: "New Arrivals",
        },
        {
          name: "Bestsellers",
          href: "/smartphones/galaxy-s-series",
          imageSrc: s24Ultra,
          imageAlt: "Bestsellers",
        },
      ],
      sections: [
        {
          id: "galaxy-z-series",
          name: "Galaxy Z Series",
          items: [
            { id: 123, name: "Fold5" },
            { id: 118, name: "Flip5" },
            { id: 126, name: "Fold4" },
            { id: 121, name: "Flip4" },
          ],
        },
        {
          id: "galaxy-s-series",
          name: "Galaxy S Series",
          items: [
            { id: 104, name: "S24 Ultra" },
            { id: 105, name: "S24+" },
            { id: 107, name: "S24" },
            { id: 109, name: "S23 Ultra" },
            { id: 114, name: "S23+" },
            { id: 117, name: "S23" },
          ],
        },
        {
          id: "galaxy-a-series",
          name: "Galaxy A Series",
          items: [
            { id: 128, name: "A54" },
            { id: 130, name: "A34" },
            { id: 134, name: "A53" },
            { id: 132, name: "A33" },
          ],
        },
      ],
    },
  ],
};
