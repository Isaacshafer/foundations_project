import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection} from './snake.js'
import { outsideGrid } from './grid.js'
import {update as updateFood, draw as drawFood} from './food.js'

const gameBoard = document.getElementById('game-board')
let lastRenderTime = 0
let gameOver = false
let main = (currentTime) => {
    if (gameOver) {
       if (confirm('You lost, Press ok to restart.')) {
           window.location = '/client/game.html'
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