const score = document.querySelector("#score")
const timeLeftDisplay = document.querySelector("#time-left")
const btn = document.querySelector("#btn")
const squares = document.querySelectorAll(".grid div")
const logsLeft = document.querySelectorAll(".log-left")
const logsRight = document.querySelectorAll(".log-right")
const carsLeft = document.querySelectorAll(".car-left")
const carsRight = document.querySelectorAll(".car-right")

let currentIndex = 76
let timerId
let outcomeId
let currentTime = 20


// Move o sapo
function moveFrog(e) {

    squares[currentIndex].classList.remove("frog")

    switch(e.key) {
        case "ArrowLeft":
            
            if(currentIndex % 9 !== 0){
                currentIndex--
            }
            break;

        case "ArrowRight":
            if(currentIndex % 9 !== 8){
                currentIndex++
            }
            break;

        case "ArrowUp":
            if(currentIndex >= 9){
                currentIndex -= 9
            }
            break;

        case "ArrowDown":
            if(currentIndex <= 71){
                currentIndex += 9
            }
            break;
    }

    squares[currentIndex].classList.add("frog")
}

// Faz todos os troncos e carros se moverem automaticamente a cada intervalo de tempo
function autoMove() {

    currentTime--
    timeLeftDisplay.textContent = currentTime
    logsLeft.forEach(logLeft => moveLogLeft(logLeft))
    logsRight.forEach(logRight => moveLogRight(logRight))
    carsLeft.forEach(carLeft => moveCarLeft(carLeft))
    carsRight.forEach(carRight => moveCarRight(carRight))
}

// Checa se você ganhou ou perdeu
function checkOutComes() {
    lose()
    win()
}
// Move os troncos pra esquerda
function moveLogLeft(logLeft) {
    switch(true) {

        case logLeft.classList.contains('l1') :
            logLeft.classList.remove('l1')
            logLeft.classList.add('l2')
            break

        case logLeft.classList.contains('l2') :
            logLeft.classList.remove('l2')
            logLeft.classList.add('l3')
            break

        case logLeft.classList.contains('l3') :
            logLeft.classList.remove('l3')
            logLeft.classList.add('l4')
            break

        case logLeft.classList.contains('l4') :
            logLeft.classList.remove('l4')
            logLeft.classList.add('l5')
            break

        case logLeft.classList.contains('l5') :
            logLeft.classList.remove('l5')
            logLeft.classList.add('l1')
            break

    }
}

// Move os troncos pra direita
function moveLogRight(logRight) {

    switch(true) {
        case logRight.classList.contains("l1"):
            logRight.classList.remove("l1")
            logRight.classList.add("l5")
            break

        case logRight.classList.contains("l2"):
        logRight.classList.remove("l2")
        logRight.classList.add("l1")
        break

        case logRight.classList.contains("l3"):
        logRight.classList.remove("l3")
        logRight.classList.add("l2")
        break

        case logRight.classList.contains("l4"):
        logRight.classList.remove("l4")
        logRight.classList.add("l3")
        break

        case logRight.classList.contains("l5"):
        logRight.classList.remove("l5")
        logRight.classList.add("l4")
        break

    }
}

// Move os carros pra esquerda
function moveCarLeft(carLeft) {
    switch(true){
        case carLeft.classList.contains("c1"):
            carLeft.classList.remove("c1")
            carLeft.classList.add("c2")
            break

            case carLeft.classList.contains("c2"):
            carLeft.classList.remove("c2")
            carLeft.classList.add("c3")
            break

            case carLeft.classList.contains("c3"):
            carLeft.classList.remove("c3")
            carLeft.classList.add("c1")
            break
    }
}


// Move os carros pra direita
function moveCarRight(carRight) {
    switch(true){
        case carRight.classList.contains("c1"):
            carRight.classList.remove("c1")
            carRight.classList.add("c3")
            break

            case carRight.classList.contains("c2"):
            carRight.classList.remove("c2")
            carRight.classList.add("c1")
            break

            case carRight.classList.contains("c3"):
            carRight.classList.remove("c3")
            carRight.classList.add("c2")
            break
    }
}

// Checa se o sapo bateu no carro ou caiu no rio, ou seja, se vocÊ perdeu o jogo
function lose() {

    if(squares[currentIndex].classList.contains("c1") ||
       squares[currentIndex].classList.contains("l4") ||
       squares[currentIndex].classList.contains("l5")){

            score.textContent = "Você perdeu"
            squares[currentIndex].classList.remove("frog")
            clearInterval(timerId)
            clearInterval(outcomeId)
            document.removeEventListener("keyup", moveFrog)
    }
}

// Checa se o sapo chegou ao destino final sem morrer
function win() {
    if(squares[currentIndex].classList.contains("ending-block")) {
        score.display.textContent = "Você ganhou"
        squares[currentIndex].classList.remove("frog")
        clearInterval(timerId)
        clearInterval(outcomeId)
        document.removeEventListener("keyup", moveFrog)
    }
}


btn.addEventListener("click", () => {
    if(timerId) {
        clearInterval(timerId)
        clearInterval(outcomeId)
        outcomeId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    } else {
        timerId = setInterval(autoMove, 1000)
        outcomeId = setInterval(checkOutComes, 50)
        document.addEventListener('keyup', moveFrog)
    }
    })