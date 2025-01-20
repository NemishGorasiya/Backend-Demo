import "dotenv/config";

import connectDB from "./db/index.js";
import app from "./app.js";

(async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Error while starting server ", error);
  }
})();
