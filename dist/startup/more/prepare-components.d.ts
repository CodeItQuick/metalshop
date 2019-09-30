import { MetalAvatar } from "../../components/metal-avatar.js";
import { MetalAccount } from "../../components/metal-account.js";
import { MetalProfile } from "../../components/metal-profile.js";
import { MetalPaywall } from "../../components/metal-paywall.js";
import { MetalLiveshow } from "../../components/metal-liveshow.js";
import { MetalMyAvatar } from "../../components/metal-my-avatar.js";
import { MetalAdminMode } from "../../components/metal-admin-mode.js";
import { MetalAdminOnly } from "../../components/metal-admin-only.js";
import { MetalCountdown } from "../../components/countdown/metal-countdown.js";
import { MetalQuestions } from "../../components/questions/metal-questions.js";
import { AuthoritarianOptions } from "../../interfaces.js";
export declare function prepareComponents({ tokenStorage, vimeoGovernor, scheduleSentry, paywallGuardian, questionsBureau, profileMagistrate, loginPopupRoutine, decodeAccessToken, }: AuthoritarianOptions): {
    components: {
        MetalAvatar: typeof MetalAvatar;
        MetalAccount: typeof MetalAccount;
        MetalPaywall: typeof MetalPaywall;
        MetalProfile: typeof MetalProfile;
        MetalLiveshow: typeof MetalLiveshow;
        MetalMyAvatar: typeof MetalMyAvatar;
        MetalAdminMode: typeof MetalAdminMode;
        MetalAdminOnly: typeof MetalAdminOnly;
        MetalCountdown: typeof MetalCountdown;
        MetalQuestions: typeof MetalQuestions;
    };
    start(): Promise<void>;
};
