const init = db => {
    const express = require('express')
    const app = express()
    
    const routes = require('./routes')
    const category = require('./models/category')

    const bodyParser = require('body-parser')
    const session = require('express-session')

    app.use(bodyParser.json({ extended: true }))
    app.use(bodyParser.urlencoded({ extended: true }))
    
    app.use(session({
        secret: 'MyDevShopRulez!',
        name: 'sessionId'
    }))
    
    app.set('view engine', 'ejs')
    app.use(express.static('public'))

    //Middleware
    app.use( async(req, res, next) => {
        const categories = await category.getCategories(db)()
        const { user } = req.session
        res.locals = {
            categories,
            user
        } 
        next()
    })
    app.use(routes(db))

    return app
}

module.exports = init
