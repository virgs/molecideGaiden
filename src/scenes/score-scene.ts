export class ScoreScene extends Phaser.Scene {
    private lastScore: number | string;
    private maxScore: number;

    constructor() {
        super({
            key: "ScoreScene"
        });
    }

    public create(value: { totalTime: number }) {
        const startMainScene = () => this.scene.start("MainScene");
        this.lastScore = value ? value.totalTime ||  '-' :  '-';
        this.maxScore = Number(localStorage.getItem('maxScore'));
        if (this.lastScore > this.maxScore) {
            localStorage.setItem('maxScore', this.lastScore.toString());
            this.maxScore = Number(this.lastScore);
        }
        this.addBackground(startMainScene);
        this.addTitle();
        this.addScoreBoard();
    }

    private addScoreBoard() {
        const scoreTitle = this.add.bitmapText(this.game.renderer.width * 0.05, this.game.renderer.height * 0.5,
            'scoreFont', `SCORE:\r\n\r\nMAX:`, 60, 0);
        scoreTitle.setTintFill(0xb6b600);

        const scoreText = this.add.bitmapText(this.game.renderer.width * 0.95, this.game.renderer.height * 0.5,
            'scoreFont', `${this.lastScore}\r\n\r\n${this.maxScore}`, 60, 2);
        scoreText.setOrigin(1, 0);
        scoreText.setTintFill(0xb6b600);
    }

    private addTitle() {
        const titleText = this.add.bitmapText(this.game.renderer.width * 0.035, this.game.renderer.height * 0.05,
            'scoreFont', `TERMINATE THE MOLES`, 52, 0);
        titleText.setTintFill(0xa60000);
        const titleScaleRatio = Math.min(window.innerWidth * 0.9 / titleText.getTextBounds().global.width, window.innerHeight * 0.2 / titleText.getTextBounds().global.height);
        titleText.setScale(titleScaleRatio, titleScaleRatio);
    }

    private addBackground(startMainScene) {
        const background = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 2, "background-castle").setInteractive();
        background.setAlpha(0.2);
        background.setBlendMode(Phaser.BlendModes.ADD);
        background.setTint(0xFFFFFF);
        background.on('pointerdown', startMainScene);
        const backgroundScaleRatio = Math.max(window.innerWidth / background.getBounds().width, window.innerHeight / background.getBounds().height);
        background.setScale(backgroundScaleRatio, backgroundScaleRatio);
    }
}
