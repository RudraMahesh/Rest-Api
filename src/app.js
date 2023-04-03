const express = require("express");
const cors = require("cors")
require("./Db/Conn")
const users = require("./Models/Users")
const app = express();
const router = require("./Routers/Route")

app.use(express.json());

app.use(cors());
app.use('/uploads', express.static("uploads"))

const port = process.env.PORT || 7000;


app.use(router)


app.listen(port);