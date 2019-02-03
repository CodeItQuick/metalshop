
import {autorun} from "mobx"

import {mocks} from "./auth-machinery/mocks"
import {consoleCurry} from "./toolbox/console-curry"
import {createAuthMachine} from "./top-level/create-auth-machine"
import {installAuthoritarianClient} from "./top-level/install-authoritarian-client"

const info = consoleCurry("main", console.info)
const debug = consoleCurry("main", console.debug)

demo().catch(error => console.error(error))

/**
 * Demonstration of authoritarian-client
 */
async function demo() {

	// create auth machine with mock functionality
	const authMachine = createAuthMachine({
		tokenApi: {
			async obtainAccessToken(...args) {
				debug(`obtainAccessToken`)
				return mocks.tokenApi.obtainAccessToken(...args)
			},
			async clearTokens(...args) {
				debug(`clearTokens`)
				return mocks.tokenApi.clearTokens(...args)
			}
		},
		loginApi: {
			async userLoginRoutine(...args) {
				debug(`userLoginRoutine`)
				return mocks.loginApi.userLoginRoutine(...args)
			}
		},
		decodeAccessToken: (...args) => {
			debug(`decodeAccessToken`)
			return mocks.decodeAccessToken(...args)
		}
	})

	// console log for whenever login/logout happens on the store
	autorun(() => authMachine.panelStore.accessData
		? info(`logged in as "${authMachine.panelStore.accessData.name}"`)
		: info(`logged out`)
	)

	// install the client machinery and panel ui
	await installAuthoritarianClient({
		element: document.querySelector(".auth-panel"),
		authMachine
	})

	// demo script is done
	console.log("🤖")
}
