import {Events} from "../../event-manager/event-manager";
import {CharacterPrototype} from "./character-prototype";

export class CharacterFactory {

    public static createMole(duration: number) {
        return new CharacterPrototype({name: 'mole', events: {hit: Events.MOLE_HIT, miss: Events.MOLE_MISS}}, duration);
    }

    public static createRabbit(duration: number) {
        return new CharacterPrototype({name: 'rabbit', events: {hit: Events.RABBIT_HIT, miss: Events.RABBIT_MISS}}, duration);
    }

    public static createStar(duration: number) {
        return new CharacterPrototype({name: 'star', events: {hit: Events.START_HIT, miss: Events.START_MISS}}, duration);
    }
}
