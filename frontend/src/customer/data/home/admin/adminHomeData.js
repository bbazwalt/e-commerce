import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

export const menu = [
  { name: "Orders", path: "/admin", icon: <FormatListBulletedIcon /> },
  { name: "Products", path: "/admin/products", icon: <CategoryIcon /> },
  {
    name: "Add Product",
    path: "/admin/products/create",
    icon: <AddIcon />,
  },
  {
    name: "Add Category",
    path: "/admin/categories/create",
    icon: <AddIcon />,
  },
];
