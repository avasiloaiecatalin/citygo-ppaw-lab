const e = require("express");
var Sequelize = require("sequelize");
const scooters = require("../modelss/scooters");
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
var rent = models.rents
var client = models.clients

exports.renderAddPage = async (req, res) => {
    try{
        var s = await sequelize.query("SELECT * from scooters s where s.id not in (SELECT scooter_id FROM rents)", {
            model: models.scooters,
            mapToModel: true
        })
        var c = await client.findAll() 

        res.render("rent/add", {title: 'Adauga inchiriere', s:s, c:c})
    }catch(err){
        res.send(err.message)
    }
}

exports.renderUpdatePage = async (req, res) => {
    try{
        var s = await sequelize.query("SELECT * from scooters s where s.id not in (SELECT scooter_id FROM rents)", {
            model: models.scooters,
            mapToModel: true
        })

        var r = await rent.findByPk(req.params.id)

        var thisScooter = await scooter.findByPk(r.scooter_id)
        var thisClient = await client.findByPk(r.renter)

        var c = await sequelize.query("SELECT * from clients where id != "+thisClient.id, {
            model: models.scooters,
            mapToModel: true
        })

        //c = thisClient.concat(c)
        //s = thisScooter.concat(s)
        c.unshift(thisClient)
        s.unshift(thisScooter)

        if(r){
            res.render("rent/update", {title: 'Inchiriere', r:r, s:s, c:c})
        }
        else{
            res.redirect('http://localhost:4999')
        }
    }catch(err){
        res.send(err.message)
    }
}

exports.renderGetPage = async (req, res) => {
    try{
        var r = await rent.findAll({where: {id: req.params.id}})
        if(r[0]){
            const scooter_id = r[0].dataValues.scooter_id
            const rent_client = r[0].dataValues.renter
            var c = await client.findByPk(rent_client)
            if(!c){
                c=null
            }
            var d1 = new Date(r[0].dataValues.date1)
            var d2 = new Date(r[0].dataValues.date2)
            var diff = Math.abs(d1.getTime() - d2.getTime()) / 3600000
            console.log(diff)
            var s = await scooter.findByPk(scooter_id)
            if(!s){
                s = null
            }else{
                r[0].dataValues.topay = s.price_per_hour*diff
            }
            

            res.render("rent/get", {title: 'Rent', r:r[0].dataValues, c:c, s:s})
        }
        else{
            res.redirect('http://localhost:4999')
        }
    }catch(err){
        res.send(err.message)
    }
}

exports.renderGetAllPage = async (req, res) => {
    try{
        var r = await rent.findAll()
        if(r[0]){
            var d1
            var d2
            var diff
            for(var i=0; i<r.length; i++){
                d1 = new Date(r[i].dataValues.date1)
                d2 = new Date(r[i].dataValues.date2)
                diff = Math.abs(d1.getTime() - d2.getTime()) / 3600000
                var thisScooter = await scooter.findByPk(r[i].dataValues.scooter_id)
                r[i].dataValues.topay = thisScooter.price_per_hour*diff
                r[i].dataValues.scooter_name = thisScooter.name

                var thisClient = await client.findByPk(r[i].dataValues.renter)
                r[i].dataValues.client_name = thisClient.first_name + " " + thisClient.last_name
            }
            
            res.render("rent/getAll", {title: 'Inchirieri', r:r})
        }
        else{
            res.redirect('http://localhost:4999')
        }
    }catch(err){
        res.send(err.message)
    }

}

exports.renderDeletePage = async(req, res) => {
    try{
        var id = req.params.id
        await rent.destroy({where: {id}})
        var backURL = req.header('Referer') || '/';
        res.redirect(backURL)
    }catch(err){
        res.send(err.message)
    }
}