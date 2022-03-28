const bcryptjs = require('bcryptjs')
require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
let userId = 

module.exports = {
    register: (req, res) => {
        console.log('registering user')
        const{password1, username} = req.body
        const passwordHash = bcryptjs.hashSync(password1)
        req.body.password1 = passwordHash
        let registerObj = req.body
        let secureObj = {...registerObj}
        delete secureObj.password1
        sequelize.query(`
        insert into users (username, password, highscore)
        values('${username}', '${passwordHash}', 0)
        `)
        .then(dbRes => res.status(200).send(dbRes[0]))
        
    },
    login: (req, res) => {
        const { username, password} = req.body
        sequelize.query(`
        select * from users
        `).then(dbRes => {
            for(let i = 0; i < dbRes[0].length; i++){
                if(dbRes[0][i].username === username) {
                    console.log(dbRes[0][i])
                    const realPassword = bcryptjs.compareSync(password, dbRes[0][i].password)
                    if(realPassword){
                        userId = dbRes[0][i].user_id
                        let returnedUser = {... dbRes[0][i]}
                        delete returnedUser.password1
                        res.status(200).send(returnedUser)
                    }else{
                        res.status(400).send('User not found')
                    }
                }
            }
        })
    }
}

