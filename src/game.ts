/// <reference path="./phaser.d.ts"/>

import "phaser";
import {SplashScene} from "./scenes/splash-scene";
import {MainScene} from "./scenes/main-scene";
import {ScoreScene} from "./scenes/score-scene";

export const SCALE_RATIO = window.devicePixelRatio / 3;

//https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
const config: GameConfig = {
    width: 800, //window.innerWidth * window.devicePixelRatio,
    height: 600, //window.innerHeight * window.devicePixelRatio,
    type: Phaser.AUTO,
    parent: "game",
    scene: [SplashScene, ScoreScene, MainScene],
};

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);
    }
}

window.addEventListener("load", () => {
    new Game(config);
});
