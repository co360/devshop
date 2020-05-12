const db = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'marcos',
        password: 'Kirk!234',
        database: 'devshop'
    }
})

/* O código abaixo ajuda saber como está sendo montado as queries */
db.on('query', query => {
    console.log('SQL: ' + query.sql)
})

const app = require('./app')(db)
const port = process.env.PORT || 3000

app.listen(port, err => {
    if (err) {
        console.log('Nãp foi possível iniciar o servidor')
    } else {
        console.log('DevShop iniciado...')
    }
})