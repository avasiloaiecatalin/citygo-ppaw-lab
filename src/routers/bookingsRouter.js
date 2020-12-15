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

router.post("/booking/create", async(req, res) => {
    try{
        var bookings = await models.bookings
        const b = await bookings.create(req.body).catch("err");
        res.send("Created")
    } catch(err){
        res.send(err.message)
    }
})

router.post("/booking/update", async(req, res) => {
    try{
        var bookings = await models.bookings
        const b = await bookings.update(req.body, {where: {id: req.body.id}})
        res.send("Modificat.")
    }catch(err){
        res.send(err.message)
    }
})

router.delete("/booking/delete", async(req, res) => {
    try{
        var bookings = await models.bookings
        const b = await bookings.destroy({where: {id: req.body.id}})
        res.send("Sters.")
    }catch(err){
        req.send(err.message)
    }
})

router.get("/booking/get", async(req, res)=> {
    try{
        var bookings = await models.bookings
        const s = await bookings.findAll({where: {id: req.body.id}})
        res.send(s)
    }catch(err){
        res.send(err.message)
    }
})

router.get("/booking/getAll", async(req, res)=> {
    try{
        var bookings = await models.bookings
        const s = await bookings.findAll()
        res.send(s)
    }catch(err){
        res.send(err.message)
    }
})


module.exports = router