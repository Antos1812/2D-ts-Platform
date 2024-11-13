"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camera = exports.Camera = void 0;
exports.update = update;
class Camera {
    constructor(width, height) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
    }
    follow(player) {
        this.x = player.x - this.width / 2;
        this.y = player.y - this.height / 2;
    }
}
exports.Camera = Camera;
exports.camera = new Camera(window.innerWidth, 1000);
function update(player) {
    exports.camera.follow(player);
    console.log(`Camera Position: x=${exports.camera.x}, y=${exports.camera.y} `);
}
