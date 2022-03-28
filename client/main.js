import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, snakeBody} from './snake.js'
import { outsideGrid } from './grid.js'
import {update as updateFood, draw as drawFood} from './food.js'


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


const gameBoard = document.getElementById('game-board')
let lastRenderTime = 0
let gameOver = false
let main = (currentTime) => {
    if (gameOver) {
        let score = snakeBody
        sequelize.query(`
        select * from users where user_id = ${userId}
        `)
        if(dbRes[0].highscore < score){
            sequelize.query(`
            update users
            set highscore = ${score}
            where  user_id = ${userId}
            `)
        }
       if (confirm('You lost, Press ok to restart.')) {
        //    window.location = '/client/game.html'
        location.reload()
       }
       return
    }
    window.requestAnimationFrame(main)
    let secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if(secondsSinceLastRender < 1 / SNAKE_SPEED) return
    lastRenderTime = currentTime
    update()
    draw()
}
window.requestAnimationFrame(main)


function update () {
    gameBoard.innerHTML = ''
    updateSnake()
    updateFood()
    checkDeath()
}
function draw () {
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}