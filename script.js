console.log("NEW VERSION LOADED");

const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

const platformHeight = 120;

let playerX = 380;
let score = 0;

let keys = {};
let enemies = [];

// Track direction
let facing = "right";

// Key controls
document.addEventListener("keydown", (e) => {
  keys[e.key.toLowerCase()] = true;

  if (e.key.toLowerCase() === "j") {
    attack();
  }
});

document.addEventListener("keyup", (e) => {
  keys[e.key.toLowerCase()] = false;
});

// Move player
function movePlayer() {
  if (keys["a"]) {
    playerX -= 5;
    facing = "left";
  }

  if (keys["d"]) {
    playerX += 5;
    facing = "right";
  }

  // Apply direction visually
  if (facing === "left") {
    player.style.transform = "scaleX(1)";
  } else {
    player.style.transform = "scaleX(-1)";
  }

  // boundaries
  if (playerX < 0) playerX = 0;
  if (playerX > 760) playerX = 760;

  player.style.left = playerX + "px";

  const groundY = game.clientHeight - platformHeight - player.offsetHeight;
  player.style.top = groundY + "px";
}

// Spawn enemies
function spawnEnemy() {
  const enemy = document.createElement("div");
  enemy.classList.add("enemy");
  enemy.textContent = "🚓";

  let x = Math.random() * 760;
  let y = 0;
  let speed = 1 + Math.random() * 1.5;

  enemy.style.left = x + "px";
  game.appendChild(enemy);

  enemies.push({ el: enemy, x, y, speed, facing: "left" });
}

// Update enemies
function updateEnemies() {
  enemies.forEach((enemy) => {
    
    // correct ground level (same as player)
    const platformY = game.clientHeight - 120;
    const groundY = platformY - enemy.el.offsetHeight;

    // fall down until reaching ground
    if (enemy.y < groundY) {
      enemy.y += enemy.speed * 2;

      // snap exactly to ground
      if (enemy.y > groundY) {
        enemy.y = groundY;
      }
    } else {
      
      if (enemy.x < playerX) {
        enemy.x += enemy.speed;
        enemy.facing = "right";
      }

      if (enemy.x > playerX) {
        enemy.x -= enemy.speed;
        enemy.facing = "left";
      }
    
    }

    if (enemy.x < -50 || enemy.x > 850) {
      enemy.el.remove();
      enemies.splice(enemies.indexOf(enemy), 1);
    }
    
    if (enemy.facing === "left") {
      enemy.el.style.transform = "scaleX(1)";
    } else {
      enemy.el.style.transform = "scaleX(-1)";
    }
    
    enemy.el.style.top = enemy.y + "px";
    enemy.el.style.left = enemy.x + "px";
  });
}

// Attack
function attack() {
  enemies.forEach((enemy, index) => {
    const distance = Math.abs(enemy.x - playerX);

    if (distance < 60 && enemy.y > 300) {
      enemy.el.remove();
      enemies.splice(index, 1);

      score++;
      scoreDisplay.textContent = score;
    }
  });
}

// Game loop
function gameLoop() {
  movePlayer();
  updateEnemies();
  requestAnimationFrame(gameLoop);
}

// Spawn enemies every second
setInterval(spawnEnemy, 1000);

// Start game
gameLoop();
