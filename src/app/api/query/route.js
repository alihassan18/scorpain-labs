import mongoose from "mongoose";
import QueryForm from "../../../models/querysModel";
import { NextResponse } from "next/server";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(
      "mongodb+srv://alihassan:OixJwDgll81R1UM1@cluster0.wapv0.mongodb.net/scorpion_lab",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
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
    console.error("Failed to save the query", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
