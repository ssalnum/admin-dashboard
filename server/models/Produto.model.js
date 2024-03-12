import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

const Produto = mongoose.model("Produto", ProdutoSchema);
export default Produto;