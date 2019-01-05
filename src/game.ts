/// <reference path="./phaser.d.ts"/>

import "phaser";
import {SplashScene} from "./scenes/splash-scene";
import {MainScene} from "./scenes/main-scene";

const config: GameConfig = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "game",
    scene: [SplashScene, MainScene],
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.addEventListener("load", () => {
    new Game(config);
});
