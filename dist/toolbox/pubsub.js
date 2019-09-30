/**
 * create a pub/sub context
 */
export function pubsub() {
    let listeners = [];
    return {
        publish: (async (...args) => {
            const operations = listeners.map(listener => listener(...args));
            await Promise.all(operations);
        }),
        subscribe(func) {
            listeners.push(func);
            return () => {
                listeners = listeners.filter(listener => listener !== func);
            };
        }
    };
}
/**
 * create a separated group of publish and subscribe functions
 */
export function pubsubs(obj) {
    const publishers = {};
    const subscribers = {};
    for (const [key, original] of Object.entries(obj)) {
        publishers[key] = original.publish;
        subscribers[key] = original.subscribe;
    }
    return { publishers, subscribers };
}
/**
 * make a state reader
 */
export function makeReader(state) {
    const { publish, subscribe } = pubsub();
    return {
        reader: {
            subscribe,
            get state() { return Object.freeze({ ...state }); },
        },
        update: () => publish(Object.freeze({ ...state })),
    };
}
//# sourceMappingURL=pubsub.js.map