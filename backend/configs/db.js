import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database Connected Successfully");
  });

  // Load env file explicitly (dotenv/config may not run in some setups)
  // Using require here avoids ESM/CJS issues.
  try {
    // eslint-disable-next-line no-undef
    const dotenv = await import("dotenv");
    dotenv.config();
  } catch {
    // ignore
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "MONGODB_URI is missing. Add it to backend/.env (and ensure it starts with mongodb:// or mongodb+srv://)."
    );
  }

  // Derive DB name from URI carefully.
  // If the URI already contains a DB segment, keep it as-is.
  // If not, append the default DB name.
  // You can override the DB name with MONGODB_DB.
  const defaultDbName = process.env.MONGODB_DB || "ecom";

  const hasDbInUri = (() => {
    // mongodb://host/dbName or mongodb+srv://host/dbName
    // also covers options like ?retryWrites=true
    const pathPart = uri.split("?")[0];
    return /\/[a-zA-Z0-9_-]+$/.test(pathPart);
  })();

  const finalUri = hasDbInUri ? uri : `${uri}/${defaultDbName}`;

  await mongoose.connect(finalUri);
};

export default connectDB;

