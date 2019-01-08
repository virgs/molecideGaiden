import {GameObject} from "../game-object";
import {EventManager, Events} from "../../event-manager/event-manager";

export class ScoreHud implements GameObject {
    private totalScore: number;
    private text: Phaser.GameObjects.BitmapText;

    public constructor() {
        this.totalScore = 0;
    }

    create(scene: Phaser.Scene): void {
        this.totalScore = 0;
        EventManager.on(Events.MOLE_HIT, () => ++this.totalScore);
        EventManager.on(Events.SCORE_EMPTY, () => EventManager.emit(Events.GAME_OVER, this.totalScore));
        // this.text = scene.add.bitmapText(scene.game.renderer.width * 0.83, scene.game.renderer.height / 30, 'scoreFont', this.totalScore.toString(), 45);
        this.text = scene.add.bitmapText(scene.game.renderer.width * 0.80, scene.game.renderer.height / 30, 'scoreFont', this.totalScore.toString(), 60);
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
