import {GameObject} from "./gameObject";
import {Hole} from "./hole";

export class Garth implements GameObject {
    private readonly holesPerLine = 4;
    private readonly holesPerColumn = 3;

    private sprite: Phaser.GameObjects.Sprite;
    // private holes: Hole[];

    constructor() {
        // this.holes = [];
    }

    create(scene: Phaser.Scene): void {
        this.sprite = scene.add.sprite(scene.game.renderer.width / 2, scene.game.renderer.height, "garth");

        const width = this.sprite.getBottomRight().x - this.sprite.getTopLeft().x;
        const height = this.sprite.getBottomRight().y - this.sprite.getTopLeft().y;
        const garthDimension = new Phaser.Math.Vector2(width, height);
        const holeDimension = new Phaser.Math.Vector2(width / this.holesPerColumn, height / this.holesPerLine);
        this.sprite.setY(scene.game.renderer.height - garthDimension.y / 2);

        [...Array(this.holesPerLine - 1)]
            .forEach((_, row) => [...Array(this.holesPerColumn)]
                .forEach((_, column) => {
                    const holeCenter = new Phaser.Math.Vector2(this.sprite.getTopLeft().x + holeDimension.x * (column + 0.5),
                        this.sprite.getTopLeft().y + holeDimension.y * (row + 0.5));
                    const hole = new Hole(holeCenter, holeDimension);
                    hole.create(scene);
                }));

    }

    update(delta: number): void {

    }

}
