import "dotenv/config";
import express from "express";

import connectDB from "./db/index.js";

const app = express();

(async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error while starting server ", error);
  }
})();
