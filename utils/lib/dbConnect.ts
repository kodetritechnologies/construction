import mongoose from "mongoose";

let isConnected = false;

export default async function dbConnect() {
  if (isConnected || mongoose.connection.readyState === 1) {
    isConnected = true;
    return;
  }

  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASS;
  const dbName = process.env.DB_NAME || "construction";

  if (!username || !password) {
    console.warn("MongoDB credentials not fully configured.");
    return;
  }

  const uri = `mongodb://${username}:${password}@ac-dwrpxci-shard-00-00.o4cvr9a.mongodb.net:27017,ac-dwrpxci-shard-00-01.o4cvr9a.mongodb.net:27017,ac-dwrpxci-shard-00-02.o4cvr9a.mongodb.net:27017/${dbName}?ssl=true&replicaSet=atlas-jhv7w4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Kodetritechnologies`;

  try {
    const db = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("MongoDB Connected successfully for Shreeji Constructions.");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
  }
}
