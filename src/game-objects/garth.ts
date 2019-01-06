import {GameObject} from "./game-object";
import {Hole} from "./hole";
import {EventManager, Events} from "../event-manager/event-manager";
import {Character} from "./characters/character";

export class Garth implements GameObject {
    private readonly holesPerLine = 4;
    private readonly holesPerColumn = 3;

    private sprite: Phaser.GameObjects.Sprite;
    private availableHoles: Hole[];
    private holes: Hole[];

    constructor() {
        this.availableHoles = [];
        this.holes = [];
    }

    create(scene: Phaser.Scene): void {
        this.sprite = scene.add.sprite(scene.game.renderer.width / 2, scene.game.renderer.height, "garth");
        this.sprite.setInteractive();
        this.sprite.on('pointerdown', (event) => this.holes.forEach(hole => hole.checkEmptyHit(event.position)));

        const width = this.sprite.getBottomRight().x - this.sprite.getTopLeft().x;
        const height = this.sprite.getBottomRight().y - this.sprite.getTopLeft().y;
        const garthDimension = new Phaser.Math.Vector2(width, height);
        const holeDimension = new Phaser.Math.Vector2(width / this.holesPerColumn, height / this.holesPerLine);
        this.sprite.setY(scene.game.renderer.height - garthDimension.y / 2);

        this.createHoles(holeDimension, scene);
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
                    const holeCenter = new Phaser.Math.Vector2(this.sprite.getTopLeft().x + holeDimension.x * (column + 0.5) + 5,
                        this.sprite.getTopLeft().y + holeDimension.y * (line + 0.5) - 30 + line * 10);
                    const hole = new Hole(holeCenter, holeDimension);
                    hole.create(scene);
                    this.availableHoles.push(hole);
                    this.holes.push(hole);
                }));
    }
}
