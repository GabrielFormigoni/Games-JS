import { onSnake, expandSnake } from "./snake.js"
import { ramdomGridPosition } from "./grid.js"

let food = getRandomFoodPosition()
const EXPANSION_RATE = 3

export function update() {
    if(onSnake(food)){
        expandSnake(EXPANSION_RATE)
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard) {

    const foodElement = document.createElement('div')
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add('food')
    gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
    let foodPosition
    if(foodPosition == null || onSnake(foodPosition)){
        foodPosition = ramdomGridPosition()
    }
    return foodPosition
}