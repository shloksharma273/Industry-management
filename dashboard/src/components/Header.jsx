import React, { useState } from "react";
import SideDrawer from "../components/SideDrawer";
import { Drawer, Stack, Box, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { IconButton } from "@mui/material";
const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const toggleDrawer = (open) => {
    setIsDrawerOpen(open);
  };
  return (
    <>
      <SideDrawer
        openDrawer={openDrawer}
        setOpenDrawer={() => setOpenDrawer(false)}
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        paddingLeft={"15px"}
        width={"auto"}
        paddingBottom={"15px"}
        sx={{
          backgroundColor: "#152982",
        }}
      >
        <Box
          display={"flex"}
          gap={"20px"}
          alignItems={"center"}
          marginTop={"15px"}
        >
          <IconButton
            size="large"
            aria-haspopup="true"
            onClick={() => toggleDrawer(true)}
            color="white"
            sx={{ display: { xs: "flex", lg: "flex" } }}
          >
            <Menu
              height={54}
              width={54}
              fill={"blue"}
              sx={{
                color: "white",
              }}
            />
          </IconButton>
          <Typography fontSize={"26px"} fontWeight={600} color={"white"}>
            Factro-set
          </Typography>
        </Box>
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

export default Header;
