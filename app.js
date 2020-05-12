const init = db => {
    const express = require('express')
    const app = express()
    
    const routes = require('./routes')
    const category = require('./models/category')
    
    
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use( async(req, res, next) => {
        const categories = await category.getCategories(db)()
        res.locals = {
            categories
        } 
        next()
    })
    app.use(routes(db))

    return app
}

module.exports = init
