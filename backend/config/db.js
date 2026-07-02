import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://suklad342_db_user:0KT3iIRDtjIa67h1@ac-adihipd-shard-00-00.hcwvbwd.mongodb.net:27017,ac-adihipd-shard-00-01.hcwvbwd.mongodb.net:27017,ac-adihipd-shard-00-02.hcwvbwd.mongodb.net:27017/?ssl=true&replicaSet=atlas-13yrh5-shard-0&authSource=admin&appName=Cluster0");

    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
    process.exit(1);
  }
}