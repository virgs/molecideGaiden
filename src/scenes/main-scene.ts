import {Garden} from "../game-objects/garden";
import {CharacterCreator} from "../game-objects/characters/character-creator";
import {ScoreController} from "../score/score-controller";
import {Hud} from "../game-objects/hud/hud";
import {SpecialController} from "../special/special-controller";

export class MainScene extends Phaser.Scene {
    private scoreController: ScoreController;
    private specialController: SpecialController;
    private background: Phaser.GameObjects.Sprite;
    private garden: Garden;
    private hud: Hud;
    private characterCreator: CharacterCreator;

    constructor() {
        super({
            key: "MainScene"
        });

        this.garden = new Garden();
        this.hud = new Hud();
        this.scoreController = new ScoreController();
        this.specialController = new SpecialController(this, this.garden);
        this.characterCreator = new CharacterCreator();
    }

    preload(): void {
        this.loadCharacters();
        this.loadSpecials();
    }

    create(): void {
        this.input.addPointer(3);
        // http://labs.phaser.io/edit.html?src=src\input\multitouch\two%20touch%20inputs.js


        this.background = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "background-castle");
        this.garden.create(this);
        this.hud.create(this);
    }

    update(time: number, delta: number): void {
        this.characterCreator.update(delta);
        this.garden.update(delta);
        this.hud.update(delta);
        this.specialController.update(delta);
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

    private loadSpecials() {
        this.anims.create({
            key: 'helicopter-killer',
            frames: this.anims.generateFrameNumbers('helicopter-killer', {
                start: 0,
                end: 1
            }),
            repeat: -1,
            frameRate: 12
        });
    }
}
