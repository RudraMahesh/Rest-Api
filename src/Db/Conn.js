const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1/E-commerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connection successfull")
}).catch((e) => {
    console.log("No Connection", e)
})