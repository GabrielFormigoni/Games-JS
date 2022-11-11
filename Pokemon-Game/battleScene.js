// Imagem do campo de batalha
const battleGroundImage = new Image();
battleGroundImage.src = "./images/battleBackground.png";

// Cria o campo de batalha
const battleGround = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  image: battleGroundImage,
});

let emby;
let draggle;
let renderedSprites;
let queue;

function initBattle() {
  document.querySelector(".user-interface").style.display = "block";
  document.querySelector(".dialogueBox").style.display = "none";
  document.querySelector(".enemy-health-left").style.width = "100%";
  document.querySelector(".player-health-left").style.width = "100%";
  document.querySelector(".attacksBox").replaceChildren();

  emby = new Monster(monsters.Emby);
  draggle = new Monster(monsters.Draggle);
  renderedSprites = [draggle, emby];
  queue = [];

  emby.attacks.forEach((attack) => {
    const attackButton = document.createElement("button");
    attackButton.innerHTML = attack.name;
    document.querySelector(".attacksBox").append(attackButton);
  });

  // Botôes de ataque
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      emby.attack({
        attack: selectedAttack,
        recipient: draggle,
        renderedSprites,
      });

      if (draggle.health <= 0) {
        queue.push(() => {
          draggle.faint();
        });
        queue.push(() => {
          gsap.to(".flash", {
            opacity: 1,
            onComplete: () => {
              cancelAnimationFrame(animateBattleId);
              animate();
              document.querySelector(".user-interface").style.display = "none";
              gsap.to(".flash", {
                opacity: 0,
              });
              battle.initiated = false;
              audio.Map.play();
            },
          });
        });
      }

      // Ataque inimigo
      const randomAttack =
        draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)];

      queue.push(() => {
        draggle.attack({
          attack: randomAttack,
          recipient: emby,
          renderedSprites,
        });

        if (emby.health <= 0) {
          queue.push(() => {
            emby.faint();
          });
          queue.push(() => {
            gsap.to(".flash", {
              opacity: 1,
              onComplete: () => {
                cancelAnimationFrame(animateBattleId);
                animate();
                document.querySelector(".user-interface").style.display =
                  "none";
                gsap.to(".flash", {
                  opacity: 0,
                });
                battle.initiated = false;
              },
            });
          });
        }
      });
    });

    button.addEventListener("mouseenter", (e) => {
      const selectedAttack = attacks[e.currentTarget.innerHTML];
      document.querySelector(".types").innerHTML = selectedAttack.type;
      document.querySelector(".types").style.color = selectedAttack.color;
    });
    button.addEventListener("mouseout", (e) => {
      document.querySelector(".types").innerHTML = "Tipo de ataque";
      document.querySelector(".types").style.color = "black";
    });
  });
}

// Animação da batalha
let animateBattleId;
function animateBattle() {
  animateBattleId = window.requestAnimationFrame(animateBattle);
  battleGround.draw();
  renderedSprites.forEach((sprite) => {
    sprite.draw();
  });
}

document.querySelector(".dialogueBox").addEventListener("click", (e) => {
  if (queue.length > 0) {
    queue[0]();
    queue.shift();
  } else e.currentTarget.style.display = "none";
});
