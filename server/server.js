require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const port = process.env.PORT || 5050

app.use(express.json())
app.use(cors())
const {register, login, score, getCurrentHighscore, getGlobalHighscore} = require('./controller')
const {seed} = require('./seed')
const { ppid } = require('process')

app.use(express.static(path.join(__dirname, '../client')))
// app.use(express.static(path.join(__dirname, '../server')))
app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../client/home.html'))
})
app.get('/styles', function(req,res){
    res.sendFile(path.join(__dirname, '../client/main.css'))
})
app.get('/game', function(req,res){
    res.sendFile(path.join(__dirname, '../client/game.html'))
})
app.get('/homejs', function(req,res){
    res.sendFile(path.join(__dirname, '../client/home.js'))
})
// app.get('/foodjs', function(req,res){
//     res.sendFile(path.join(__dirname, '../client/food.js'))
// })
// app.get('/gamejs', function(req,res){
//     res.sendFile(path.join(__dirname, '../client/grid.js'))
// })
// app.get('/gamejs', function(req,res){
//     res.sendFile(path.join(__dirname, '../client/input.js'))
// })
app.get('/gamejs', function(req,res){
    res.sendFile(path.join(__dirname, '../client/main.js'))
})
// app.get('/gamejs', function(req,res){
//     res.sendFile(path.join(__dirname, '../client/snake.js'))
// })



app.post('/seed', seed)
app.get('/currenthighscore', getCurrentHighscore)
app.get('/globalhighscore', getGlobalHighscore)
app.post('/register', register)
app.post('/login', login)
app.post('/score', score)


app.listen(port, () => {console.log(`server running on ${port}`)})
