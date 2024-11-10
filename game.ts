const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

interface Player {
    x: number;
    y: number;
    width: number;
    height: number;
    velocityX: number;
    velocityY: number;
    speed: number;
    jumping: boolean;
}

const platforms = [
    { x: 0, y: canvas.height - 120, width: canvas.width, height: 100 },
    { x: 200, y: canvas.height - 300, width: 200, height: 20 },
    { x: 600, y: canvas.height - 400, width: 200, height: 20 }
];

const player: Player = {
    x: 50,
    y: canvas.height - 200,
    width: 50,
    height: 50,
    velocityX: 0,
    velocityY: 0,
    speed: 5,
    jumping: false
};

const keys = {
    right: false,
    left: false,
    up: false,
    spacePressed: false,
    shift: false
};

const maxFallSpeed = 10;

function update() {
    
    if (keys.right) {
        player.velocityX = player.speed;
    } else if (keys.left) {
        player.velocityX = -player.speed;
    } else {
        player.velocityX = 0;
    }

    // Jumping
    if (keys.up && !player.jumping) {
        player.velocityY = -15;
        player.jumping = true;
    }

    //Boost on shift
    if(keys.shift){
        if(keys.right){
            player.velocityX += 5;
        }else if(keys.left){
            player.velocityX += -5;
        }else {
            player.velocityX = 0;
        }
        
    }

    //Gravity
    player.velocityY += 0.55;
    player.velocityY = Math.min(player.velocityY, maxFallSpeed);
    

    
    player.x += player.velocityX;
    player.y += player.velocityY;

    //Collision
    platforms.forEach((platform) => {
        if (
            player.x + player.width > platform.x &&
            player.x < platform.x + platform.width &&
            player.y + player.height > platform.y &&
            player.y + player.height <= platform.y + 10
        ) {
            player.velocityY = 0;
            player.y = platform.y - player.height;
            player.jumping = false;
        }
    });

    
    if (player.x < 0) {
        player.x = 0;
    } else if (player.x + player.width > canvas.width) {
        player.x = canvas.width - player.width;
    }

    if (player.y < 0) {
        player.y = 0;
    } else if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }

    //Player and platforms
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0c4014"; //Player
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = "#000000"; //Platforms
    platforms.forEach((platform) => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });

    requestAnimationFrame(update);
}


document.addEventListener("keydown", (event) => {
    if (event.key === "d") {
        keys.right = true;
    } else if (event.key === "a") {
        keys.left = true;
    } else if (event.key === " " && !keys.spacePressed) { 
        keys.up = true;
        keys.spacePressed = true;
    }
    else if (event.key === "Shift" || event.key === "ShiftLeft"){
        keys.shift = true;
    }
    event.preventDefault(); 
});

document.addEventListener("keyup", (event) => {
    if (event.key === "d") {
        keys.right = false;
    } else if (event.key === "a") {
        keys.left = false;
    } else if (event.key === " ") {
        keys.up = false;
        keys.spacePressed = false;
    }
    else if (event.key === "Shift" || event.key === "ShiftLeft"){
        keys.shift = false;
    }
    event.preventDefault();
});

update();
