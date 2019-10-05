"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isPromise = (obj) => {
    return typeof obj === 'object' && !!obj && 'then' in obj;
};
exports.walk = (iter, callbacks, prev = void 0, error) => {
    const { onNext, onComplete, onError } = callbacks;
    try {
        const item = error
            ? iter.throw(error)
            : typeof prev === 'undefined'
                ? iter.next()
                : iter.next(prev);
        if (item.done) {
            return onComplete(item.value);
        }
        else {
            const result = onNext(item.value);
            if (isPromise(result)) {
                result.then((value) => {
                    setImmediate(() => exports.walk(iter, callbacks, value));
                }).catch((err) => {
                    setImmediate(() => exports.walk(iter, callbacks, void 0, err));
                });
            }
            else {
                setImmediate(() => exports.walk(iter, callbacks, result));
            }
        }
    }
    catch (err) {
        onError(err);
    }
};
//# sourceMappingURL=control-flow.js.map