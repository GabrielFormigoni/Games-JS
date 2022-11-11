const computerChoiceDisplay = document.getElementById("computerChoiceDisplay")
const userChoiceDisplay = document.getElementById("userChoiceDisplay")
const resultDisplay = document.getElementById("resultDisplay")
const choices = document.querySelectorAll("button")

let userChoice
let computerChoice
let result

function generateComputerChoice() {
    const randomChoice = Math.floor(Math.random() * choices.length + 1)

    if(randomChoice === 1){
        computerChoice = "Pedra"
    }

    if(randomChoice === 2){
        computerChoice = "Papel"
    }
    if(randomChoice ===3){
        computerChoice = "Tesoura"
    }
    computerChoiceDisplay.innerHTML = computerChoice 
}

function generateResult() {

    if(computerChoice === userChoice) {
        result = "Empate!"
    }

    if(computerChoice == "Pedra" && userChoice == "Tesoura"){
        result = "Você perdeu!"
    }

    if(computerChoice == "Pedra" && userChoice == "Papel"){
        result = "Você ganhou!"
    }

    if(computerChoice == "Papel" && userChoice == "Tesoura"){
        result = "Você ganhou!"
    }

    if(computerChoice == "Papel" && userChoice == "Pedra"){
        result = "Você perdeu!"
    }

    if(computerChoice == "Tesoura" && userChoice == "Papel"){
        result = "Você perdeu!"
    }

    if(computerChoice == "Tesoura" && userChoice == "Pedra"){
        result = "Você ganhou!"
    }

    resultDisplay.innerHTML = result
}
choices.forEach(choice => choice.addEventListener('click', (e) => {

    userChoice = e.target.id
    userChoiceDisplay.innerHTML = userChoice

    generateComputerChoice()
    generateResult()
}))


