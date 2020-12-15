const express = require("express")
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
var sequelize = new Sequelize(mysql.dbname, mysql.user, mysql.pass, mysql.options)
var models = initModels(sequelize);
var scooter = models.scooters;

router.post("/addScooter", async(req, res) => {
    try{
        const s = await scooter.create(req.body).catch("err");
        res.send("Created")
    } catch(err){
        res.send(err.message)
    }
})

router.post("/updateScooter", async(req, res) => {
    try{
        const s = await scooter.findByPk(req.body.id).catch("err")
        req.body.qr = req.body.name
        s.update(req.body)
        res.send("Updated")
    } catch(err){
        res.send(err.message)
    }
})

router.get("/getScooters", async(req, res)=> {
    try{
        const s = await scooter.findAll()
        res.send(s)
    }catch(err){
        res.send(err.message)
    }
})

router.get("/getScooter", async(req, res)=> {
    try{
        const x = req.body
        console.log(x)
        const s = await scooter.findAll({where: x})
        res.send(s)
    }catch(err){
        res.send(err.message)
    }
})

module.exports = router