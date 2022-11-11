const width = 100
const height = 20
const ballDiameter = 20
const gridWidth = 560
const gridheight = 300


// User
const userStart = [230, 10]
let currentPosition = userStart

// Ball
const ballStart = [270, 50]
let ballPosition = ballStart

// Direções da bola
let xDirection = -2
let yDirection = 2

// Timer e score
let timerId
let score = 0

// Selectors
const grid = document.querySelector(".grid")
const scoreDisplay = document.querySelector("#score")

// Cria o bloco
class Block {

    constructor(x, y) {
        this.bottomLeft = [x, y]
        this.bottomRight = [x + width, y]
        this.topLeft = [x, y + height]
        this.topRight = [x + width, y + height]
    }
}

// Cria os blocos
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),

]


// Adiciona os blocos ao grid
function addblocks() {

    for( let i = 0; i < blocks.length; i++) {

        const block = document.createElement("div")
        block.classList.add("block")
        block.style.left = blocks[i].bottomLeft[0] + "px"
        block.style.bottom = blocks[i].bottomLeft[1] + "px"
        grid.appendChild(block)
    }

}
addblocks()


// Adiciona o usuário
const user = document.createElement("div")
user.classList.add("user")
drawUser()
grid.appendChild(user)


// Desenha o usuário e atualiza sua posição
function drawUser() {
    user.style.left = currentPosition[0] + "px"
    user.style.bottom = currentPosition[1] + "px"
}


// Movimento do usuário
function moveUser(e) {

    switch(e.key) {
        case "ArrowLeft":

            if(currentPosition[0] > 0){
                currentPosition[0] -= 10
                drawUser()
            }
            break;

        case "ArrowRight":

            if(currentPosition[0] < gridWidth - width){
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}
document.addEventListener("keydown", moveUser)


// Adiciona a bola
const ball = document.createElement("div")
ball.classList.add("ball")
drawBall()
grid.appendChild(ball)


// Desenha a bola e atualiza sua posição
function drawBall() {
    ball.style.left = ballPosition[0] + "px"
    ball.style.bottom = ballPosition[1] + "px"
}


// Movimento da bola
function moveBall() {
    ballPosition[0] += xDirection
    ballPosition[1] += yDirection
    drawBall()
    checkColision()
}

timerId = setInterval(moveBall, 30)


// Checa colisão da bola
function checkColision() {

    // Colisão com um bloco
    for (let i = 0; i < blocks.length; i++){
        if
        (
          (ballPosition[0] > blocks[i].bottomLeft[0] && ballPosition[0] < blocks[i].bottomRight[0]) &&
          ((ballPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballPosition[1] < blocks[i].topLeft[1]) 
        )
        {
          const allBlocks = Array.from(document.querySelectorAll('.block'))
          allBlocks[i].classList.remove('block')
          blocks.splice(i,1)
          changeDirection()   
          score++
          scoreDisplay.innerHTML = score
          if (blocks.length == 0) {
            scoreDisplay.innerHTML = 'You Win!'
            clearInterval(timerId)
            document.removeEventListener('keydown', moveUser)
          }
        }
    }

    // Colisão com o grid
    if(ballPosition[0] >= (gridWidth - ballDiameter) ||
       ballPosition[1] >= (gridheight - ballDiameter) ||
       ballPosition[0] <= 0) {
       changeDirection()
    }

    
    if
    (
      (ballPosition[0] > currentPosition[0] && ballPosition[0] < currentPosition[0] + width) &&
      (ballPosition[1] > currentPosition[1] && ballPosition[1] < currentPosition[1] + height) 
    )
    {
      changeDirection()
    }

    // Game over
    if (ballPosition[1] === 0) {
        clearInterval(timerId)
        scoreDisplay.textContent = "Você perdeu!!!"
    }
}

// Muda a direção da bola
function changeDirection() {

    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
      }
      if (xDirection === 2 && yDirection === -2) {
        xDirection = -2
        return
      }
      if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
      }
      if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
      }

}
