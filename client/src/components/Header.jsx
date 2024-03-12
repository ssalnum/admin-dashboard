import { Typography, Box, useTheme } from "@mui/material";

import React from "react";

const Header = ({ titulo, subtitulo }) => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {titulo}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary[300]} mb="0.75rem">
        {subtitulo}
      </Typography>
    </Box>
  );
};

export default Header;
