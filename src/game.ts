/// <reference path="./phaser.d.ts"/>

import "phaser";
import {SplashScene} from "./scenes/splash-scene";
import {MainScene} from "./scenes/main-scene";
import {ScoreScene} from "./scenes/score-scene";

import { Plugins } from '@capacitor/core';

//https://www.joshmorony.com/how-to-scale-a-game-for-all-device-sizes-in-phaser/
const config: GameConfig = {
    width: window.innerWidth,
    height: window.innerHeight,
    type: Phaser.AUTO,
    parent: "game",
    scene: [SplashScene, ScoreScene, MainScene],
};

const { StatusBar, SplashScreen } = Plugins;

export class Game extends Phaser.Game {
    constructor(config: GameConfig) {
        super(config);

        StatusBar.hide();
        SplashScreen.hide();
    }
}

const resize = () => {
    const canvas = document.querySelector("#game") as any;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowRatio = windowWidth / windowHeight;
    const gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }

};

let game;

window.addEventListener("load", () => {
    game = new Game(config);
    resize();
    window.addEventListener("resize", resize, false);
});


window.addEventListener('resize', () => {
    // game.resize(window.innerWidth, window.innerHeight);
});


