const express = require("express");
const multer = require("multer")
const users = require("../Models/Users")
const models = require("../Models/Models")
const topM = require("../Models/topModel")
const router = new express.Router();

// Search api
router.get('/search/:id', async (req, resp) => {
    let result = await models.findOne({ _id: req.params.id })
    if (result) {
        resp.send(result)
    } else {
        resp.send({ result: "No record found" })
    }
})

// Rest Api

router.post("/signUp", async (req, resp) => {
    // let data = new users(req.body)
    // let result = data.save()
    // result.then(() => {
    //     resp.status(201).send(data)
    // }).catch((e) => {
    //     resp.status(400).send(e)
    // })
    try {
        let data = new users(req.body)
        let result = await data.save()
        result = result.toObject();
        delete result.pass
        resp.status(201).send(result)
    }
    catch (e) {
        resp.status(400).send(e)
    }
});

router.get("/signUp", async (req, resp) => {
    try {
        let result = await users.find().select("-pass")
        resp.status(200).send(result)
    }
    catch (e) {
        resp.status(500).send(e)
    }
})

router.get("/signUp/:id", async (req, resp) => {
    try {
        const _id = req.params.id
        let data = await users.findOne({ _id }).select("-pass")
        if (!data) {
            resp.status(404).send("Match not found")
        }
        else {
            resp.send(data)
        }
    }
    catch (e) {
        resp.status(500).send(e)
    }
})

router.patch("/signUp/:id", async (req, resp) => {
    try {
        const _id = req.params.id
        let result = await users.findByIdAndUpdate(_id, req.body, {
            new: true
        }).select("-pass")
        if (!result) {
            resp.status(404).send("Match not found")
        }
        else {
            resp.send(result)
        }
    }
    catch (e) {
        resp.status(500).send(e)
    }
})

router.delete("/signUp/:id", async (req, resp) => {
    try {
        const _id = req.params.id
        let result = await users.findByIdAndDelete(_id).select("-pass")
        if (!_id) {
            resp.status(404).send("Match not found")
        }
        else {
            resp.send("Successfully Deleted")
        }
    }
    catch (e) {
        resp.status(500).send(e)
    }
})

// for Login
router.post("/login", async (req, resp) => {
    if (req.body.pass && req.body.email) {
        let user = await users.findOne(req.body).select("-pass");
        if (user) {
            resp.send(user)
        } else {
            resp.send({ result: "user not match" })
        }
    }
    else {
        resp.send({ result: "Please Provide Email and Password" })
    }
});

// for multer
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads")
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })
})

// app.use('/uploads', express.static("uploads"))

// for Models
router.post("/model", upload.single("image"), async (req, resp) => {
    const newImage = new models({
        name: req.body.name,
        image: req.file.path,
        brand: req.body.brand,
        category: req.body.category,
        price: req.body.price,

    })
    let result = await newImage.save()
    console.log(result)
    resp.send("All okk")
})

router.get('/model', async (req, resp) => {
    let data = await models.find({});
    resp.send(data)
})

// for TopModels

router.post("/topModel", upload.single("image"), async (req, resp) => {
    const newImage = new topM({
        name: req.body.name,
        image: req.file.path,
        price: req.body.price,
    })

    let result = await newImage.save()
    console.log(result)
    resp.send("All okk")
})

router.get('/topModel', async (req, resp) => {
    let data = await topM.find({});
    resp.send(data)
})





module.exports = router;