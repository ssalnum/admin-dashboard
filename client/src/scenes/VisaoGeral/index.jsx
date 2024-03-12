import { useState } from "react";
import { FormControl, MenuItem, InputLabel, Box, Select } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";

const VisaoGeral = () => {
  const [view, setView] = useState("unidades");

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        titulo="VISÃO GERAL"
        subtitulo="Visão geral da receita e dos lucros."
      />
      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="vendas">Vendas</MenuItem>
            <MenuItem value="unidades">Unidades</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default VisaoGeral;
