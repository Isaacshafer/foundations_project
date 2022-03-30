require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
// const{SERVER_PORT} = process.env

app.use(express.json())
app.use(cors())
const {register, login, score, getCurrentHighscore, getGlobalHighscore} = require('./controller')
const {seed} = require('./seed')

app.use(express.static(path.join(__dirname, '../client')))

app.post('/seed', seed)
app.get('/currenthighscore', getCurrentHighscore)
app.get('/globalhighscore', getGlobalHighscore)
app.post('/register', register)
app.post('/login', login)
app.post('/score', score)

const port = process.env.PORT || 5050

app.listen(port, () => {console.log(`server running on ${port}`)})
