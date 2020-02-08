// TODO: remove first type parameter
export type JsonFn<M extends any, k extends keyof M> = (input: ArrayItem<Parameters<M[k]>>) => Promise<ThenArg<ReturnType<M[k]>>>

// https://stackoverflow.com/a/49889856
export type ThenArg<T> = T extends Promise<infer U> ? U : T;

export type ArrayItem<T> = T extends Array<infer U> ? U : T;

// Based on JSON export type from https://github.com/Microsoft/TypeScript/issues/1897#issuecomment-338650717
export type AnyData =
    | boolean
    | number
    | string
    | null
    // | undefined
    // | void
    | JsonArray
    | JsonMap;
export interface JsonMap { [key: string]: AnyData; } // added undefined for convenience
export interface JsonArray extends Array<AnyData> { }
