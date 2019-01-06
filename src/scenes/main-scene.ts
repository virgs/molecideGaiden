import {Garth} from "../game-objects/garth";
import {CharacterCreator} from "../game-objects/characters/character-creator";

export class MainScene extends Phaser.Scene {
    private background: Phaser.GameObjects.Sprite;
    private garth: Garth;
    private characterCreator: CharacterCreator;

    constructor() {
        super({
            key: "MainScene"
        });

        this.garth = new Garth();
        this.characterCreator = new CharacterCreator();
    }

    preload(): void {
        this.loadCharacters();
    }

    loadCharacters(): void {
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
                    repeat: map.animations[animationKey] ? -1: 0,
                    frameRate: 12
                });
                frameCounter += 8;
            });
        });

    }

    create(): void {
        this.background = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "background-castle");
        this.garth.create(this);
    }

    update(time: number, delta: number): void {
        this.characterCreator.update(delta);
        this.garth.update(delta);
    }
}
