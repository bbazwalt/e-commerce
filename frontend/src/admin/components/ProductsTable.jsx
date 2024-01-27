import { Avatar, Button, Card, CardHeader } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../../store/product/action";

const ProductsTable = () => {
  const dispatch = useDispatch();

  const product = useSelector((store) => store.product);

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return product?.isLoading ? (
    <div className="text-2xl text-center mt-6">Please wait. Loading...</div>
  ) : (    <div className="p-10 pt-0">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Products" />
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
              {product?.products?.map((item) => (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Avatar src={item.imageUrl}></Avatar>
                  </TableCell>
                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="left">{item.title}</TableCell>
                  <TableCell align="left">{item.category.name}</TableCell>
                  <TableCell align="left">₹{item.price}</TableCell>
                  <TableCell align="left">₹{item.discountedPrice}</TableCell>
                  <TableCell align="left">{item.quantity}</TableCell>
                  <TableCell align="left">
                    <Button
                      onClick={() => handleProductDelete(item.id)}
                      variant="outlined"
                      color="error"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default ProductsTable;
