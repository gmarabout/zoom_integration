const express = require("express");

const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const zoomRoutes = require("./routes/zoomRoutes")

dotenv.config()

const port = 9000;

app.use(cors())
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use("/api/zoom", zoomRoutes); 


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});