require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

const sequelize = new Sequelize(process.env.CONNECTION_STRING,{
    dialect: 'postgres',
    dialectOptions: {
        ssl:{
            rejectUnauthorized: false
        }
    }
})
module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists users;

        create table users (
            user_id serial primary key,
            username varchar(100),
            password varchar(100),
            highscore integer,
            global_highscore integer
        );
        insert into users (global_highscore)
        values (0)
        `).then(()=> {
            console.log('DB seeded')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}