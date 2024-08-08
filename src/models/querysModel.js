import mongoose from "mongoose";

const querySchema = new mongoose.Schema(
  {
    companyName: String,
    projectName: String,
    telegram: String,
    website: String,
  },
  {
    timestamps: true,
  }
);

const QueryForm =
  mongoose.models.querys || mongoose.model("querys", querySchema);

export default QueryForm;
