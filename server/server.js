require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const{SERVER_PORT} = process.env

const bcrypt = require('bcrypt')
app.use(express.json())
app.use(cors())
const {register, login} = require('./controller')
const {seed} = require('./seed')
app.use(express.static(path.join(__dirname, '../client')))

app.post('/seed', seed)
app.post('/register', register)
app.post('/login', login)

app.listen(SERVER_PORT, () => {console.log(`server running on ${SERVER_PORT}`)})
