import {Special} from "./special";
import {EventManager, Events} from "../event-manager/event-manager";

export class TimeIncreaserSpecial implements Special {
    public constructor() {
        EventManager.emit(Events.INCREASE_TIME);
    }

    destroy(): void {
    }

    isOver(): boolean {
        return true;
    }

    update(delta: number): void {
    }
}
