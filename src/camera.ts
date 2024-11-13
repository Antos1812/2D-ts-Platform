import { Player } from "./player";
export class Camera{
    x: number;
    y: number;
    width: number;
    height: number;

    constructor(width:number, height:number){
        this.x= 0;
        this.y= 0;
        this.width=width;
        this.height=height;
    }
    follow(player:Player){
        this.x = player.x-this.width/2;
        this.y = player.y-this.height/2;
    }
}
export const camera=new Camera(window.innerWidth, 1000);

export function update(player:Player){
    camera.follow(player);
    console.log(`Camera Position: x=${camera.x}, y=${camera.y} `)
}