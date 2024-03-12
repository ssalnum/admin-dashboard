import "./App.css";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { themeSettings } from "theme";

import Layout from "./scenes/layout/index";
import Dashboard from "scenes/dashboard";
import Produtos from "scenes/Produtos";
import Compradores from "scenes/Compradores";
import Transacoes from "scenes/Transacoes";
import Geografia from "scenes/Geografia";
import VisaoGeral from "scenes/VisaoGeral";
import Diaria from "scenes/Diaria";
import Mensal from "scenes/Mensal";
import PieChartVendas from "scenes/PieChartVendas";
import Admin from "scenes/Admin";
import Performance from "scenes/Performance";

function App() {
  const modo = useSelector((state) => state.global.modo);
  const theme = useMemo(() => createTheme(themeSettings(modo), [modo]));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/compradores" element={<Compradores />} />
              <Route path="/transacoes" element={<Transacoes />} />
              <Route path="/geografia" element={<Geografia />} />
              <Route path="/vendas" element={<VisaoGeral />} />
              <Route path="/diaria" element={<Diaria />} />
              <Route path="/mensal" element={<Mensal />} />
              <Route path="/categoria" element={<PieChartVendas />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
