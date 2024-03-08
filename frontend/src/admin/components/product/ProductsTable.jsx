import { Avatar, Button, Card } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findAllProducts } from "../../../redux/product/action";
import EmptyItemsText from "../../../shared/components/infoText/EmptyItemsText";
import LoadingText from "../../../shared/components/infoText/LoadingText";
import { toTitleCaseForHyphen } from "../../../utils/utils";

const ProductsTable = () => {
  const products = useSelector((store) => store.product.products);
  const isLoading = useSelector((store) => store.product.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAllProducts());
  }, [dispatch]);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  return isLoading && !products ? (
    <LoadingText />
  ) : (
    <div className="p-10 pt-0">
      <h1 className="my-2 text-center text-3xl font-normal">All Products</h1>
      <Card className=" bg-[#1b1b1b]">
        {products?.length === 0 ? (
          <EmptyItemsText />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Image</TableCell>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Discounted Price</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.isArray(products) &&
                  products?.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <Avatar src={item.image}></Avatar>
                      </TableCell>
                      <TableCell align="left">{item.id}</TableCell>
                      <TableCell align="left">{item.title}</TableCell>
                      <TableCell align="left">
                        {toTitleCaseForHyphen(item?.category?.name)}
                      </TableCell>
                      <TableCell align="left">₹{item.price}</TableCell>
                      <TableCell align="left">
                        ₹{item.discountedPrice}
                      </TableCell>
                      <TableCell align="left">{item.quantity}</TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => handleProductDelete(item.id)}
                          variant="outlined"
                          color="error"
                        >
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </div>
  );
};

export default ProductsTable;
