import {GameObject} from "./game-object";

export class Hole implements GameObject{
    private readonly holeCenter: Phaser.Math.Vector2;

    constructor(holeCenter: Phaser.Math.Vector2, holeDimension: Phaser.Math.Vector2) {
        this.holeCenter = holeCenter;
    }

    create(scene: Phaser.Scene): void {
    }

    update(delta: number): void {
    }

    insertCharacter(scene: Phaser.Scene) {
        const map = scene.cache.json.get('characters');
        const sprite = scene.add.sprite(this.holeCenter.x, this.holeCenter.y, map.key);

        const animationName = map.objects[Math.floor((Math.random() * map.objects.length))] +
            '-' +
            map.animations[Math.floor((Math.random() * map.animations.length))];

        sprite.anims.load(animationName);
        sprite.anims.setRepeat(-1);
        sprite.anims.play(animationName);
    }
}
