const express = require("express");
const { body } = require("express-validator");
const router = express.Router()
var Sequelize = require("sequelize");
var initModels = require("../modelss/init-models").initModels; 
// sequelize-auto -o "./src/modelss" -d citygo -h localhost -u root -p 3306 -x root -e mysql

const axios = require('axios')

const mysql = {
    dbname: 'citygo2',
    user: 'root',
    pass: 'root',
    options: { dialect: 'mysql', port: 3306 }
  };
var sequelize = new Sequelize(mysql.dbname, mysql.user, mysql.pass, mysql.options);
var models = initModels(sequelize);
var client = models.clients;

const controller = require("../controllers/clientController")

router.get("/client/get/:id", controller.renderGetPage)

router.get("/client/update/:id", controller.renderUpdatePage)

router.get("/client/getAll", controller.renderGetAllPage)

router.get("/client/add", controller.renderAddPage)

router.post("/client/add", async(req, res)=> {
    try{
        try{
            await client.create(req.body).catch("err");
            res.send("Created")
        } catch(err){
            res.send(err.message)
        }
    }catch(err){
        res.send(err.message)
    }
})

router.post("/client/update/:id", async(req, res)=> {
        try{
            const s = await client.findByPk(req.params.id).catch("err");
            s.update(req.body)
            res.send("Updated")
        } catch(err){
            res.send(err.message)
        }
})



router.get("/client/delete/:id", controller.renderDeletePage)


module.exports = router