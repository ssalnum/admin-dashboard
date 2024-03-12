import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetTransacoesQuery } from "state/api";
import Header from "components/Header";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transacoes = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetTransacoesQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const colunas = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "Usuario ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "Criado em",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# dos Produtos",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Preço",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header titulo="TRANSAÇÕES" subtitulo="Lista de transações." />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          columns={colunas}
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transacoes) || []}
          paginationModel={{ page, pageSize }}
          pageSizeOptions={[20, 50, 100]}
          rowCount={(data && data.total) || 0}
          paginationMode="server"
          onPaginationModelChange={(newPaginationModel) => {
            setPage(newPaginationModel.page);
            setPageSize(newPaginationModel.pageSize);
          }}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          slots={{
            toolbar: DataGridCustomToolbar,
          }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        />
      </Box>
    </Box>
  );
};

export default Transacoes;
