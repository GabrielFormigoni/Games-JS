canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Imagem do background
const image = new Image();
image.src = "./images/Pellet Town.png";

// Imagem do foreground
const foregroundImage = new Image();
foregroundImage.src = "./images/foreground.png";

// Imagem do player pra baixo
const playerDownImage = new Image();
playerDownImage.src = "./images/playerDown.png";

// Imagem do player pra cima
const playerUpImage = new Image();
playerUpImage.src = "./images/playerUp.png";

// Imagem do player pra esquerda
const playerLeftImage = new Image();
playerLeftImage.src = "./images/playerLeft.png";

// Imagem do player pra direita
const playerRightImage = new Image();
playerRightImage.src = "./images/playerRight.png";

const offset = {
  x: -485,
  y: -550,
};

// Cria o Background
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

// Cria os objetos que o player fica atrás ao renderizar
const foreground = new Sprite({
  position: {
    x: offset.x + 432,
    y: offset.y + 145,
  },
  image: foregroundImage,
});

// Cria o player
const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / 4 / 2,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerDownImage,
  frames: { max: 4 },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage,
  },
});

// Cria e mapeia os locais limites do player
const collisionMap = [];
const boundaries = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionMap.push(collisions.slice(i, i + 70));
}
collisionMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      boundaries.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

// Cria e mapeia as áreas onde se encontra os pokemons
const battleZonesMap = [];
const battleZones = [];
for (let i = 0; i < battleZonesData.length; i += 70) {
  battleZonesMap.push(battleZonesData.slice(i, i + 70));
}
battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 1025)
      battleZones.push(
        new Boundary({
          position: {
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
  });
});

// Movimento do player
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
};
let lastKey = "";
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;

    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;

    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;

    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
  }
});
document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      keys.a.pressed = false;
      break;

    case "d":
      keys.d.pressed = false;
      break;

    case "w":
      keys.w.pressed = false;
      break;

    case "s":
      keys.s.pressed = false;
      break;
  }
});

// Oq se move junto com o player
const movables = [background, foreground, ...boundaries, ...battleZones];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y + rectangle1.height / 2 <=
      rectangle2.position.y + rectangle2.height
  );
}

const battle = {
  initiated: false,
};

// Animação
function animate() {
  const animationId = window.requestAnimationFrame(animate);
  // Desenha as imagens
  background.draw();
  boundaries.forEach((boundary) => {
    boundary.draw();
  });
  battleZones.forEach((battleZone) => {
    battleZone.draw();
  });
  player.draw();
  foreground.draw();

  let moving = true;
  player.animate = false;

  if (battle.initiated) return;

  // Inicia o combate
  if (keys.a.pressed || keys.d.pressed || keys.s.pressed || keys.w.pressed) {
    for (let i = 0; i < battleZones.length; i++) {
      let battleZone = battleZones[i];
      const overllapingArea =
        (Math.min(
          player.position.x + player.width,
          battleZone.position.x + battleZone.width
        ) -
          Math.max(player.position.x, battleZone.position.x)) *
        (Math.min(
          player.position.y + player.height,
          battleZone.position.y + battleZone.height
        ) -
          Math.max(player.position.y, battleZone.position.y));
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: battleZone,
        })
      ) {
        if (
          overllapingArea > (player.width * player.height) / 2 &&
          Math.random() < 0.03
        ) {
          // Cancela a animação atual
          window.cancelAnimationFrame(animationId);

          audio.Map.stop();
          audio.InitBattle.play();
          audio.Battle.play();

          battle.initiated = true;

          // Faz a tela dar o flash
          gsap.to(".flash", {
            opacity: 1,
            repeat: 3,
            yoyo: true,
            duration: 0.4,
            onComplete() {
              gsap.to(".flash", {
                opacity: 1,
                duration: 0.4,
                onComplete() {
                  // Animação da batalha
                  initBattle();
                  animateBattle();
                  gsap.to(".flash", {
                    opacity: 0,
                    duration: 0.4,
                  });
                },
              });
            },
          });
        }
        break;
      }
    }
  }

  // Movimento do player
  if (keys.a.pressed === true && lastKey === "a") {
    player.image = player.sprites.left;
    player.animate = true;

    // Detecta colisão do player com as partes do mapa que não se pode andar
    for (let i = 0; i < boundaries.length; i++) {
      let boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x += 3;
      });
  } else if (keys.d.pressed === true && lastKey === "d") {
    player.image = player.sprites.right;
    player.animate = true;

    // Detecta colisão do player com as partes do mapa que não se pode andar
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 3,
              y: boundary.position.y,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.x -= 3;
      });
  } else if (keys.w.pressed === true && lastKey === "w") {
    player.image = player.sprites.up;
    player.animate = true;

    // Detecta colisão do player com as partes do mapa que não se pode andar
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y += 3;
      });
  } else if (keys.s.pressed === true && lastKey === "s") {
    player.image = player.sprites.down;
    player.animate = true;

    // Detecta colisão do player com as partes do mapa que não se pode andar
    for (let i = 0; i < boundaries.length; i++) {
      const boundary = boundaries[i];
      if (
        rectangularCollision({
          rectangle1: player,
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 3,
            },
          },
        })
      ) {
        moving = false;
        break;
      }
    }
    if (moving)
      movables.forEach((movable) => {
        movable.position.y -= 3;
      });
  }
}

animate();

let clicked = false;
document.addEventListener("click", () => {
  if (!clicked) {
    audio.Map.play();
    clicked = true;
  }
});
