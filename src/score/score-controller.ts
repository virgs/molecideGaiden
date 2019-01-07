import {EventManager, Events} from "../event-manager/event-manager";

export class ScoreController {

    //TODO extract these values to a configuration file
    private static readonly MAX_SCORE = 100;

    private static readonly HOLE_EMPTY_HIT_SCORE = -20;

    private static readonly MOLE_MISS_SCORE = -15;
    private static readonly MOLE_HIT_SCORE = 5;
    private static readonly STAR_MISS_SCORE = -50;
    private static readonly STAR_HIT_SCORE = 20;
    private static readonly RABBIT_MISS_SCORE = 0;
    private static readonly RABBIT_HIT_SCORE = -30;

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
        } else if (this.score <= 0){
            this.score = 0;
        }

        EventManager.emit(Events.SCORE_UPDATE, this.score / ScoreController.MAX_SCORE);
    }
}
