import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import Header from "components/Header";
import { useGetProdutosQuery } from "state/api";

const Produto = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
  index,
}) => {
  const theme = useTheme();
  const [estaExpandido, setEstaExpandido] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[200]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[300]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setEstaExpandido(!estaExpandido)}
        >
          Veja mais
        </Button>
        <Collapse
          in={estaExpandido}
          timeout="auto"
          unmountOnExit
          sx={{
            color: theme.palette.neutral[300],
          }}
        >
          <CardContent>
            <Typography> id: {_id}</Typography>
            <Typography>Estoque: {supply}</Typography>
            <Typography>
              Vendas deste ano: {stat[0].yearlySalesTotal}
            </Typography>
            <Typography>
              Vendas de unidades este ano: {stat[0].yearlyTotalSoldUnits}
            </Typography>
          </CardContent>
        </Collapse>
      </CardActions>
    </Card>
  );
};

const Produtos = () => {
  const { data, isLoading } = useGetProdutosQuery();
  const naoEhMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header titulo="PRODUTOS" subtitulo="Veja a sua lista de produtos." />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: naoEhMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              estatistica,
            }) => (
              <Produto
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={estatistica}
              />
            )
          )}
        </Box>
      ) : (
        <Box
          height="70vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default Produtos;
