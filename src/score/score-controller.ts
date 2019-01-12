import {EventManager, Events} from "../event-manager/event-manager";

export class ScoreController {

    //TODO extract these values to a configuration file
    private static readonly MAX_SCORE: number = 100;

    private static readonly HOLE_EMPTY_HIT_SCORE: number = -10;

    private static readonly MOLE_MISS_SCORE: number = -10;
    private static readonly MOLE_HIT_SCORE: number = 5;
    private static readonly STAR_MISS_SCORE: number = -20;
    private static readonly STAR_HIT_SCORE: number = 15;
    private static readonly RABBIT_MISS_SCORE: number = 1;
    private static readonly RABBIT_HIT_SCORE: number = -20;
    private static readonly SCORE_HEALED_PER_SECOND: number = 1;

    private score: number;

    public constructor() {
        this.score = ScoreController.MAX_SCORE;

        EventManager.on(Events.SCORE_FULL, () => this.updateScore(ScoreController.MAX_SCORE));
        EventManager.on(Events.HOLE_EMPTY_HIT, () => this.updateScore(ScoreController.HOLE_EMPTY_HIT_SCORE));
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
        } else if (this.score <= 0) {
            EventManager.emit(Events.SCORE_EMPTY);
            this.score = 0;
        }

        EventManager.emit(Events.SCORE_UPDATE, this.score / ScoreController.MAX_SCORE);
    }

    destroy() {

    }

    update(delta: number) {
        this.updateScore(delta * ScoreController.SCORE_HEALED_PER_SECOND * 0.001);
    }
}
