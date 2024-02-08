import { Box, Typography } from "@mui/material";
import React from "react";
import machine from "../assets/ezgif-1-1abd3e1e55.jpg";
import { useNavigate } from "react-router-dom";

const Machines = () => {
  const navigate = useNavigate();
  return (
    <Box display={"flex"} gap={"30px"}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        borderRadius={"8px"}
        padding={"20px"}
        onClick={() => {
          navigate("/machineData");
        }}
        height={"fit-content"}
        sx={{
          "&:hover": {
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          },
          backgroundColor: "#D9F4FF",
          cursor: "pointer",
        }}
      >
        <Box
          component={"img"}
          src={machine}
          width={"100%"}
          height={"47%"}
          borderRadius={"6px"}
        />
        <Typography
          fontSize={"50px"}
          color="green"
          marginX={"20px"}
          fontWeight={600}
        >
          Gas Turbines
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        borderRadius={"8px"}
        padding={"20px"}
        height={"fit-content"}
        sx={{
          "&:hover": {
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          },
          backgroundColor: "#D9F4FF",
          cursor: "pointer",
        }}
      >
        <Box
          component={"img"}
          src={machine}
          width={"100%"}
          height={"47%"}
          borderRadius={"6px"}
        />
        <Typography
          fontSize={"50px"}
          color="green"
          marginX={"20px"}
          fontWeight={600}
        >
          Gas Turbines
        </Typography>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        borderRadius={"8px"}
        padding={"20px"}
        height={"fit-content"}
        onClick
        sx={{
          "&:hover": {
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          },
          backgroundColor: "#D9F4FF",
          cursor: "pointer",
        }}
      >
        <Box
          component={"img"}
          src={machine}
          width={"100%"}
          height={"47%"}
          borderRadius={"6px"}
        />
        <Typography
          fontSize={"50px"}
          color="green"
          marginX={"20px"}
          fontWeight={600}
        >
          Gas Turbines
        </Typography>
      </Box>
    </Box>
  );
};

export default Machines;
