import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import PieChart from "components/PieChart";

const PieChartVendas = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header
        titulo="GRÁFICO PIZZA"
        subtitulo="Gráfico das Vendas por Categoria"
      />
      <Box mt="40px" height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default PieChartVendas;
