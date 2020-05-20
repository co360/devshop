const bcrypt = require('bcryptjs')

const generatePassHash = passwd => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(passwd, salt)
    return hash
}


const initialUser = db => async() => {
    const count = await db('users').count('id as total')
    
    if (count[0].total === 0) {
        const user = {
            name: 'Admin',
            email: 'marcosgray.dev@gmail.com',
            passwd: generatePassHash('1234'),
            email_checked: true,
            created: new Date(),
            updated: new Date(),
            roles: 'Admin, Financial, customer'
        }
        await db('users').insert(user)
    }
}

const login = db => async(email, passwd) => {
    const user = await db('users').select('*').where('email', email)
    if (user.length === 0) {
        throw new Error('Invalid user.')
    }
    if (!bcrypt.compareSync(passwd, user[0].passwd)) {
        throw new Error('Ops! Usuário inválido.')
    }
    return user[0]
}

module.exports = {
    initialUser,
    login
}