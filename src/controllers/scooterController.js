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

exports.renderAddPage = async (req, res) => {
    try{
        res.render("scooter/add", {title: 'Adauga trotineta'})
    }catch(err){
        res.send(err.message)
    }
}


exports.renderGetPage = async (req, res) => {
    try{
        const s = await scooter.findAll({where: {id: req.params.id}})
        const r = await rent.findAll({where: {scooter_id: req.params.id}})
        if(s[0]){
            if(r[0]){
                res.render("scooter/get", {title: 'Trotineta', s:s[0].dataValues, r: r[0].dataValues})
            }else{
                res.render("scooter/get", {title: 'Trotineta', s:s[0].dataValues, r:null})
            }
        }
        else{
            res.redirect('http://localhost:4999')
        }
    }catch(err){
        res.send(err.message)
    }
}

exports.renderUpdatePage = async (req, res) => {
    try{
        var s = await scooter.findAll({where: {id: req.params.id}})
        if(s[0]){
            var scooter_id = s[0].dataValues.id
            var r = await rent.findAll({where: {scooter_id: scooter_id}})
            if(r[0]){
                res.render("scooter/update", {title: 'Modifica trotineta', s:s[0].dataValues, r:r[0].dataValues})
            }else{
                res.render("scooter/update", {title: 'Modifica trotineta', s:s[0].dataValues, r:null})
            }
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
        const s = await scooter.findAll()
        const r = await rent.findAll()
        if(s[0]){
            res.render("scooter/getAll", {title: 'Lista trotinetelor', s:s, r:r})
        }
        else{
            res.redirect('http://localhost:4999')
        }
    }catch(err){
        res.send(err.message)
    }

}

exports.renderDeletePage = async (req, res) => {
    try{
        var id = req.params.id
        await rent.destroy({where: {scooter_id: id}})
        await scooter.destroy({where: {id: id}})
        var backURL = req.header('Referer') || '/';
        res.redirect(backURL)
    }catch(err){
        res.send(err.message)
    }
}