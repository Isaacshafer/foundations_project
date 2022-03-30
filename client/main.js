import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, snakeBody} from './snake.js'
import { outsideGrid } from './grid.js'
import {update as updateFood, draw as drawFood} from './food.js'
// import axios from 'axios's

axios.get('/currenthighscore').then(res => {
    console.log(res.data)
    let highscore = res.data
    document.getElementById('highscore').textContent = `High score: ${highscore}`
})
axios.get('/globalhighscore').then(res => {
    console.log(res.data)
    let globalHighscore = res.data.globalHighscore
    let user = res.data.user
    document.getElementById(`global-highscore`).textContent = `All time high score: ${user}: ${globalHighscore}`

})


const gameBoard = document.getElementById('game-board')
let lastRenderTime = 0
let gameOver = false
let main = (currentTime) => {
   
    if (gameOver) {
        let bodyObj = {
            score: snakeBody.length
        }
        axios.post('/score', bodyObj)
        
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


// https://github.com/asdvalenzuela/moodmap