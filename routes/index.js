const init = db => {
    const router = require('express').Router()
    const home = require('./home')
    const products = require('./products')
    const categories = require('./categories')

    router.use(home())
    router.use('/categoria', categories(db))
    router.use('/produto', products(db))
    return router
}

module.exports = init