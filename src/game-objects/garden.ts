import {GameObject} from "./game-object";
import {Hole} from "./hole";
import {EventManager, Events} from "../event-manager/event-manager";
import {Character} from "./characters/character";

export class Garden implements GameObject {
    private readonly holesPerLine = 4;
    private readonly holesPerColumn = 3;

    private garden: Phaser.GameObjects.Sprite;
    private availableHoles: Hole[];
    private holes: Hole[];

    constructor() {
        this.availableHoles = [];
        this.holes = [];
    }

    create(scene: Phaser.Scene): void {
        this.garden = scene.add.sprite(scene.game.renderer.width / 2, scene.game.renderer.height, "garden");
        this.garden.setY(scene.game.renderer.height - this.garden.getBounds().y / 2 - 20);
        this.garden.setInteractive();
        this.garden.on('pointerdown', (event) => this.holes.forEach(hole => hole.checkEmptyHit(event.position)));

        const holeDimension = new Phaser.Math.Vector2(this.garden.getBounds().width / this.holesPerColumn, this.garden.getBounds().height / this.holesPerLine);

        this.createHoles(holeDimension, scene);
        this.createRoots(scene);
        this.registerEvents(scene);
    }


    update(delta: number): void {
        this.holes.forEach(hole => hole.update(delta));
    }

    private registerEvents(scene: Phaser.Scene) {
        EventManager.on(Events.CREATE_CHARACTER, (character: Character) => {
            if (this.availableHoles.length > 0) {
                character.create(scene);
                const randomIndex = Math.floor((Math.random() * this.availableHoles.length));
                this.availableHoles[randomIndex].insertCharacter(character);
                this.availableHoles.splice(randomIndex, 1)
            }
        });

        EventManager.on(Events.HOLE_AVAILABLE, (hole: Hole) => this.availableHoles.push(hole));
    }

    private createHoles(holeDimension, scene: Phaser.Scene) {
        [...Array(this.holesPerLine - 1)]
            .forEach((_, line) => [...Array(this.holesPerColumn)]
                .forEach((_, column) => {
                    const holeCenter = new Phaser.Math.Vector2(this.garden.getTopLeft().x + holeDimension.x * (column + 0.5) + 5,
                        this.garden.getTopLeft().y + holeDimension.y * (line + 0.5) - 30 + line * 10);
                    const hole = new Hole(holeCenter, holeDimension);
                    hole.create(scene);
                    this.availableHoles.push(hole);
                    this.holes.push(hole);
                }));
    }

    private createRoots(scene: Phaser.Scene) {
        const gardenBounds = this.garden.getBounds();
        const gardenCenter = this.garden.getCenter();
        [...Array(4)].forEach((_, index) => {
            const key = 'root-anim-' + index;
            scene.anims.create({
                key: key,
                frames: scene.anims.generateFrameNumbers('root', {
                    start: index * 4,
                    end: 3 + index * 4
                }),
                repeat: -1,
                frameRate: 12
            });

            const sprite = scene.add.sprite(gardenCenter.x - gardenBounds.width * (0.5 - Math.random()) * 0.9,
                                            gardenBounds.top +  gardenBounds.height * (1 - (1 - Math.random()) * 0.05), key);
            sprite.anims.load(key);
            sprite.anims.play(key);
        });
    }
}
