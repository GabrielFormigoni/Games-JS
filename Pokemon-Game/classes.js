// Classe que cria uma imagem
class Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    scale = 1,
  }) {
    this.position = position;
    this.image = new Image();
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
    this.image.src = image.src;
    this.animate = animate;
    this.sprites = sprites;
    this.opacity = 1;
    this.rotation = rotation;
    this.scale = scale;
  }

  draw() {
    c.save();
    c.globalAlpha = this.opacity;
    c.translate(
      this.position.x + this.width / 2,
      this.position.y + this.height / 2
    );
    c.rotate(this.rotation);
    c.translate(
      -this.position.x - this.width / 2,
      -this.position.y - this.height / 2
    );
    c.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
    c.restore();

    if (this.frames.max > 1) this.frames.elapsed++;

    if (!this.animate) return;

    if (this.frames.elapsed % 10 === 0) {
      if (this.frames.val < this.frames.max - 1) this.frames.val++;
      else this.frames.val = 0;
    }
  }
}

class Monster extends Sprite {
  constructor({
    position,
    image,
    frames = { max: 1, hold: 10 },
    sprites,
    animate = false,
    rotation = 0,
    isEnemy = false,
    name = "",
    attacks,
  }) {
    super({ position, image, frames, sprites, animate, rotation });
    this.health = 100;
    this.isEnemy = isEnemy;
    this.name = name;
    this.attacks = attacks;
  }

  faint() {
    const dialogue = document.querySelector(".dialogueBox");
    dialogue.style.display = "block";
    dialogue.innerHTML = this.name + " fainted!";

    gsap.to(this.position, {
      y: this.position.y + 20,
    });
    gsap.to(this, {
      opacity: 0,
    });
    audio.Battle.stop();
    audio.Victory.play();
  }

  attack({ attack, recipient, renderedSprites }) {
    const dialogue = document.querySelector(".dialogueBox");
    dialogue.style.display = "block";
    dialogue.innerHTML = this.name + " usou " + attack.name;

    let healthBar = ".enemy-health-left";
    if (this.isEnemy) healthBar = ".player-health-left";
    recipient.health -= attack.damage;

    let rotation = 1;
    if (this.isEnemy) rotation = -2.2;

    switch (attack.name) {
      // Investida
      case "Investida":
        const tl = gsap.timeline();

        let movementDistance = 40;
        if (this.isEnemy) movementDistance = -40;

        tl.to(this.position, {
          x: this.position.x - movementDistance,
        })
          .to(this.position, {
            x: this.position.x + movementDistance * 2,
            duration: 0.1,
            onComplete: () => {
              // Inimigo é atingido
              audio.TackleHit.play();
              gsap.to(healthBar, {
                width: recipient.health + "%",
              });
              gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.04,
              });

              gsap.to(recipient, {
                opacity: 0,
                yoyo: true,
                repeat: 5,
                duration: 0.04,
              });
            },
          })
          .to(this.position, {
            x: this.position.x,
          });
        break;

      // Bola de fogo
      case "Fireball":
        // Cria a Fireball
        const fireballImage = new Image();
        fireballImage.src = "./images/fireball.png";
        const fireball = new Sprite({
          position: {
            x: this.position.x,
            y: this.position.y,
          },
          image: fireballImage,
          frames: {
            max: 4,
            hold: 10,
          },
          animate: true,
          rotation,
        });
        renderedSprites.splice(1, 0, fireball);
        audio.InitFireball.play();
        gsap.to(fireball.position, {
          x: recipient.position.x,
          y: recipient.position.y,
          onComplete: () => {
            // Inimigo é atingido
            audio.FireballHit.play();
            gsap.to(healthBar, {
              width: recipient.health + "%",
            });
            gsap.to(recipient.position, {
              x: recipient.position.x + 10,
              yoyo: true,
              repeat: 5,
              duration: 0.04,
            });

            gsap.to(recipient, {
              opacity: 0,
              yoyo: true,
              repeat: 5,
              duration: 0.04,
            });
            renderedSprites.splice(1, 1);
          },
        });
        break;
    }
  }
}
// Classe que mostra as partes do mapa com alguma função específica
class Boundary {
  static width = 48;
  static height = 48;

  constructor({ position }) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    c.fillStyle = "rgba(255, 0, 0, 0)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
