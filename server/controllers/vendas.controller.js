import EstatisticaGeral from "../models/EstatisticaGeral.model.js";

export const getVendas = async (req, res) => {
  try {
    const estatisticaGeral = await EstatisticaGeral.find();

    res.status(200).json(estatisticaGeral[0]);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
