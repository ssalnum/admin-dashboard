import Usuario from "../models/Usuario.model.js";
import Transacao from "../models/Transacao.model.js";
import EstatisticaGeral from "../models/EstatisticaGeral.model.js";

export const getUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findById(id);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getInformacoesDashboard = async (req, res) => {
  try {
    //Valores hardcoded
    const MES_ATUAL = "November";
    const ANO_ATUAL = 2021;
    const DIA_ATUAL = "2021-11-15";

    const transacoesRecentes = await Transacao.find()
      .limit(50)
      .sort({ createdOn: -1 });

    const estatisticasGerais = await EstatisticaGeral.find({ year: ANO_ATUAL });

    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
    } = estatisticasGerais[0];

    const estatisticasDesseMes = estatisticasGerais[0].monthlyData.find(
      ({ month }) => {
        return month === MES_ATUAL;
      }
    );

    const estatisticasDeHoje = estatisticasGerais[0].dailyData.find(
      ({ date }) => {
        return date === DIA_ATUAL;
      }
    );

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      estatisticasDesseMes,
      estatisticasDeHoje,
      transacoesRecentes,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
