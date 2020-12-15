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

const controller = require("../controllers/rentController")

router.get("/rent/update/:id", controller.renderUpdatePage)

router.post("/rent/update/:id", async(req, res) => {
    try{
        const r = await rent.findByPk(req.params.id).catch("err");
        r.update(req.body)
        res.send("Modificat.")
    } catch(err){
        res.send(err.message)
    }
})

router.get("/rent/delete/:id", controller.renderDeletePage)

router.get("/rent/get/:id", controller.renderGetPage)

router.get("/rent/getAll", controller.renderGetAllPage)

router.get("/rent/add", controller.renderAddPage)

router.post("/rent/add", async(req, res)=> {
        try{
            var rent = await models.rents
            const dateSplit = req.body.date.split(" to")
            req.body.date1 = dateSplit[0]
            req.body.date2 = dateSplit[1]
            console.log(req.body)
            await rent.create(req.body).catch("err");
            res.send("Creat")
        } catch(err){
            res.send(err.message)
        }
})


module.exports = router