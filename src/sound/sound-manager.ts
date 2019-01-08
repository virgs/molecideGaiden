import {EventManager, Events} from "../event-manager/event-manager";

export class SoundManager {
    private soundsToPlayNextIteration: {};

    public constructor(scene: Phaser.Scene) {
        this.soundsToPlayNextIteration = {};
        this.addNewCharEvent(Events.CREATE_CHARACTER, 'charPop', scene);
    }

    public update(delta: number) {
        (Object.keys(this.soundsToPlayNextIteration) || []).forEach(key => this.soundsToPlayNextIteration[key].play());
        this.soundsToPlayNextIteration = {};
    }

    private addNewCharEvent(event: Events, name: string, scene: Phaser.Scene) {
        const audio = scene.sound.add(name, {loop: false});
        EventManager.on(event, () => this.soundsToPlayNextIteration[name] = audio);
    }
}
