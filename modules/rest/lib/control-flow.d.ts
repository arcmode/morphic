declare type Callbacks<Y, R, N> = {
    onError: (err: any) => void;
    onComplete: (result: R) => void;
    onNext: (item: Y) => N | Promise<N>;
};
export declare const walk: <Y, R, N>(iter: Generator<Y, R, N>, callbacks: Callbacks<Y, R, N>, prev?: N | undefined, error?: any) => void;
export {};
//# sourceMappingURL=control-flow.d.ts.map