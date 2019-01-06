export enum Events {
    RABBIT_MISS,
    RABBIT_HIT,
    START_MISS,
    START_HIT,
    HOLE_EMPTY_HIT,
    MOLE_HIT,
    CREATE_CHARACTER,
    HOLE_AVAILABLE,
    MOLE_MISS
}

export class EventManager {
    private static singleton: EventManager = null;

    private eventEmitter;

    private constructor() {
        this.eventEmitter = new Phaser.Events.EventEmitter();
    }

    private static getEmitter() {
        if (!EventManager.singleton) {
            EventManager.singleton = new EventManager();
        }
        return EventManager.singleton.eventEmitter;
    }

    public static emit(event: Events, ...args: any[]): boolean {
        const emitter = this.getEmitter();
        return emitter.emit(Events[event], ...args);
    }

    public static on(event: Events, fn: Function, context?: any): Phaser.Events.EventEmitter {
        const emitter = this.getEmitter();
        return emitter.on(Events[event], fn, context);
    }
}
