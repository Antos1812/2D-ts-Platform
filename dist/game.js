var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = 2000;
var platforms = [
    { x: 0, y: canvas.height - 120, width: canvas.width, height: 100 },
    { x: 200, y: canvas.height - 300, width: 200, height: 20 },
    { x: 600, y: canvas.height - 400, width: 200, height: 20 },
    { x: 200, y: canvas.height - 550, width: 200, height: 20 },
    { x: 600, y: canvas.height - 650, width: 200, height: 20 },
    { x: 200, y: canvas.height - 750, width: 200, height: 20 },
    { x: 600, y: canvas.height - 850, width: 200, height: 20 },
    { x: 200, y: canvas.height - 950, width: 200, height: 20 },
    { x: 600, y: canvas.height - 1050, width: 200, height: 20 }
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
    up: false,
    spacePressed: false,
};
var maxFallSpeed = 10;
var grav = 0.55;
var jStr = -15;
var frct = 0.9;
function update() {
    if (keys.right) {
        player.velocityX = player.speed;
    }
    else if (keys.left) {
        player.velocityX = -player.speed;
    }
    else {
        player.velocityX *= frct;
    }
    // Jumping
    if (keys.up && !player.jumping) {
        player.velocityY = jStr;
        player.jumping = true;
    }
    //Gravity
    player.velocityY += grav;
    player.velocityY = Math.min(player.velocityY, maxFallSpeed);
    player.x += player.velocityX;
    player.y += player.velocityY;
    //Collision
    platforms.forEach(function (platform) {
        if (player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            player.y + player.height > platform.y &&
            player.y + player.height <= platform.y + 10) {
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
    //Player and platforms
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0c4014"; //Player
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillStyle = "#000000"; //Platforms
    platforms.forEach(function (platform) {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
    requestAnimationFrame(update);
}
document.addEventListener("keydown", function (event) {
    if (event.key === "d") {
        keys.right = true;
    }
    else if (event.key === "a") {
        keys.left = true;
    }
    else if (event.key === " " && !keys.spacePressed) {
        keys.up = true;
        keys.spacePressed = true;
    }
    event.preventDefault();
});
document.addEventListener("keyup", function (event) {
    if (event.key === "d") {
        keys.right = false;
    }
    else if (event.key === "a") {
        keys.left = false;
    }
    else if (event.key === " ") {
        keys.up = false;
        keys.spacePressed = false;
    }
    event.preventDefault();
});
update();
