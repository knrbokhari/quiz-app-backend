import app from "./app";
import config from "./config";
import connectDB from "./db/mongoDB";

const PORT = config.port || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
