import { makeReader } from "../toolbox/pubsub.js";
import { UserMode } from "./user-model.js";
export function createScheduleModel({ user, scheduleSentry }) {
    let getAuthContext;
    function prepareCountdownModel({ key }) {
        const state = {
            admin: false,
            eventTime: null,
            validationMessage: "",
        };
        const { reader, update } = makeReader(state);
        const countdownModel = {
            reader,
            async refreshEventTime() {
                const time = await scheduleSentry.getEventTime(key);
                state.eventTime = time;
                update();
            },
            async setEventTime(time) {
                await scheduleSentry.setEventTime(key, time);
                state.eventTime = time;
                update();
            },
            async receiveUserUpdate({ mode }) {
                if (mode === UserMode.LoggedIn) {
                    const { user } = await getAuthContext();
                    state.admin = user.claims.admin;
                }
                else {
                    state.admin = false;
                }
                update();
            }
        };
        user.reader.subscribe(state => {
            getAuthContext = state.getAuthContext;
            countdownModel.receiveUserUpdate(state);
        });
        countdownModel.receiveUserUpdate(user.reader.state);
        return countdownModel;
    }
    return { prepareCountdownModel };
}
//# sourceMappingURL=schedule-model.js.map