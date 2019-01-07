import {GameObject} from "../game-object";
import {EventManager, Events} from "../../event-manager/event-manager";

export class Time implements GameObject {
    private totalTime: number;
    private text: Phaser.GameObjects.Text;

    public constructor() {
        this.totalTime = 0;
        EventManager.on(Events.INCREASE_TIME, () => this.totalTime += 30*1000);
    }


    create(scene: Phaser.Scene): void {
        this.text = scene.add.text(scene.game.renderer.width - 120, scene.game.renderer.height / 30, this.totalTime.toString(), {
            fontFamily: 'Arial',
            fontSize: 48,
            // font: 'bold',
            align: 'right',
            color: '#E0C000',
            // style: {
            //     font: 'bold 25px Arial',
            //     fill: 'white',
            // wordWrap: {width: 300}
            // }
        });
        this.text.setShadowColor('#000000');

    }


    update(delta: number): void {
        this.totalTime += delta;
        const textTime = Math.trunc(this.totalTime * 0.01).toString();
        this.text.setText(`${textTime.substring(0, textTime.length - 1) || '0'}.${textTime.substring(textTime.length - 1, textTime.length)}`);
    }
}
