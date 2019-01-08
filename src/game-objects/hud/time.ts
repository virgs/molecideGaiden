import {GameObject} from "../game-object";
import {EventManager, Events} from "../../event-manager/event-manager";

export class Time implements GameObject {
    private totalTime: number;
    private text: Phaser.GameObjects.BitmapText;

    public constructor() {
        this.totalTime = 0;
    }

    create(scene: Phaser.Scene): void {
        this.totalTime = 0;
        EventManager.on(Events.INCREASE_TIME, () => this.totalTime += 30 * 1000);
        EventManager.on(Events.SCORE_EMPTY, () => EventManager.emit(Events.GAME_OVER, this.stringifyTime()));
        // this.text = scene.add.bitmapText(scene.game.renderer.width * 0.83, scene.game.renderer.height / 30, 'scoreFont', this.totalTime.toString(), 45);
        this.text = scene.add.bitmapText(scene.game.renderer.width * 0.83, scene.game.renderer.height / 30, 'scoreFont', this.totalTime.toString(), 60);
    }

    update(delta: number): void {
        this.totalTime += delta;
        this.text.setText(this.stringifyTime());
    }

    private stringifyTime() {
        const textTime = Math.trunc(this.totalTime * 0.01).toString();
        let integerPart = `${textTime.substring(0, textTime.length - 1)}`;
        while (integerPart.length < 3) {
            integerPart = '0' + integerPart;
        }
        return `${integerPart}.${textTime.substring(textTime.length - 1, textTime.length)}`;
    }

    destroy(): void {
        this.totalTime = 0;
    }
}
