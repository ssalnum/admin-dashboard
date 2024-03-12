import { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useGetUsuarioQuery } from "state/api";

import NavBar from "components/Navbar";
import SideBar from "components/SideBar";

const Layout = () => {
  const naoEhMobile = useMediaQuery("(min-width: 600px)");
  const [sideBarEstaAberta, setSideBarEstaAberta] = useState(true);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUsuarioQuery(userId);

  return (
    <Box display={naoEhMobile ? "flex" : "block"} width="100%" height="100%">
      <SideBar
        usuario={data || {}}
        naoEhMobile={naoEhMobile}
        drawerWidth="250px"
        sideBarEstaAberta={sideBarEstaAberta}
        setSideBarEstaAberta={setSideBarEstaAberta}
      />
      <Box flexGrow={1} overflow="auto">
        <NavBar
          usuario={data || {}}
          sideBarEstaAberta={sideBarEstaAberta}
          setSideBarEstaAberta={setSideBarEstaAberta}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
