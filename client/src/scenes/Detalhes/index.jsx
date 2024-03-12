import { Box } from "@mui/material";
import Header from "components/Header";
import PieChart from "components/PieChart";

const Detalhes = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header titulo="DETALHES" subtitulo="Detalhes das Vendas por Categoria" />
      <Box mt="40px" height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Detalhes;
