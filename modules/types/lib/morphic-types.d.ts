export declare type JsonFn<M extends any, k extends keyof M> = (input: ArrayItem<Parameters<M[k]>>) => Promise<ThenArg<ReturnType<M[k]>>>;
export declare type ThenArg<T> = T extends Promise<infer U> ? U : T;
export declare type ArrayItem<T> = T extends Array<infer U> ? U : T;
export declare type AnyData = boolean | number | string | null | JsonArray | JsonMap;
export interface JsonMap {
    [key: string]: AnyData;
}
export interface JsonArray extends Array<AnyData> {
}
//# sourceMappingURL=morphic-types.d.ts.map