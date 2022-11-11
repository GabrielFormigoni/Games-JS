const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7
let timer = 60
let timerId

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: "./assets/background.png"
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: "./assets/shop.png",
    scale: 2.75,
    framesMax: 6
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    imageSrc: "./assets/samuraiMack/Idle.png",
    scale: 2.5,
    framesMax: 8,
    offset: {
        x: 215,
        y: 157
    },
    sprites: {
        idle: {
            imageSrc: "./assets/samuraiMack/Idle.png",
            framesMax: 8
        },
        run: {
            imageSrc: "./assets/samuraiMack/Run.png",
            framesMax: 8
        },
        jump: {
            imageSrc: "./assets/samuraiMack/Jump.png",
            framesMax: 2
        },
        fall: {
            imageSrc: "./assets/samuraiMack/Fall.png",
            framesMax: 2
        },
        attack1: {
            imageSrc: "./assets/samuraiMack/Attack1.png",
            framesMax: 6
        },
        takeHit: {
            imageSrc: "./assets/samuraiMack/Take Hit.png",
            framesMax: 4
        },
        death: {
            imageSrc: "./assets/samuraiMack/Death.png",
            framesMax: 6
        }
    },
    attackBox: {
        offset: {
            x: 90,
            y: 50
        },
        width: 170,
        height: 50
    }
})

const enemy = new Fighter({
    position: {
        x: canvas.width - 50,
        y: 0
    },
    velocity: {
        x: 0,
        y: 10
    },
    imageSrc: "./assets/kenji/Idle.png",
    scale: 2.5,
    framesMax: 4,
    offset: {
        x: 215,
        y: 167
    },
    sprites: {
        idle: {
            imageSrc: "./assets/kenji/Idle.png",
            framesMax: 4
        },
        run: {
            imageSrc: "./assets/kenji/Run.png",
            framesMax: 8
        },
        jump: {
            imageSrc: "./assets/kenji/Jump.png",
            framesMax: 2
        },
        fall: {
            imageSrc: "./assets/kenji/Fall.png",
            framesMax: 2
        },
        attack1: {
            imageSrc: "./assets/kenji/Attack1.png",
            framesMax: 4
        },
        takeHit: {
            imageSrc: "./assets/kenji/Take Hit.png",
            framesMax: 3
        },
        death: {
            imageSrc: "./assets/kenji/Death.png",
            framesMax: 7
        }
    },
    attackBox: {
        offset: {
            x: -170,
            y: 50
        },
        width: 150,
        height: 50
    }
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    }
}


// Comandos quando se clica no botão pra mover
document.addEventListener("keydown", (event) => {

    if(!player.dead){
        switch(event.key) {
            // Movimentos do player
            case "a":
                player.lastKey = "a"
                keys.a.pressed = true
                break

            case "d":
                player.lastKey = "d"
                keys.d.pressed = true
                break

            case "w":
                if(player.velocity.y === 0){
                    player.velocity.y = -20
                }
                break

            case " ":
                player.attack()
                break
        }
    }

    if(!enemy.dead){
        switch(event.key) {
            case "ArrowLeft":
                enemy.lastKey = "ArrowLeft"
                keys.ArrowLeft.pressed = true
                break

            case "ArrowRight":
                enemy.lastKey = "ArrowRight"
                keys.ArrowRight.pressed = true
                break
            case "ArrowUp":
                if(enemy.velocity.y === 0){
                    enemy.velocity.y = -20
                }
                break
            case "ArrowDown":
                enemy.attack()
                break
        }
    }
})

// Comandos quando se solta o botão pra mover
document.addEventListener("keyup", (event) => {

    switch(event.key) {
        // Movimento do player
        case "a":
            keys.a.pressed = false
            break

        case "d":
            keys.d.pressed = false
            break
    }

    switch(event.key) {
        // Movimento do inimigo
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false
            break

        case "ArrowRight":
            keys.ArrowRight.pressed = false
            break
    }
})

decreaseTimer()

// Função que atualiza as mudanças a todo momento
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    c.fillStyle = "rgba(255, 255, 255, 0.15)"
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0

    // Player movement
    if(keys.a.pressed && player.lastKey == "a" && player.position.x >= 0) {
        player.switchSprite("run")
        player.velocity.x = -5
    }
    else if(keys.d.pressed && player.lastKey == "d" && player.position.x + player.width <= canvas.width) {
        player.switchSprite("run")
        player.velocity.x = 5
    }
    else {
        player.switchSprite("idle")
    }

    if(player.velocity.y < 0) {
        player.switchSprite("jump")
    }
    else if(player.velocity.y > 0) {
        player.switchSprite("fall")
    }

    // Enemy movement
    if(keys.ArrowLeft.pressed && enemy.lastKey == "ArrowLeft" && enemy.position.x >= 0) {
        enemy.switchSprite("run")
        enemy.velocity.x = -5
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey == "ArrowRight" && enemy.position.x + enemy.width <= canvas.width) {
        enemy.switchSprite("run")
        enemy.velocity.x = 5
    }
    else {
        enemy.switchSprite("idle")
    }

    if(enemy.velocity.y < 0) {
        enemy.switchSprite("jump")
    }
    else if(enemy.velocity.y > 0) {
        enemy.switchSprite("fall")
    }


    // Detecta os ataques do player
    if (attackColision({
        attack1: player, 
        attack2: enemy
    }) && 
        player.isAttacking &&
        player.framesCurrent === 4
        ){
            enemy.takeHit()
            player.isAttacking = false
            gsap.to(".enemy-cont",{
                width: enemy.health + "%"
            })
    }


    // Se os ataques do player errarem
    if(player.isAttacking && player.framesCurrent === 4) {
        player.isAttacking = false
    }


    // Detecta os ataques do inimigo
    if (attackColision({
        attack1: enemy, 
        attack2: player
    })  && 
        enemy.isAttacking &&
        enemy.framesCurrent === 2){
            player.takeHit()
            enemy.isAttacking = false
            gsap.to(".player-cont",{
                width: player.health + "%"
            })
    }

    // Se os ataques do inimigo errarem
    if(enemy.isAttacking && enemy.framesCurrent === 2) {
        enemy.isAttacking = false
    }


    if (player.health == 0 || enemy.health == 0) {
        determineWinner({ player, enemy })
        clearTimeout(timerId)
    }

}

animate()