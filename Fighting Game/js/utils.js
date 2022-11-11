// Determina quando ocorre um ataque ocorre
function attackColision({ attack1, attack2 }) {
    return (
        attack1.attackBox.position.x + attack1.attackBox.width >= attack2.position.x &&
        attack1.attackBox.position.x <= attack2.position.x + attack2.width &&
        attack1.attackBox.position.y + attack1.attackBox.height >= attack2.position.y &&
        attack1.attackBox.position.y <= attack2.position.y + attack2.height)
}

// Determina quem venceu
function determineWinner({ player, enemy }) {
    document.querySelector(".tie").style.display = "flex"

    if(player.health === enemy.health) {
        document.querySelector(".tie").innerHTML = "Tie"
    }
    else if(player.health > enemy.health){
        document.querySelector(".tie").innerHTML = "Player 1 Wins"
    }
    else if(enemy.health > player.health){
        document.querySelector(".tie").innerHTML = "Player 2 Wins"
    }
}


// Diminui o timer
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector("#timer").innerHTML = timer
    }

    if(timer === 0) {
        determineWinner({ player, enemy })
    }
}