const express = require("express")
const router = express.Router()

const controller = require("../controllers/userController")

router.get("/", controller.renderHomePage)

router.get("/register", (req, res) => {
    res.render('register', {title: 'Inregistreaza-te'})
})
router.post("/", (req, res) => {
    console.log("moved")
    res.send("what")
})

router.post("/register", (req, res) => {
    //ds
})

module.exports = router