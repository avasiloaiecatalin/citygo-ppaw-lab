exports.renderHomePage = (req, res) => {
    res.render("index", {title: 'Acasa'})
}

exports.renderRegisterPage = (req, res) => {
    res.render('register', {title: 'Inregistreaza-te'})
}