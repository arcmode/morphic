declare type Options = {
    _: string[];
    path?: string;
    p?: string;
};
declare type Runnable = {
    start: () => Promise<string>;
    stop: () => Promise<void>;
};
export declare type Head<M, I extends Runnable, C> = {
    defaultConfig: C;
    createInstance: (mods: M[], conf: C) => I;
};
export declare function start<M, I extends Runnable, C>(opts: Options): Promise<string>;
export {};
//# sourceMappingURL=start.d.ts.map