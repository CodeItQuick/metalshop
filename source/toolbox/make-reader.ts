
import {pubsub} from "./pubsub.js"
import {Reader} from "../system/interfaces.js"

export function makeReader<S extends {} = {}>(state: S): Reader<S> {
	const {publish, subscribe} = pubsub<(state: S) => void>()
	return {
		subscribe,
		get state() {return Object.freeze({...state})},
		publishStateUpdate: () => publish(Object.freeze({...state})),
	}
}