const player = document.getElementById("player");

let positionX = 350;
let speed = 4;

let movingLeft = false;
let movingRight = false;

// Key down
document.addEventListener("keydown", (e) => {
  if (e.key === "a" || e.key === "A") {
    movingLeft = true;
  }
  if (e.key === "d" || e.key === "D") {
    movingRight = true;
  }
});

// Key up
document.addEventListener("keyup", (e) => {
  if (e.key === "a" || e.key === "A") {
    movingLeft = false;
  }
  if (e.key === "d" || e.key === "D") {
    movingRight = false;
  }
});

// Game loop
function update() {
  if (movingLeft) {
    positionX -= speed;
    player.style.transform = "scaleX(1)"; // face left
  }

  if (movingRight) {
    positionX += speed;
    player.style.transform = "scaleX(-1)"; // face right
  }

  // Keep inside game area
  positionX = Math.max(0, Math.min(760, positionX));

  player.style.left = positionX + "px";

  requestAnimationFrame(update);
}

update();
