import React, { useState } from "react";
import SideDrawer from "./SideDrawer";
import {
  Menu,
  Home,
  LockClock,
  Assignment,
  LocalHospital,
  Person,
  Settings,
  Explore,
  ExpandCircleDownSharp,
} from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Drawer, Stack, Box } from "@mui/material";
import "../index.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const params = useLocation();
  console.log(params);
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };
  const pushUpsHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/run-script", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        alert("Script executed successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while trying to run the script.");
    }
  };

  const curlsHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/run-curls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        alert("Script executed successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("An error occurred while trying to run the script.");
    }
  };
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"32px"}
        width={"fit-content"}
        alignItems={"flex-start"}
        paddingX={"15px"}
        height={"90vh"}
        sx={{
          backgroundColor: "#152982",
        }}
      >
        <IconButton
          size="large"
          aria-haspopup="true"
          onClick={() => navigate("/")}
          color="inherit"
          sx={{
            display: { xs: "flex", lg: "flex" },
            backgroundColor: params.pathname === "/" ? "#CAA0C3" : "white",
          }}
        >
          <Home
            height={54}
            width={54}
            sx={{
              color: params.pathname === "/" ? "white" : "black",
            }}
          />
        </IconButton>
        <IconButton
          size="large"
          aria-haspopup="true"
          onClick={() => navigate("/machines")}
          color="inherit"
          sx={{
            display: { xs: "flex", lg: "flex" },
            backgroundColor:
              params.pathname === "/machines" ? "#CAA0C3" : "white",
          }}
        >
          <LockClock
            height={54}
            width={54}
            sx={{
              color: params.pathname === "/machines" ? "white" : "black",
            }}
          />
        </IconButton>
        <IconButton
          size="large"
          aria-haspopup="true"
          color="inherit"
          onClick={() => navigate("/machineData")}
          sx={{
            display: { xs: "flex", lg: "flex" },
            backgroundColor:
              params.pathname === "/machineData" ? "#CAA0C3" : "white",
          }}
        >
          <LocalHospital
            height={54}
            width={54}
            sx={{
              color: params.pathname === "/machineData" ? "white" : "black",
            }}
          />
        </IconButton>
        <IconButton
          size="large"
          aria-haspopup="true"
          color="inherit"
          onClick={() => navigate("/livefeed")}
          sx={{
            display: { xs: "flex", lg: "flex" },
            backgroundColor:
              params.pathname === "/livefeed" ? "#CAA0C3" : "white",
          }}
        >
          <Assignment
            height={54}
            width={54}
            sx={{
              color: params.pathname === "/livefeed" ? "white" : "black",
            }}
          />
        </IconButton>
        <IconButton
          size="large"
          aria-haspopup="true"
          color="inherit"
          onClick={() => navigate("/workers")}
          sx={{
            display: { xs: "flex", lg: "flex" },
            backgroundColor:
              params.pathname === "/workers" ? "#CAA0C3" : "white",
          }}
        >
          <Person
            height={54}
            width={54}
            sx={{
              color: params.pathname === "/workers" ? "white" : "black",
            }}
          />
        </IconButton>
        <IconButton
          onClick={pushUpsHandler}
          size="large"
          aria-haspopup="true"
          color="inherit"
          sx={{
            display: { xs: "flex", lg: "flex" },
            backgroundColor:
              params.pathname === "/settings" ? "#CAA0C3" : "white",
          }}
        >
          <Explore
            height={54}
            width={54}
            sx={{
              color: params.pathname === "/settings" ? "white" : "black",
            }}
          />
        </IconButton>
        <IconButton
          size="large"
          onClick={curlsHandler}
          aria-haspopup="true"
          color="inherit"
          sx={{
            display: { xs: "flex", lg: "flex" },
            backgroundColor:
              params.pathname === "/pushups" ? "#CAA0C3" : "white",
          }}
        >
          <ExpandCircleDownSharp
            height={54}
            width={54}
            sx={{
              color: params.pathname === "/settings" ? "white" : "black",
            }}
          />
        </IconButton>
      </Box>

      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => toggleDrawer(false)}
        sx={{
          ".MuiDrawer-paper": {
            borderBottomRightRadius: "26px",
            borderBottomLeftRadius: "26px",
            width: "30%",
            height: "100%",
          },
        }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <IconButton
            onClick={() => setIsDrawerOpen(false)}
            style={{ marginRight: "3%" }}
          >
            <Menu style={{ height: "24px", width: "24px", padding: "12px" }} />
          </IconButton>
        </Stack>

        <Stack
          padding={""}
          alignItems={"flex-start"}
          paddingBottom="40%"
          sx={{
            overflowY: "scroll",
          }}
        ></Stack>
      </Drawer>
    </>
  );
};
export default Navbar;
