const express = require("express");
const { body } = require("express-validator");
const router = express.Router()
var Sequelize = require("sequelize");
var initModels = require("../modelss/init-models").initModels; 
// sequelize-auto -o "./src/modelss" -d citygo -h localhost -u root -p 3306 -x root -e mysql
const mysql = {
    dbname: 'citygo2',
    user: 'root',
    pass: 'root',
    options: { dialect: 'mysql', port: 3306 }
  };
var sequelize = new Sequelize(mysql.dbname, mysql.user, mysql.pass, mysql.options);
var models = initModels(sequelize);
var scooter = models.scooters;

const controller = require("../controllers/scooterController")

router.get("/scooter/get/:id", controller.renderGetPage)

router.get("/scooter/update/:id", controller.renderUpdatePage)

router.get("/scooter/getAll", controller.renderGetAllPage)

router.get("/scooter/add", controller.renderAddPage)

router.get("/scooter/delete/:id", controller.renderDeletePage)

router.post("/scooter/add", async(req, res)=> {
    try{
        try{
            req.body.qr = req.body.name
            await scooter.create(req.body).catch("err");
            res.send("Created")
        } catch(err){
            res.send(err.message)
        }
    }catch(err){
        res.send(err.message)
    }
})

router.post("/scooter/update/:id", async(req, res)=> {
    try{
        try{
            req.body.qr = req.body.name
            const s = await scooter.findByPk(req.params.id).catch("err");
            s.update(req.body)
            res.send("Updated")
        } catch(err){
            res.send(err.message)
        }
    }catch(err){
        res.send(err.message)
    }
})


module.exports = router