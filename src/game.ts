/// <reference path="./phaser.d.ts"/>

import "phaser";
import {MainScene} from "./scenes/mainScene";

const config: GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    scene: MainScene,
};

// game class
export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.addEventListener("load", () => {
    new Game(config);
});
