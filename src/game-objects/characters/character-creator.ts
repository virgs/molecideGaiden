import {EventManager, Events} from "../../event-manager/event-manager";
import {CharacterFactory} from "./character-factory";

export class CharacterCreator {
    private static STAR_PROBABILITY = 0.075;
    private static RABBIT_PROBABILITY = 0.20;

    private static SIN_HEIGHT = 0.1 * 1000;
    private static CYCLE_WIDTH = 15 * 1000;

    private totalTime: number;
    private nextCreationTime: number;


    public constructor() {
        this.totalTime = 0;
        this.nextCreationTime = 2 * 1000;
    }

    public update(delta: number) {
        this.totalTime += delta;
        if (this.totalTime >= CharacterCreator.CYCLE_WIDTH) {
            this.totalTime -= CharacterCreator.CYCLE_WIDTH
        }

        this.nextCreationTime -= delta;

        if (this.nextCreationTime <= 0) {
            this.nextCreationTime = 0.05 * 1000 + Math.random() * 500;
            // this.nextCreationTime = Math.log(this.totalTime * 100 + 1000) -
            //                     Math.sin((this.totalTime - CharacterCreator.CYCLE_WIDTH) * Math.PI / CharacterCreator.CYCLE_WIDTH) * CharacterCreator.SIN_HEIGHT;
            const duration = 0.05 * 1000 + Math.random() * 750;
            this.createCharacter(duration);
        }

    }

    private static probability(probability: number) {
        return !!probability && Math.random() <= probability;
    };

    private createCharacter(duration: number): void {
        if (CharacterCreator.probability(CharacterCreator.STAR_PROBABILITY)) {
            EventManager.emit(Events.STAR_CREATED, CharacterFactory.createStar(duration));
        } else if (CharacterCreator.probability(CharacterCreator.RABBIT_PROBABILITY)) {
            EventManager.emit(Events.RABBIT_CREATED, CharacterFactory.createRabbit(duration));
        }
        EventManager.emit(Events.MOLE_CREATED, CharacterFactory.createMole(duration));
    }

    static increaseRabbitProbability() {
        CharacterCreator.RABBIT_PROBABILITY = 0.8;
    }

    static decreaseRabbitProbability() {
        CharacterCreator.RABBIT_PROBABILITY = 0.2;
    }

    destroy() {
        CharacterCreator.decreaseRabbitProbability();
    }
}
