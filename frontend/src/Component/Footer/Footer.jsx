import React from "react";
import { Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Box, Container } from "@mui/system";

function Footer() {
  const footercontent = [
    {
      heading: "Featured",
      subheading: ["Gudies", "Services", "Contact Us"],
    },
    {
      heading: "Overview",
      subheading: [
        "Location",
        "Partnership",
        "Terms of use & Privacy Policies",
      ],
    },
    {
      heading: "Get in touch",
      subheading: [
        "Location",
        "Partnership",
        "Terms of use & Privacy Policies",
      ],
    },
  ];
  const CustomContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      textAlign: "center",
    },
  }));

  const FooterLinke = styled(Stack)(({ theme }) => ({
    fontsize: "16px",
    color: "#000066",
    fontWeight: "300",
    cursor: "pointer",
    "&:hover": {
      color: "#6682ff",
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "center",
    },
  }));
  return (
    <>
      <Box sx={{ py: 10, backgroundColor: "#e2edfe" }}>
        <CustomContainer>
          {footercontent.map((item, index) => (
            <Box>
              <Typography
                sx={{
                  fontSize: "20px",
                  color: "#1c1c1D",
                  fontWeight: "700",
                  mb: 2,
                }}
              >
                {item.heading}
              </Typography>
              {item.subheading.map((item) => (
                <FooterLinke pb={2}>{item}</FooterLinke>
              ))}
            </Box>
          ))}
        </CustomContainer>
      </Box>
    </>
  );
}

export default Footer;
