import {Special} from "./special";
import {EventManager, Events} from "../event-manager/event-manager";

export class IncreaseCreationTimeSpecial implements Special {
    public constructor() {
        EventManager.emit(Events.INCREASE_CREATION_TIME);
    }

    destroy(): void {
    }

    isOver(): boolean {
        return true;
    }

    update(delta: number): void {
    }
}
