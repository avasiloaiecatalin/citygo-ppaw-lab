const e = require("express");
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
var rent = models.rents
var client = models.clients

exports.renderAddPage = async (req, res) => {
    try{
        res.render("client/add", {title: 'Add client'})
    }catch(err){
        res.send(err.message)
    }
}


exports.renderGetPage = async (req, res) => {
    try{
        var s = await client.findAll({where: {id: req.params.id}})
        if(!s[0]){
            res.redirect('http://localhost:4999')
        }
        const client_id = s[0].id
        var r = await rent.findAll({where: {renter: client_id}})
        if(!r[0]){
            r = null
        }
        res.render("client/get", {title: 'Client', s:s[0].dataValues, r: r})
    }catch(err){
        res.send(err.message)
    }
}

exports.renderUpdatePage = async (req, res) => {
    try{
        var s = await client.findAll({where: {id: req.params.id}})
        if(s[0]){
            res.render("client/update", {title: 'Client', s:s[0].dataValues})
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
        const s = await client.findAll()
        if(s[0]){
            res.render("client/getAll", {title: 'Clienti', s:s})
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
        await rent.destroy({where: {renter: id}})
        await client.destroy({where: {id}})
        var backURL = req.header('Referer') || '/';
        res.redirect(backURL)
    }catch(err){
        res.send(err.message)
    }
}