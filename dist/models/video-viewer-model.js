import { makeReader } from "../toolbox/pubsub.js";
import { UserMode } from "./user-model.js";
export var PrivilegeMode;
(function (PrivilegeMode) {
    PrivilegeMode[PrivilegeMode["LoggedOut"] = 0] = "LoggedOut";
    PrivilegeMode[PrivilegeMode["Unprivileged"] = 1] = "Unprivileged";
    PrivilegeMode[PrivilegeMode["Privileged"] = 2] = "Privileged";
})(PrivilegeMode || (PrivilegeMode = {}));
export function createVideoViewerModel({ user, vimeoGovernor }) {
    let getAuthContext;
    const prepareVideoModel = ({ videoName }) => {
        const state = {
            loading: false,
            vimeoId: null,
            errorMessage: null,
            validationMessage: null,
            mode: PrivilegeMode.LoggedOut,
        };
        const { reader, update } = makeReader(state);
        const videoModel = {
            reader,
            async updateVideo(vimeostring) {
                vimeostring = vimeostring.trim();
                state.loading = true;
                state.errorMessage = null;
                state.validationMessage = null;
                update();
                let vimeoId;
                {
                    const idParse = /^\d{5,}$/i.exec(vimeostring);
                    const linkParse = /vimeo\.com\/(\d{5,})/i.exec(vimeostring);
                    if (idParse) {
                        vimeoId = vimeostring;
                    }
                    else if (linkParse) {
                        vimeoId = linkParse[1];
                    }
                }
                if (vimeoId || vimeostring === "") {
                    const { accessToken } = await getAuthContext();
                    await vimeoGovernor.setVimeo({
                        accessToken,
                        videoName,
                        vimeoId
                    });
                    state.vimeoId = vimeoId;
                }
                else {
                    state.validationMessage = "invalid vimeo link or id";
                }
                state.loading = false;
                update();
            },
            async receiveUserUpdate({ mode, getAuthContext: getContext }) {
                getAuthContext = getContext;
                if (mode === UserMode.LoggedIn) {
                    state.loading = true;
                    state.vimeoId = null;
                    state.errorMessage = null;
                    state.validationMessage = null;
                    update();
                    const { user, accessToken } = await getAuthContext();
                    state.mode = user.claims.admin
                        ? PrivilegeMode.Privileged
                        : user.claims.premium
                            ? PrivilegeMode.Privileged
                            : PrivilegeMode.Unprivileged;
                    update();
                    const { vimeoId } = await vimeoGovernor.getVimeo({
                        accessToken,
                        videoName
                    });
                    state.vimeoId = vimeoId;
                    state.loading = false;
                }
                else if (mode === UserMode.Loading) {
                    state.mode = PrivilegeMode.LoggedOut;
                    state.loading = false;
                    state.vimeoId = null;
                    state.errorMessage = null;
                    state.validationMessage = null;
                }
                else {
                    state.mode = PrivilegeMode.LoggedOut;
                    state.loading = false;
                    state.vimeoId = null;
                    state.errorMessage = null;
                    state.validationMessage = null;
                }
                update();
            },
        };
        user.reader.subscribe(videoModel.receiveUserUpdate);
        videoModel.receiveUserUpdate(user.reader.state);
        return videoModel;
    };
    return { prepareVideoModel };
}
//# sourceMappingURL=video-viewer-model.js.map