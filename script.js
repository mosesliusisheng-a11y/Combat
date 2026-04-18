const player = document.getElementById("player");
const platform = document.getElementById("platform");

let positionX = 350;
let speed = 4;

// Floors
const platformY = 90;
const groundY = 10;

// State
let currentFloor = "platform"; // "platform" or "ground"

let movingLeft = false;
let movingRight = false;

// Get platform horizontal range
function getPlatformBounds() {
  const gameRect = document.getElementById("game").getBoundingClientRect();
  const platformRect = platform.getBoundingClientRect();

  return {
    left: platformRect.left - gameRect.left,
    right: platformRect.right - gameRect.left
  };
}

// Key handling
document.addEventListener("keydown", (e) => {
  if (e.key === "a" || e.key === "A") movingLeft = true;
  if (e.key === "d" || e.key === "D") movingRight = true;

  if (e.key === "s" || e.key === "S") {
    currentFloor = "ground";
  }

  if (e.key === "w" || e.key === "W") {
    const gameRect = document.getElementById("game").getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    const platformRect = platform.getBoundingClientRect();

    const playerCenter = playerRect.left + playerRect.width / 2 - gameRect.left;
    const platformLeft = platformRect.left - gameRect.left;
    const platformRight = platformRect.right - gameRect.left;

    if (
      currentFloor === "ground" &&
      playerCenter > platformLeft &&
      playerCenter < platformRight
    ) {
      currentFloor = "platform";
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "a" || e.key === "A") movingLeft = false;
  if (e.key === "d" || e.key === "D") movingRight = false;
});

// Game loop
function update() {
  if (movingLeft) {
    positionX -= speed;
    player.style.transform = "scaleX(1)";
  }

  if (movingRight) {
    positionX += speed;
    player.style.transform = "scaleX(-1)";
  }

  // Stay inside game
  positionX = Math.max(0, Math.min(760, positionX));

  // Check if walking off platform → fall to ground
  if (currentFloor === "platform") {
    const gameRect = document.getElementById("game").getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    const platformRect = platform.getBoundingClientRect();

    const playerCenter = playerRect.left + playerRect.width / 2 - gameRect.left;
    const platformLeft = platformRect.left - gameRect.left;
    const platformRight = platformRect.right - gameRect.left;

    if (playerCenter < platformLeft || playerCenter > platformRight) {
      currentFloor = "ground";
    }
  }

  // Apply vertical position
  if (currentFloor === "platform") {
    player.style.bottom = platformY + "px";
  } else {
    player.style.bottom = groundY + "px";
  }

  player.style.left = positionX + "px";

  requestAnimationFrame(update);
}

update();
