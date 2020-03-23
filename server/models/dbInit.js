const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/ysDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log(`DB Connection successful`))
  .catch((err) => console.console.error("dberror: ", err));
