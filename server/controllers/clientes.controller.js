import Produto from "../models/Produto.model.js";
import ProdutoEstatisticas from "../models/ProdutoEstatisticas.model.js";
import Transacao from "../models/Transacao.model.js";
import Usuario from "../models/Usuario.model.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();

    if (!produtos) {
      return res.status(404).json({ error: "Produtos não encontrados!" });
    }

    const produtosComEstatisticas = await Promise.all(
      produtos.map(async (produto) => {
        const estatistica = await ProdutoEstatisticas.find({
          productId: produto._id,
        });
        return {
          ...produto._doc,
          estatistica,
        };
      })
    );

    res.status(200).json(produtosComEstatisticas);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCompradores = async (req, res) => {
  try {
    const compradores = await Usuario.find({ role: "user" });

    if (!compradores) {
      return res
        .status(404)
        .json({ error: "Lista de compradores não encontrados!" })
        .select("-password");
    }

    res.status(200).json(compradores);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransacoes = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transacoes = await Transacao.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transacao.countDocuments({
      userId: { $regex: search, $options: "i" },
    });
    res.status(200).json({ transacoes, total });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getGeografia = async (req, res) => {
  try {
    const usuarios = await Usuario.find();

    const mapLocais = usuarios.reduce((acc, { country }) => {
      const paisesISO3 = getCountryIso3(country);
      if (!acc[paisesISO3]) {
        acc[paisesISO3] = 0;
      }
      acc[paisesISO3]++;
      return acc;
    }, {});

    const locaisFormatados = Object.entries(mapLocais).map(
      ([pais, quantidade]) => {
        return { id: pais, value: quantidade };
      }
    );

    res.status(200).json(locaisFormatados);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
