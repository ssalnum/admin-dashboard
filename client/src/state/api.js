import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "Usuario",
    "Produtos",
    "Compradores",
    "Transacoes",
    "Geografia",
    "Vendas",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUsuario: build.query({
      query: (id) => `geral/usuario/${id}`,
      providesTags: ["Usuario"],
    }),
    getProdutos: build.query({
      query: (id) => `cliente/produtos`,
      providesTags: ["Produtos"],
    }),
    getCompradores: build.query({
      query: () => `cliente/compradores`,
      providesTags: ["Compradores"],
    }),
    getTransacoes: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "cliente/transacoes",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transacoes"],
    }),
    getGeografia: build.query({
      query: () => `cliente/geografia`,
      providesTags: ["Geografia"],
    }),
    getVendas: build.query({
      query: () => `vendas/vendas`,
      providesTags: ["Vendas"],
    }),
    getAdmins: build.query({
      query: () => `gerenciamento/admins`,
      providesTags: ["Admins"],
    }),
    getUsuarioPerformance: build.query({
      query: (id) => `gerenciamento/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getInformacoesDashboard: build.query({
      query: () => `geral/dashboard`,
      providesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetUsuarioQuery,
  useGetProdutosQuery,
  useGetCompradoresQuery,
  useGetTransacoesQuery,
  useGetGeografiaQuery,
  useGetVendasQuery,
  useGetAdminsQuery,
  useGetUsuarioPerformanceQuery,
  useGetInformacoesDashboardQuery,
} = api;
