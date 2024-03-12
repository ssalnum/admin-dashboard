import mongoose from "mongoose";

const EstatisticaAfiliados = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const EstatisticaAfiliado = mongoose.model("EstatisticaAfiliado", EstatisticaAfiliados);
export default EstatisticaAfiliado;
