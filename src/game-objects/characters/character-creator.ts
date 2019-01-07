import {EventManager, Events} from "../../event-manager/event-manager";
import {CharacterFactory} from "./character-factory";

export class CharacterCreator {
    private static STAR_PROBABILITY = 0.075;
    private static RABBIT_PROBABILITY = 0.20;

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
            this.nextCreationTime = 0.5*1000;
            // this.nextCreationTime = Math.log(this.totalTime * 100 + 1000) -
            //                     Math.sin((this.totalTime - CharacterCreator.CYCLE_WIDTH) * Math.PI / CharacterCreator.CYCLE_WIDTH) * CharacterCreator.SIN_HEIGHT;
            EventManager.emit(Events.CREATE_CHARACTER, this.randomizeCharacter(1.5*1000));
        }

    }

    private static probability(probability: number) {
        return !!probability && Math.random() <= probability;
    };

    private randomizeCharacter(duration: number) {
        if (CharacterCreator.probability(CharacterCreator.STAR_PROBABILITY)) {
            return CharacterFactory.createStar(duration);
        } else if (CharacterCreator.probability(CharacterCreator.RABBIT_PROBABILITY)) {
            return CharacterFactory.createRabbit(duration);
        }
        return CharacterFactory.createMole(duration);
    }

    static increaseRabbitProbability() {
        CharacterCreator.RABBIT_PROBABILITY = 0.95;
    }

    static decreaseRabbitProbability() {
        CharacterCreator.RABBIT_PROBABILITY = 0.2;
    }
}
