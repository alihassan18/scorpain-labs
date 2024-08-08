import mongoose from "mongoose";
import QueryForm from "../../../models/querysModel";
import { NextResponse } from "next/server";
import winston from "winston";
// test
const logger = winston.createLogger({
  level: "error",
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    // connect server
    await mongoose.connect(
      process.env.MONGODB_URI ||
      "mongodb+srv://alihassan:OixJwDgll81R1UM1@cluster0.wapv0.mongodb.net/scorpion_lab"
    );
  } catch (error) {
    logger.error("Failed to connect to MongoDB", error);
    throw new Error("Database connection error");
  }
};

export async function POST(request) {
  try {
    await connectDB();

    const { companyName, projectName, telegram, website } =
      await request.json();

    if (!companyName || !projectName || !telegram || !website) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const newQuery = new QueryForm({
      companyName,
      projectName,
      telegram,
      website,
    });

    const savedQuery = await newQuery.save();

    return NextResponse.json(savedQuery, { status: 201 });
  } catch (error) {
    logger.error("Failed to save the query", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
