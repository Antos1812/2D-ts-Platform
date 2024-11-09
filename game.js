var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var platforms = [
    { x: 0, y: canvas.height - 100, width: canvas.width, height: 100 },
    { x: 200, y: canvas.height - 300, width: 200, height: 20 },
    { x: 600, y: canvas.height - 500, width: 200, height: 20 }
];
var player = {
    x: 50,
    y: canvas.height - 200,
    width: 50,
    height: 50,
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumping: false
};
var keys = {
    right: false,
    left: false,
    up: false
};
function update() {
    if (keys.right) {
        player.velocityX = player.speed;
    }
    else if (keys.left) {
        player.velocityX = -player.speed;
    }
    else {
        player.velocityX = 0;
    }
    if (keys.up && !player.jumping) {
        player.velocityY = -15;
        player.jumping = true;
    }
    player.velocityY += 0.5;
    player.x += player.velocityX;
    player.y += player.velocityY;
    platforms.forEach(function (platform) {
        if (player.x + player.width > platform.x && player.x < platform.x + platform.width &&
            player.y + player.height > platform.y && player.y + player.height <= platform.y + 10) {
            player.velocityY = 0;
            player.y = platform.y - player.height;
            player.jumping = false;
        }
    });
    if (player.x < 0) {
        player.x = 0;
    }
    else if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }
    if (player.y < 0) {
        player.y = 0;
    }
    else if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "FF6347";
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "008000";
    platforms.forEach(function (platform) {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
    requestAnimationFrame(update);
}
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        keys.right = true;
    }
    else if (event.key === "ArrowLeft") {
        keys.left = true;
    }
    else if (event.key === "Space") {
        keys.up = true;
    }
});
document.addEventListener("keyup", function (event) {
    if (event.key === "ArrowRight") {
        keys.right = false;
    }
    else if (event.key === "ArrowLeft") {
        keys.left = false;
    }
    else if (event.key === "ArrowUp") {
        keys.up = false;
    }
});
update();
"";