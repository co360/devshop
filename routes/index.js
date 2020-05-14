const init = db => {
    const router = require('express').Router()

    const auth = require('../controllers/auth')

    const home = require('./home')
    const products = require('./products')
    const categories = require('./categories')

    router.use(home())
    router.post('/login', auth.login(db))
    router.use('/categoria', categories(db))
    router.use('/produto', products(db))
    return router
}

module.exports = init