import {EventManager, Events} from "../event-manager/event-manager";

export class ScoreController {
    private static readonly MAX_SCORE = 100;

    private static readonly MOLE_MISS_SCORE = -10;
    private static readonly MOLE_HIT_SCORE = 5;
    private static readonly STAR_MISS_SCORE = -10;
    private static readonly STAR_HIT_SCORE = 20;
    private static readonly RABBIT_MISS_SCORE = 0;
    private static readonly RABBIT_HIT_SCORE = -20;


    private score: number;

    public constructor() {
        this.score = ScoreController.MAX_SCORE;

        EventManager.on(Events.MOLE_MISS, () => this.updateScore(ScoreController.MOLE_MISS_SCORE));
        EventManager.on(Events.MOLE_HIT, () => this.updateScore(ScoreController.MOLE_HIT_SCORE));
        EventManager.on(Events.STAR_MISS, () => this.updateScore(ScoreController.STAR_MISS_SCORE));
        EventManager.on(Events.STAR_HIT, () => this.updateScore(ScoreController.STAR_HIT_SCORE));
        EventManager.on(Events.RABBIT_MISS, () => this.updateScore(ScoreController.RABBIT_MISS_SCORE));
        EventManager.on(Events.RABBIT_HIT, () => this.updateScore(ScoreController.RABBIT_HIT_SCORE));
    }


    private updateScore(score: number): void {
        this.score += score;
        if (this.score >= ScoreController.MAX_SCORE) {
            this.score = ScoreController.MAX_SCORE;
        }
        console.log(this.score);
    }
}
