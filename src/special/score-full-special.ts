import {Special} from "./special";
import {EventManager, Events} from "../event-manager/event-manager";

export class ScoreFullSpecial implements Special {
    public constructor() {
        EventManager.emit(Events.SCORE_FULL);
    }

    destroy(): void {
    }

    isOver(): boolean {
        return true;
    }

    update(delta: number): void {
    }

}
