export class ScoreScene extends Phaser.Scene {
    private lastScore: number;
    private maxScore: number;

    constructor() {
        super({
            key: "ScoreScene"
        });
    }

    public create(value: { totalTime: number }) {
        this.lastScore = value ? value.totalTime || 0 : 0;
        this.maxScore = Number(localStorage.getItem('maxScore'));
        if (this.lastScore > this.maxScore) {
            localStorage.setItem('maxScore', this.lastScore.toString());
            this.maxScore = this.lastScore;
        }
        const background = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "background-castle").setInteractive();

        const titleText = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height / 20,
            'scoreFont', `HIT   ANYWHERE   BEGIN`, 60, 2);
        titleText.setOrigin(0.5, 0);

        const scoreText = this.add.bitmapText(this.game.renderer.width / 2, this.game.renderer.height / 2,
            'scoreFont', `CURRENT SCORE: ${this.lastScore}\r\nMAX SCORE: ${this.maxScore}`, 60, 2);
        scoreText.setOrigin(0.5);

        const startMainScene = () => this.scene.start("MainScene");

        background.on('pointerdown', startMainScene);
    }

}
