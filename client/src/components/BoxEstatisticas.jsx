import { Box, Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";

const BoxEstatisticas = ({ titulo, valor, aumento, icone, descricao }) => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 2"
      gridRow="span 1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p="1.25rem 1rem"
      flex="1 1 100%"
      backgroundColor={theme.palette.background.alt}
      borderRadius="0.55rem"
    >
      <FlexBetween>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
          {titulo}
        </Typography>
        {icone}
      </FlexBetween>

      <Typography
        variant="h3"
        fontWeight="600"
        sx={{ color: theme.palette.secondary[200] }}
      >
        {valor}
      </Typography>

      <FlexBetween gap="1rem">
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: theme.palette.secondary.light }}
        >
          {aumento}
        </Typography>
        <Typography>{descricao}</Typography>
      </FlexBetween>
    </Box>
  );
};

export default BoxEstatisticas;
