import {Garth} from "../game-objects/garth";
import {CharacterCreator} from "../game-objects/characters/character-creator";
import {ScoreController} from "../score/score-controller";
import {Hud} from "../game-objects/hud/hud";

export class MainScene extends Phaser.Scene {
    private scoreController: ScoreController;
    private background: Phaser.GameObjects.Sprite;
    private garth: Garth;
    private hud: Hud;
    private characterCreator: CharacterCreator;

    constructor() {
        super({
            key: "MainScene"
        });

        this.garth = new Garth();
        this.hud = new Hud();
        this.scoreController = new ScoreController();
        this.characterCreator = new CharacterCreator();
    }

    preload(): void {
        this.loadCharacters();
        this.loadLife();
    }

    create(): void {
        this.input.addPointer(3);
        // http://labs.phaser.io/edit.html?src=src\input\multitouch\two%20touch%20inputs.js


        this.background = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "background-castle");
        this.garth.create(this);
        this.hud.create(this);
    }

    update(time: number, delta: number): void {
        this.characterCreator.update(delta);
        this.garth.update(delta);
        this.hud.update(delta);
    }

    private loadCharacters(): void {
        let frameCounter = 0;
        const map = this.cache.json.get('characters');
        Object.keys(map.animations).forEach((animationKey) => {
            map.objects.forEach((character) => {
                this.anims.create({
                    key: character + '-' + animationKey,
                    frames: this.anims.generateFrameNumbers(map.key, {
                        start: frameCounter,
                        end: frameCounter + 7
                    }),
                    repeat: map.animations[animationKey] ? -1 : 0,
                    frameRate: 12
                });
                frameCounter += 8;
            });
        });
    }

    private loadLife() {
        this.anims.create({
            key: 'life',
            frames: this.anims.generateFrameNumbers('life', {
                start: 0,
                end: 3
            }),
            repeat: -1,
            frameRate: 12
        });

    }
}
