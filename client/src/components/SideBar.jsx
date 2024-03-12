import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import profileImage from "assets/profile.svg";

const navItens = [
  {
    texto: "Dashboard",
    icone: <HomeOutlined />,
  },
  {
    texto: "Cliente",
    icone: null,
  },
  {
    texto: "Produtos",
    icone: <ShoppingCartOutlined />,
  },
  {
    texto: "Compradores",
    icone: <Groups2Outlined />,
  },
  {
    texto: "Transacoes",
    icone: <ReceiptLongOutlined />,
  },
  {
    texto: "Geografia",
    icone: <PublicOutlined />,
  },
  {
    texto: "Vendas Estatisticas",
    icone: null,
  },
  {
    texto: "Vendas",
    icone: <PointOfSaleOutlined />,
  },
  {
    texto: "Diaria",
    icone: <TodayOutlined />,
  },
  {
    texto: "Mensal",
    icone: <CalendarMonthOutlined />,
  },
  {
    texto: "Categoria",
    icone: <PieChartOutlined />,
  },
  {
    texto: "Gerenciamento",
    icone: null,
  },
  {
    texto: "Admin",
    icone: <AdminPanelSettingsOutlined />,
  },
  {
    texto: "Performance",
    icone: <TrendingUpOutlined />,
  },
];

const SideBar = ({
  usuario,
  drawerWidth,
  naoEhMobile,
  sideBarEstaAberta,
  setSideBarEstaAberta,
}) => {
  const { pathname } = useLocation();
  const [ativo, setAtivo] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setAtivo(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {sideBarEstaAberta && (
        <Drawer
          open={sideBarEstaAberta}
          onClose={() => setSideBarEstaAberta(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: naoEhMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
                {!naoEhMobile && (
                  <IconButton
                    onClick={() => setSideBarEstaAberta(!sideBarEstaAberta)}
                  >
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItens.map(({ texto, icone }) => {
                if (!icone) {
                  return (
                    <Typography key={texto} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {texto}
                    </Typography>
                  );
                }

                const textoCaixaBaixa = texto.toLowerCase();

                return (
                  <ListItem key={texto} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${textoCaixaBaixa}`);
                        setAtivo(textoCaixaBaixa);
                      }}
                      sx={{
                        backgroundColor:
                          ativo === textoCaixaBaixa
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          ativo === textoCaixaBaixa
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            ativo === textoCaixaBaixa
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icone}
                      </ListItemIcon>
                      <ListItemText primary={texto} />
                      {ativo === textoCaixaBaixa && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {usuario.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {usuario.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar;
