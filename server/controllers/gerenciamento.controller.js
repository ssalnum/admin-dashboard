import mongoose from "mongoose";
import Usuario from "../models/Usuario.model.js";
import Transacao from "../models/Transacao.model.js";

export const getAdmins = async (req, res) => {
  try {
    const admins = await Usuario.find({ role: "admin" }).select("-password");
    res.status(200).json(admins);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUsuarioPerformance = async (req, res) => {
  try {
    const { id } = req.params;

    const usuarioComEstatisticas = await Usuario.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "estatisticaafiliados",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);
    //flatten array - converte array multidimensional em unidimensional

    if (!usuarioComEstatisticas)
      res.status(404).json({ message: error.message });

    const transacoesVendas = await Promise.all(
      usuarioComEstatisticas[0].affiliateStats.affiliateSales.map((id) => {
        return Transacao.findById(id);
      })
    );

    const transacoesVendasFiltrado = transacoesVendas.filter(
      (transacao) => transacao !== null
    );

    res.status(200).json({
      user: usuarioComEstatisticas[0],
      sales: transacoesVendasFiltrado,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
