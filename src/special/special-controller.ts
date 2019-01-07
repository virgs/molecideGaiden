import {EventManager, Events} from "../event-manager/event-manager";

export class SpecialController {
    private specialCounter: number;

    public constructor() {
        this.specialCounter = 0;
        EventManager.on(Events.STAR_HIT, () => this.incrementCounter());
        EventManager.on(Events.SPECIAL_BAR_HIT, () => this.useSpecial());
    }

    private incrementCounter(): void {
        ++this.specialCounter;

        if (this.specialCounter >= 4) {
            this.specialCounter = 4;
        }
        EventManager.emit(Events.STAR_COUNTER_UPDATE, this.specialCounter);
    }

    private useSpecial() {
        this.specialCounter = 0;
        EventManager.emit(Events.STAR_COUNTER_UPDATE, this.specialCounter);
    }
}
