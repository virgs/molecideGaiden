import {EventManager, Events} from "../../event-manager/event-manager";
import {CharacterFactory} from "./character-factory";

export class CharacterCreator {
    private static SIN_HEIGHT = 0.1*1000;
    private static CYCLE_WIDTH = 15*1000;

    private totalTime: number;
    private nextCreationTime: number;


    public constructor() {
        this.totalTime = 0;
        this.nextCreationTime = 2*1000;
    }

    public update(delta: number) {
        this.totalTime += delta;
        if (this.totalTime >= CharacterCreator.CYCLE_WIDTH) {
            this.totalTime -= CharacterCreator.CYCLE_WIDTH
        }

        this.nextCreationTime -= delta;

        if (this.nextCreationTime <= 0) {
            this.nextCreationTime = 2*1000;
            // this.nextCreationTime = Math.log(this.totalTime * 100 + 1000) -
            //                     Math.sin((this.totalTime - CharacterCreator.CYCLE_WIDTH) * Math.PI / CharacterCreator.CYCLE_WIDTH) * CharacterCreator.SIN_HEIGHT;
            EventManager.emit(Events.CREATE_CHARACTER, CharacterFactory.createMole(2*1000));
            EventManager.emit(Events.CREATE_CHARACTER, CharacterFactory.createRabbit(2*1000));
            EventManager.emit(Events.CREATE_CHARACTER, CharacterFactory.createStar(2*1000));
        }

    }
}
