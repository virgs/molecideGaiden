export interface GameObject {
    update(delta: number): void;

    create(scene: Phaser.Scene): void;

    destroy(): void;
}
