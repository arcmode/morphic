const isPromise = <T>(obj: unknown): obj is Promise<T> => {
    return typeof obj === 'object' && !!obj && 'then' in obj;
};

type Callbacks<Y, R, N> = {
    onError: (err: any) => void,
    onComplete: (result: R) => void,
    onNext: (item: Y) => N | Promise<N>
}

export const walk = <
    Y,
    R,
    N
>(
    iter: Generator<Y, R, N>,
    callbacks: Callbacks<Y, R, N>,
    prev: N | undefined = void 0,
    error?: any
) => {
    const { onNext, onComplete, onError } = callbacks;
    try {
        const item = error
            ? iter.throw(error)
            : typeof prev === 'undefined'
                ? iter.next()
                : iter.next(prev);

        if (item.done) {
            return onComplete(item.value);
        } else {
            const result = onNext(item.value);
            if (isPromise(result)) {
                result.then((value) => {
                    setImmediate(() => walk(iter, callbacks, value));
                }).catch((err) => {
                    setImmediate(() => walk(iter, callbacks, void 0, err));
                });
            } else {
                setImmediate(() => walk(iter, callbacks, result));
            }
        }
    } catch (err) {
        onError(err);
    }
};

// state management with generators

// state machine

function* myMachineFactory(initialState: 'on' | 'off' | 'stop' = 'off') {
    let state = initialState

    try {

        while (state !== 'stop') {
            const nextState: 'on' | 'off' | 'stop' = yield state
            console.log({ state, nextState })
            state = nextState
        }

        return state
    } catch (error) {
        return 'crashed'
    }
}

const machine = myMachineFactory('off');
const state = machine.next('on').value
