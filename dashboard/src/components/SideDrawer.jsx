/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Box, Drawer, IconButton, Typography } from "@mui/material";
import { Cancel } from "@mui/icons-material";

const Index = ({ openDrawer = false, setOpenDrawer }) => {
  return (
    <>
      <Drawer anchor="right" open={openDrawer}>
        <Box
          sx={{
            width: { xs: "100vw", md: "70vw", lg: "50vw" },
            paddingTop: "5%",
            paddingLeft: "14%",
            backgroundColor: "#FFEDFC",
            minHeight: "100vh",
            paddingBottom: "5%",
          }}
        >
          <Box
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{
              paddingRight: "5%",
            }}
          >
            <IconButton
              sx={{ cursor: "pointer" }}
              onClick={() => setOpenDrawer()}
            >
              <Cancel />
            </IconButton>
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "switzer",
                fontSize: "26px",
                fontWeight: 600,
                whiteSpace: { sx: "normal", md: "pre-line" },
                marginTop: "7.7%",
                lineHeight: "35px",
              }}
              color="white"
            >
              {`Great, please give us a brief detail about\nyour business.`}
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Index;
