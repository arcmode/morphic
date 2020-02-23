export declare const defaultConfig: {
    PORT: string;
};
export declare const createInstance: (modules: [Record<string | number | symbol, import("@frameless/utils").JsonFn<any, string | number | symbol>>], conf: {
    PORT: string;
}) => {
    start: () => Promise<unknown>;
    stop: () => Promise<unknown>;
};
//# sourceMappingURL=server.d.ts.map