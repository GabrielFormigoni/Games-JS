const num = 20
const defaultNum = 0


const squares = document.querySelectorAll(".square")
const mole = document.querySelector(".mole")
const timeLeft = document.querySelector(".time-left")
const score = document.querySelector(".score")
const button = document.querySelector("#button")

score.textContent = defaultNum
timeLeft.textContent = num

let result = defaultNum
let hitPosition = defaultNum
let currentTime = num
let timer
let timerId = null

function randomSquare() {

    squares.forEach(square => {
        square.classList.remove("mole")
    })

    let getRandomSquare = squares[Math.floor(Math.random() * 9)]
    getRandomSquare.classList.add("mole")

    hitPosition = getRandomSquare.id
}

function moveMole() {

    button.removeEventListener("click", moveMole) 
    currentTime = num
    result = defaultNum
    timerId = setInterval(randomSquare, 500)
    timer = setInterval(countDown, 1000)
}

squares.forEach(square => {
    square.addEventListener("mousedown", () => {
        if(square.id === hitPosition) {
            result++
            score.textContent = result
            hitPosition = null
        }

    })
})

button.addEventListener("click", moveMole) 


function countDown() {
    currentTime--
    timeLeft.textContent = currentTime

    if(currentTime == 0) {
        clearInterval(timer)
        clearInterval(timerId)
        score.textContent = defaultNum
        timeLeft.textContent = num
        button.addEventListener("click", moveMole) 
        alert("O tempo acabou! Sua pontuação final é: " + result)
    }

}
