export class EventManager {
    private static singleton: EventManager = null;
    public static CREATE_CHARACTER: "CREATE_CHARACTER";

    private eventEmitter;

    private constructor() {
        this.eventEmitter = new Phaser.Events.EventEmitter();
    }

    public static getEmitter() {
        if (!EventManager.singleton) {
            EventManager.singleton = new EventManager();
        }
        return EventManager.singleton.eventEmitter;
    }
}
