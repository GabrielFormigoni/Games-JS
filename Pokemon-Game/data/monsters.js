const monsters = {
  Emby: {
    position: {
      x: 450,
      y: 400,
    },
    image: {
      src: "./images/embySprite.png",
    },
    frames: { max: 4 },
    animate: true,
    name: "Emby",
    attacks: [attacks.Investida, attacks.Fireball],
  },
  Draggle: {
    position: {
      x: 1210,
      y: 100,
    },
    image: {
      src: "./images/draggleSprite.png",
    },
    frames: { max: 4 },
    animate: true,
    isEnemy: true,
    name: "Draggle",
    attacks: [attacks.Investida],
  },
};
