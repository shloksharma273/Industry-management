import { Box, Typography } from "@mui/material";
import React from "react";
import ROSLIB from "roslib";
const DashHome = () => {
  return (
    <>
      <Box display={"flex"} gap={"20px"}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          padding={"20px"}
          borderRadius={"8px"}
          sx={{
            backgroundColor: "#D9F4FF",
          }}
        >
          <Typography
            fontSize={"25px"}
            padding={"20px 20px 5px 20px"}
            fontWeight={600}
          >
            Worker
          </Typography>
          <Typography
            fontSize={"50px"}
            color="green"
            marginX={"20px"}
            fontWeight={600}
          >
            1000
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          borderRadius={"8px"}
          padding={"20px"}
          sx={{
            backgroundColor: "#D9F4FF",
          }}
        >
          <Typography
            fontSize={"25px"}
            padding={"20px 20px 5px 20px"}
            fontWeight={600}
          >
            Worker
          </Typography>
          <Typography
            fontSize={"50px"}
            color="green"
            marginX={"20px"}
            fontWeight={600}
          >
            1000
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          borderRadius={"8px"}
          padding={"20px"}
          sx={{
            backgroundColor: "#D9F4FF",
          }}
        >
          <Typography
            fontSize={"25px"}
            padding={"20px 20px 5px 20px"}
            fontWeight={600}
          >
            Machine Health
          </Typography>
          <Typography
            fontSize={"45px"}
            color="green"
            marginX={"20px"}
            fontWeight={600}
          >
            78% avg. health
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          borderRadius={"8px"}
          padding={"20px"}
          sx={{
            backgroundColor: "#D9F4FF",
          }}
        >
          <Typography
            fontSize={"25px"}
            padding={"20px 20px 5px 20px"}
            fontWeight={600}
          >
            Worker Status
          </Typography>
          <Typography
            fontSize={"45px"}
            color="green"
            marginX={"20px"}
            fontWeight={600}
          >
            20% workforce
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DashHome;
