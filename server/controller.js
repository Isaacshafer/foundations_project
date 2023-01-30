require('dotenv').config()
const bcryptjs = require('bcryptjs')
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

// console.log(CONNECTION_STRING)

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
let userId = null
let currentHighscore = null
let globalHighscore = null
sequelize.query(`
select global_highscore from users
`).then(dbRes => {
    globalHighscore = dbRes[0][0].global_highscore
})
    


module.exports = {
    register: (req, res) => {
        const{password1, username} = req.body
        sequelize.query(`
        select * from users
        `).then(dbRes => {
            for(let i = 0; i < dbRes[0].length; i++){
                if(dbRes[0][i].username === username){
                    res.status(201).send('Username unavailable')
                    return
                }
            }
            const passwordHash = bcryptjs.hashSync(password1)
            req.body.password1 = passwordHash
            let registerObj = req.body
            let secureObj = {...registerObj}
            delete secureObj.password1
            sequelize.query(`
            insert into users (username, password, highscore, global_highscore)
            values('${username}', '${passwordHash}', 0, ${globalHighscore})
            `)
            .then(dbRes => res.status(200).send(dbRes[0]))
        })
        
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
                        currentHighscore = dbRes[0][i].highscore
                        let returnedUser = {... dbRes[0][i]}
                        delete returnedUser.password1
                        res.status(200).send(returnedUser)
                    }else{
                        res.status(400).send('User not found')
                    }
                }
            }
        })
    },
    score: (req, res) => {
        let score = req.body.score
        if(score > currentHighscore){
            currentHighscore = score
            sequelize.query(`
            update users
            set highscore = ${score}
            where user_id = ${userId}
            `)
        }
        if(score > globalHighscore){
            globalHighscore = score
            sequelize.query(`
            update users
            set global_highscore = ${score}
            `)
        }
    },
    getCurrentHighscore: (req, res) => {

        res.status(200).send(`${currentHighscore}`)
    },
    getGlobalHighscore: (req, res) => {
        sequelize.query(`
        select username from users where highscore = global_highscore
        `).then(dbRes => {
            console.log(dbRes)
            let user = dbRes[0][0].username
        
        let returnObj = {
            user,
            globalHighscore
        }
        res.status(200).send(returnObj)
        })
    }
}

