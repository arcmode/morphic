export declare const defaultConfig: {
    PORT: string;
};
export declare const createInstance: (modules: import("@frameless/rest").RestMod<{
    [k: string]: string;
}, {
    [k: string]: string;
}, {
    [k: string]: string;
}, import("@frameless/utils").AnyData, string, {
    status: number;
    headers?: Record<string, string> | undefined;
    body?: string | number | boolean | import("@frameless/utils").JsonArray | import("@frameless/utils").JsonMap | null | undefined;
}, string>[], config: any) => {
    start: () => Promise<unknown>;
    stop: () => Promise<void>;
};
//# sourceMappingURL=server.d.ts.map