import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Chip, Divider, Stack, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import { getScanCategories } from "../../../redux/features/CenterSlice";
import { useEffect, useState } from "react";

export default function AddScan() {
  const dispatch = useDispatch();
  const scanCategories = useSelector((state) => state.center);
  console.log("scanCategories", scanCategories);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log("data", data);
    handleClose();
  };

  useEffect(() => {
    dispatch(getScanCategories());
  },[]);

  const top100Films = [
    "Assamese",
    "Bengali",
    "Bodo",
    "Dogri",
    "English",
    "Gujarati",
    "Hindi",
    "Kannada",
    "Kashmiri",
    "Konkani",
    "Maithili",
    "Malayalam",
    "Marathi",
    "Meitei",
    "Nepali",
    "Odia",
    "Punjabi",
    "Sanskrit",
    "Santali",
    "Sindhi",
    "Tamil",
    "Telugu",
    "Urdu",
  ];

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        padding: "12px",
      }}
    >
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "20px" }}
      >
        Add Scan Details
      </Typography>
      <Divider />
      <Box height={10} />
      <Stack direction={"row"} spacing={2} className="my-2-mb-2">
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          ADD
        </Button>
      </Stack>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Scan Details
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Category
              </TableCell>
              <TableCell align="left" style={{ minWidth: "100px" }}>
                Price
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow hover role="checkbox" tabIndex={-1}>
              <TableCell align="left"> </TableCell>
              <TableCell align="left"></TableCell>
              <TableCell></TableCell>
            </TableRow>

            {/* <TableRow>
                <TableCell colSpan={1}>Loading...</TableCell>
              </TableRow>
          */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open}>
        <DialogTitle>ADD SCAN AND MRI</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            {/* <DialogContentText>Test Categories</DialogContentText> */}
            <Stack spacing={3} sx={{ width: 500 }}>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} label="Select Category" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                sx={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sub Categroy" />
                )}
              />

              <TextField
                placeholder="Enter Details"
                multiline
                rows={2}
                maxRows={4}
              />
              <TextField
                id="outlined-password-input"
                label="Price"
                type="number"
                autoComplete="current-password"
              />
            </Stack>

            {/* <TextField
              {...register("TestName")}
              margin="dense"
              id="name"
              label="TestName"
              type="name"
              variant="standard"
              sx={{ width: "500px" }}
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">SUBMIT</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Paper>
  );
}
