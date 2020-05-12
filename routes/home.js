const init = () => {
    const router = require('express').Router()
    const home = require('../controllers/home')

    router.get('/', home.getIndex)
    return router
}

module.exports = init