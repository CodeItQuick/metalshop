
import {makeAuthClients} from "authoritarian/dist/business/auth-api/auth-clients.js"
import {triggerLoginPopup} from "authoritarian/dist/business/account-popup/trigger-login-popup.js"
import {makeProfileMagistrateClient} from "authoritarian/dist/business/profile-magistrate/magistrate-client.js"
import {createTokenStorageClient} from "authoritarian/dist/business/token-storage/create-token-storage-client.js"

import {AuthoritarianStartupError} from "../../system/errors.js"
import {decodeAccessToken} from "../../system/decode-access-token.js"

import {
	AuthoritarianConfig,
	AuthoritarianOptions,
} from "../../interfaces.js"

const err = (message: string) => new AuthoritarianStartupError(message)

/**
 * Prepare all of the options for the start routine
 * - use the simpler config to decide how to start
 * - create microservice instances
 * - otherwise provide mock instances
 */
export async function initialize(config: AuthoritarianConfig):
 Promise<AuthoritarianOptions> {

	let progress: Partial<AuthoritarianOptions> = {}
	progress.decodeAccessToken = decodeAccessToken

	//
	// use mocks instead of real microservices
	//

	if (config.mock !== null) {
		const {prepareAllMocks} =
			await import("../../system/mocks.js")
		const {
			authDealer,
			tokenStorage,
			scheduleSentry,
			paywallGuardian,
			questionsBureau,
			liveshowGovernor,
			loginPopupRoutine,
			profileMagistrate,
		} = await prepareAllMocks({
			startAdmin: config.mock === "admin",
			startPremium: config.mock === "premium",
			startLoggedIn: config.mock === "loggedin"
				|| config.mock === "admin"
				|| config.mock === "premium",
		})
		progress = {
			...progress,
			authDealer,
			tokenStorage,
			scheduleSentry,
			paywallGuardian,
			questionsBureau,
			liveshowGovernor,
			loginPopupRoutine,
			profileMagistrate,
		}
	}

	//
	// use real microservices
	//

	const operations = []
	const queue = (func: () => Promise<any>) => operations.push(func())

	if (config.authServer) {
		queue(async() => {
			progress.authDealer = (await makeAuthClients({
				authServerOrigin: config.authServer
			})).authDealer
			progress.loginPopupRoutine = async() => triggerLoginPopup({
				authServerOrigin: config.authServer
			})
			progress.tokenStorage = await createTokenStorageClient({
				authServerOrigin: config.authServer
			})
		})
	}

	if (config.profileServer) {
		queue(async() => {
			progress.profileMagistrate = await makeProfileMagistrateClient({
				profileServerOrigin: config.profileServer
			})
		})
	}

	if (config.paywallServer) {
		queue(async() => {
			console.log("coming soon: paywall initialization")
			progress.paywallGuardian = null
		})
	}

	if (config.liveshowServer) {
		queue(async() => {
			console.log("coming soon: liveshow initialization")
			progress.liveshowGovernor = null
		})
	}

	try {
		await Promise.all(operations)
	}
	catch (error) {
		console.error(err(error.message))
	}

	//
	// return options
	//

	return {
		authDealer: progress.authDealer,
		tokenStorage: progress.tokenStorage,
		scheduleSentry: progress.scheduleSentry,
		paywallGuardian: progress.paywallGuardian,
		questionsBureau: progress.questionsBureau,
		liveshowGovernor: progress.liveshowGovernor,
		profileMagistrate: progress.profileMagistrate,

		decodeAccessToken: progress.decodeAccessToken,
		loginPopupRoutine: progress.loginPopupRoutine,
	}
}
