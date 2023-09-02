import React, { useEffect } from "react";
import Steppercomponent from "../Stepper/Stepper";
import Tabs from "../Tabs/Tabs";
import Header from "../../Header/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux/es/hooks/useSelector";
import RegistrationCompletePage from "../Approvel/RegistraionComp";
import { useDispatch } from "react-redux";
import { getScanDetails } from "../../../redux/features/CenterSlice";

const Scanregistration = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("existinguser"));
  console.log("user", user);
  console.log("id", user._id);
  const centerData = useSelector((state) => state.center.Centerdata);
  console.log("centerData", centerData);
  console.log(centerData?.isSubmitted);
  console.log(centerData?.isVerified);

  useEffect(() => {
    dispatch(getScanDetails(user._id));
  }, []);

  return (
    <div>
      <Header />
      <Container sx={{ marginTop: "30px" }}>
        <Box
          sx={{ bgcolor: "#cfe8fc" }}
          style={{ padding: "30px 30px 30px 30px" }}
        >
          {centerData?.isVerified && centerData?.isSubmitted ? (
            <Tabs />
          ) : centerData?.isSubmitted ? (
            <RegistrationCompletePage />
          ) : (
            <Steppercomponent />
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Scanregistration;
