export interface Special {
    update(delta: number): void;

    isOver(): boolean;

    destroy(): void;
}
