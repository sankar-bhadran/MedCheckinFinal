import React from "react";
import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Container,
  Divider,
  Button,
  Card,
  CardMedia,
} from "@mui/material";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCenterDetails,
  centerapproval,
} from "../../../redux/features/admiSlice";
import { ToastContainer, toast } from "react-toastify";

const CenterDetailPage = () => {
  const data = useSelector((state) => state.admin);
  const CenterData = useSelector((state) => state.admin.Data);
  console.log("CenterData", CenterData);
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log("id", id);

  console.log(data.successMessages);

  useEffect(() => {
    dispatch(getCenterDetails(id));
  }, []);

  const handleButtonClick = (data) => {
    console.log(data);
    dispatch(centerapproval(data));
  };

  // useEffect(() => {
  //   data.messageStatus &&
  //     toast.success("approvedddddd....!", { theme: "colored" });
  // }, [data.messageStatus]);

  return (
    <>
      <Grid container>
        <Container sx={{ minHeight: "100vh" }}>
          <Paper
            sx={{
              maxWidth: "1100px",
              margin: "auto",
              marginTop: "50px",
              padding: "20px",
              border: "1px solid #999",
              // display: "flex",
              // flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <Box>
              <Typography
                sx={{
                  margin: "10px",
                  marginBottom: "15px",
                  color: "#1778F2",
                  fontWeight: "bold",
                }}
              >
                Basic Information
              </Typography>
              <Divider
                sx={{
                  width: "100%",
                  backgroundColor: "#c0c0c0",
                  margin: "0 auto 20px auto",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              />
              <Stack direction="row" spacing={15}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      CENTER NAME
                      <Typography>{CenterData?.CenterName}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      EMAIL ADDRESS
                      <Typography>{CenterData?.owner?.email}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      CONTACT NUMBER
                      <Typography>{CenterData?.ContactNumber}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      BUILDING NAME
                      <Typography>{CenterData?.BuildingName}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      AREA
                      <Typography>{CenterData?.Area}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      LANDMARK
                      <Typography>{CenterData?.LandMark}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      CITY
                      <Typography>{CenterData?.City}</Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography
                      sx={{ textAlign: "center", fontWeight: "bold" }}
                    >
                      STATE
                      <Typography>{CenterData?.State}</Typography>
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </Box>
            <Box>
              <Typography
                sx={{
                  margin: "30px",
                  marginBottom: "15px",
                  color: "#1778F2",
                  fontWeight: "bold",
                }}
              >
                Your Addresses
              </Typography>
              <Divider
                sx={{
                  width: "98%",
                  backgroundColor: "#c0c0c0",
                  margin: "0 auto 20px auto",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              />
              <Stack direction="row" spacing={15}>
                <Grid container spacing={3}>
                  {CenterData?.CenterImages &&
                  CenterData?.CenterImages.length > 0 ? (
                    CenterData.CenterImages.map((centerimage, index) => (
                      <Grid item xs={12} md={4}>
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            "& > :not(style)": {
                              m: 1,
                              width: 300,
                              height: 200,
                              marginLeft: "60px",
                              // maxWidth: 220,
                              border: "2px dashed gray",
                            },
                          }}
                        >
                          <Stack>
                            <Typography
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%",
                                // color: "#1778F2",
                                // fontWeight: "bold",
                              }}
                            >
                              <Card sx={{ width: "200px" }}>
                                <CardMedia
                                  component="img"
                                  sx={{ width: 200, margin: 0, height: 150 }}
                                  image={`http://localhost:5000/images/${CenterData?.CenterImages?.[index]}`}
                                  alt="no Image"
                                />
                              </Card>
                            </Typography>
                            <Stack
                              direction={"row"}
                              spacing={1}
                              marginBottom={"10PX"}
                              marginLeft={"10px"}
                            ></Stack>
                          </Stack>
                        </Box>
                      </Grid>
                    ))
                  ) : (
                    <Typography>No certificate images available.</Typography>
                  )}
                </Grid>
              </Stack>
            </Box>
            <Box>
              <Typography
                sx={{
                  margin: "30px",
                  marginBottom: "15px",
                  color: "#1778F2",
                  fontWeight: "bold",
                }}
              >
                Center Certificates
              </Typography>
              <Divider
                sx={{
                  width: "98%",
                  backgroundColor: "#c0c0c0",
                  margin: "0 auto 20px auto",
                  marginLeft: "10px",
                  marginRight: "30px",
                }}
              />
              <Stack direction="row" spacing={15}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        "& > :not(style)": {
                          m: 1,
                          width: 300,
                          height: 200,
                          marginLeft: "60px",
                          // maxWidth: 220,
                          border: "2px dashed gray",
                        },
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            // color: "#1778F2",
                            // fontWeight: "bold",
                          }}
                        >
                          <Card sx={{ width: "200px" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 200, margin: 0, height: 150 }}
                              image={`http://localhost:5000/images/${CenterData?.CertificateImages?.[0]?.NABH}`}
                              alt="no Image"
                            />
                          </Card>
                        </Typography>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          marginBottom={"10PX"}
                          marginLeft={"10px"}
                        ></Stack>
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        "& > :not(style)": {
                          m: 1,
                          width: 300,
                          height: 200,
                          marginLeft: "60px",
                          // maxWidth: 220,
                          border: "2px dashed gray",
                        },
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            // color: "#1778F2",
                            // fontWeight: "bold",
                          }}
                        >
                          <Card sx={{ width: "200px" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 200, margin: 0, height: 150 }}
                              image={`http://localhost:5000/images/${CenterData?.CertificateImages?.[1]?.NABL}`}
                              alt="no Image"
                            />
                          </Card>
                        </Typography>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          marginBottom={"10PX"}
                          marginLeft={"10px"}
                        ></Stack>
                      </Stack>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        "& > :not(style)": {
                          m: 1,
                          width: 300,
                          height: 200,
                          marginLeft: "60px",
                          // maxWidth: 220,
                          border: "2px dashed gray",
                        },
                      }}
                    >
                      <Stack>
                        <Typography
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            // color: "#1778F2",
                            // fontWeight: "bold",
                          }}
                        >
                          <Card sx={{ width: "200px" }}>
                            <CardMedia
                              component="img"
                              sx={{ width: 200, margin: 0, height: 150 }}
                              image={`http://localhost:5000/images/${CenterData?.CertificateImages?.[2]?.ISO}`}
                              alt="no Image"
                            />
                          </Card>
                        </Typography>
                        <Stack
                          direction={"row"}
                          spacing={1}
                          marginBottom={"10PX"}
                          marginLeft={"10px"}
                        ></Stack>
                      </Stack>
                    </Box>
                  </Grid>
                </Grid>
              </Stack>
              <Button
                variant="contained"
                sx={{ margin: "20px" }}
                onClick={() => handleButtonClick(id)}
              >
                Approve
              </Button>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </>
  );
};

export default CenterDetailPage;
