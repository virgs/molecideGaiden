import {Garden} from "../game-objects/garden";
import {CharacterCreator} from "../game-objects/characters/character-creator";
import {ScoreController} from "../score/score-controller";
import {Hud} from "../game-objects/hud/hud";
import {SpecialController} from "../special/special-controller";
import {EventManager, Events} from "../event-manager/event-manager";
import {SoundManager} from "../sound/sound-manager";

export class MainScene extends Phaser.Scene {
    private static animationsLoaded: boolean = false;
    private garden: Garden;
    private scoreController: ScoreController;
    private soundManager: SoundManager;
    private specialController: SpecialController;
    private background: Phaser.GameObjects.Sprite;
    private hud: Hud;
    private characterCreator: CharacterCreator;

    constructor() {
        super({
            key: "MainScene"
        });
    }

    preload(): void {
        if (!MainScene.animationsLoaded) {
            this.loadRoots();
            this.loadLifeBar();
            this.loadStars();
            this.loadCharacters();
            this.loadSpecials();
        }
        MainScene.animationsLoaded = true;
    }

    create(): void {
        this.garden = new Garden();
        this.hud = new Hud();
        this.scoreController = new ScoreController();
        this.soundManager = new SoundManager(this);
        this.specialController = new SpecialController(this, this.garden);
        this.characterCreator = new CharacterCreator();
        // EventManager.on(Events.GAME_OVER, (totalTime: object) => {
        //     this.destroy();
        //     this.scene.start("ScoreScene", {totalTime})
        // });


        this.input.addPointer(3);
        // http://labs.phaser.io/edit.html?src=src\input\multitouch\two%20touch%20inputs.js


        this.background = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "background-castle");
        const scaleRatio = Math.max(window.innerWidth / this.background.getBounds().width, window.innerHeight / this.background.getBounds().height);
        this.background.setScale(scaleRatio, scaleRatio);


        this.garden.create(this);
        this.hud.create(this);
    }

    update(time: number, delta: number): void {
        this.characterCreator.update(delta);
        this.garden.update(delta);
        this.hud.update(delta);
        this.soundManager.update();
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

    private loadStars() {
        [...Array(5)].forEach((_, index) => {
            this.anims.create({
                key: 'star-raise-' + index,
                frames: this.anims.generateFrameNumbers('stars', {
                    start: index * 6,
                    end: 1 + index * 6
                }),
                repeat: 0,
                frameRate: 12
            });

            this.anims.create({
                key: 'star-' + index,
                frames: this.anims.generateFrameNumbers('stars', {
                    start: 2 + index * 6,
                    end: 5 + index * 6
                }),
                repeat: -1,
                frameRate: 12
            });

        });
    }

    private loadRoots() {
        [...Array(4)].forEach((_, index) => {
            const key = 'root-anim-' + index;
            this.anims.create({
                key: key,
                frames: this.anims.generateFrameNumbers('root', {
                    start: index * 4,
                    end: 3 + index * 4
                }),
                repeat: -1,
                frameRate: 12
            });
        });
    }

    private loadLifeBar() {
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

    private destroy() {
        EventManager.destroy();
        this.characterCreator.destroy();
        this.garden.destroy();
        this.hud.destroy();
        this.specialController.destroy();
        this.scoreController.destroy();

    }
}
