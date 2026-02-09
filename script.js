const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let love = 0;
const loveFill = document.getElementById("love-fill");

const basket = { x: canvas.width / 2 - 40, y: canvas.height - 40, width: 80, height: 20 };
const hearts = [];

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && basket.x > 0) basket.x -= 20;
    if (e.key === "ArrowRight" && basket.x < canvas.width - basket.width) basket.x += 20;
});

function spawnHeart() {
    hearts.push({ x: Math.random() * (canvas.width - 20), y: 0, size: 20 });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw basket
    ctx.fillStyle = "brown";
    ctx.fillRect(basket.x, basket.y, basket.width, basket.height);

    // Draw and move hearts
    ctx.font = "20px serif";
    hearts.forEach((heart, i) => {
        ctx.fillText("❤️", heart.x, heart.y);
        heart.y += 5;

        // Collision detection
        if (
            heart.y + heart.size >= basket.y &&
            heart.x >= basket.x &&
            heart.x <= basket.x + basket.width
        ) {
            love += 10;
            loveFill.style.width = love + "%";
            hearts.splice(i, 1);
        }

        // Remove missed hearts
        if (heart.y > canvas.height) {
            hearts.splice(i, 1);
        }
    });

    // Win condition
    if (love >= 100) {
        proposalScreen.classList.remove("hidden");
        clearInterval(gameLoop);
        clearInterval(spawnLoop);
    }
}

let gameLoop, spawnLoop;
function startGame() {
    love = 0;
    loveFill.style.width = "0%";
    hearts.length = 0;

    gameLoop = setInterval(updateGame, 50);
    spawnLoop = setInterval(spawnHeart, 1000);
}


