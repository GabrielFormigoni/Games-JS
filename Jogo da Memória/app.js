const cards = [
    {
        nome: "cheeseburger",
        img: "./images/cheeseburger.png"
    },
    {
        nome: "fries",
        img: "./images/fries.png"
    },
    {
        nome: "hotdog",
        img: "./images/hotdog.png"
    },
    {
        nome: "ice-cream",
        img: "./images/ice-cream.png"
    },
    {
        nome: "milkshake",
        img: "./images/milkshake.png"
    },
    {
        nome: "pizza",
        img: "./images/pizza.png"
    },
    {
        nome: "cheeseburger",
        img: "./images/cheeseburger.png"
    },
    {
        nome: "fries",
        img: "./images/fries.png"
    },
    {
        nome: "hotdog",
        img: "./images/hotdog.png"
    },
    {
        nome: "ice-cream",
        img: "./images/ice-cream.png"
    },
    {
        nome: "milkshake",
        img: "./images/milkshake.png"
    },
    {
        nome: "pizza",
        img: "./images/pizza.png"
    }
]

cards.sort(() => 0.5 - Math.random())

let i = 0;
const score = document.querySelector("#score")
const num = document.querySelector("#num")
const grid = document.querySelector("#grid")
let cardsChosen = []
let cardsChosenIds = []
const cardsWon = []


function createBoard() {
    cards.forEach((_card, index) => {
        const cardImg = document.createElement("img")
        cardImg.setAttribute("src", "images/blank.png")
        cardImg.setAttribute("data-id", index)
        cardImg.addEventListener("click", flipCard)
        grid.append(cardImg)
    });
}

function checkMatch() {

    num.innerHTML = i/2

    const cardsImgs = document.querySelectorAll("img")
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if(optionOneId == optionTwoId) {
        cardsImgs[optionOneId].setAttribute("src", "images/blank.png")
        cardsImgs[optionTwoId].setAttribute("src", "images/blank.png")
        alert("Você clicou na mesma carta!!!")
    }

    else if(cardsChosen[0] == cardsChosen[1]){
        alert("Você achou um par!!!")
        cardsImgs[optionOneId].setAttribute("src", "images/white.png")
        cardsImgs[optionTwoId].setAttribute("src", "images/white.png")
        cardsImgs[optionOneId].removeEventListener("click", flipCard)
        cardsImgs[optionTwoId].removeEventListener("click", flipCard)
        cardsWon.push(cardsChosen)
    }

    else {
        cardsImgs[optionOneId].setAttribute("src", "images/blank.png")
        cardsImgs[optionTwoId].setAttribute("src", "images/blank.png")
        alert("Tente novamente!!!")
    }
    cardsChosen = []
    cardsChosenIds = []

    if(cardsWon.length == cardsImgs.length/2){
        score.innerHTML = "Você ganhou!!!"
        window.location = '/Javascript/Games/Jogo da Memória'
    }

}

function flipCard(){
    const cardId = this.getAttribute("data-id")
    this.setAttribute("src", cards[cardId].img)
    cardsChosen.push(cards[cardId].nome)
    cardsChosenIds.push(cardId)
    if(cardsChosen.length == 2) {
        setTimeout(checkMatch, 500)
    }
    i++
}

createBoard()




