import {GameObject} from "../game-object";
import {EventManager, Events} from "../../event-manager/event-manager";

export class MolesKilledHud implements GameObject {
    private totalScore: number;
    private text: Phaser.GameObjects.BitmapText;

    public constructor() {
        this.totalScore = 200;
    }

    create(scene: Phaser.Scene): void {
        this.totalScore = 0;
        EventManager.on(Events.LIFE_BAR_EMPTY, () => EventManager.emit(Events.GAME_OVER, this.totalScore));
        EventManager.on(Events.MOLE_HIT, () => ++this.totalScore);
        this.text = scene.add.bitmapText(scene.game.renderer.width * 0.925, scene.game.renderer.height * 0.125, 'scoreFont', this.totalScore.toString(), 70);
        const scaleRatio = scene.game.renderer.width * 0.04 / this.text.getTextBounds().global.width;
        this.text.setOrigin(1, 0.5);
        this.text.setScale(scaleRatio);
    }

    update(delta: number): void {
        // this.totalScore += delta;
        this.text.setText(this.totalScore.toString());
    }

    private stringifyTime() {
        const textTime = Math.trunc(this.totalScore * 0.01).toString();
        let integerPart = `${textTime.substring(0, textTime.length - 1)}`;
        while (integerPart.length < 3) {
            integerPart = '0' + integerPart;
        }
        return `${integerPart}.${textTime.substring(textTime.length - 1, textTime.length)}`;
    }

    destroy(): void {
        this.totalScore = 0;
    }
}
