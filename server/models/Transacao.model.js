import mongoose from "mongoose";

const TransacaoSchema = new mongoose.Schema(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: true }
);

const Transacao = mongoose.model("Transacao", TransacaoSchema);
export default Transacao;