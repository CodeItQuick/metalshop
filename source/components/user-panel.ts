
import {bubblingEvent, Dispatcher} from "event-decorators"
import {LitElement, property, html, css} from "lit-element"

import {mockDecodeToken as decodeToken} from "../mocks.js"
import {
	UserLoginEvent,
	UserLogoutEvent
} from "../events.js"

import {
	AuthTokens,
	AccessToken,
	TokenStorageTopic,
	// decodeToken,
} from "authoritarian/dist/interfaces.js"

import {AuthContext} from "../interfaces.js"

export class UserPanel extends LitElement {
	@property({type: Object}) authContext: AuthContext = null
	@property({type: Object}) tokenStorage: TokenStorageTopic = null
	@property({type: Function}) accountPopupLogin: () => Promise<AuthTokens> = null

	@bubblingEvent(UserLoginEvent) dispatchUserLogin: Dispatcher<UserLoginEvent>
	@bubblingEvent(UserLogoutEvent) dispatchUserLogout: Dispatcher<UserLogoutEvent>

	async startup() {
		const accessToken = await this.tokenStorage.passiveCheck()
		this._decodeAuthContext(accessToken)
	}

	logout = async() => {
		this.tokenStorage.clearTokens()
		this.authContext = null
		this.dispatchUserLogout()
	}

	login = async() => {
		const authTokens = await this.accountPopupLogin()
		await this.tokenStorage.writeTokens(authTokens)
		this._decodeAuthContext(authTokens.accessToken)
	}

	private _decodeAuthContext(accessToken: AccessToken) {
		const authContext = this.authContext = {
			accessToken,
			user: decodeToken({token: accessToken})
		}
		this.dispatchUserLogin({detail: authContext})
	}

	static get styles() {
		return css``
	}

	render() {
		return html`
			${!this.authContext
				? html`<button class="login" @click=${this.login}>Login</button>`
				: html``}
			<slot></slot>
			${this.authContext
				? html`<button class="logout" @click=${this.logout}>Logout</button>`
				: html``}
		`
	}
}