import { AccessToken, TokenStorageTopic, VimeoGovernorTopic, PaywallGuardianTopic, ProfileMagistrateTopic, RefreshToken } from "authoritarian/dist/interfaces.js";
import { Question, QuestionDraft, LoginPopupRoutine } from "../interfaces.js";
export interface MockTokens {
    accessToken: AccessToken;
    refreshToken: RefreshToken;
    adminAccessToken: AccessToken;
    premiumAccessToken: AccessToken;
}
export declare const getMockTokens: () => Promise<MockTokens>;
export declare const prepareAllMocks: ({ mockTokens, startAdmin, startPremium, startLoggedIn, }: {
    mockTokens: MockTokens;
    startAdmin: boolean;
    startPremium: boolean;
    startLoggedIn: boolean;
}) => {
    tokenStorage: TokenStorageTopic;
    vimeoGovernor: VimeoGovernorTopic;
    scheduleSentry: {
        _data: {
            [key: string]: number;
        };
        getEventTime(key: string): Promise<number>;
        setEventTime(key: string, time: number): Promise<void>;
    };
    questionsBureau: {
        _questions: Question[];
        fetchQuestions(o: {
            boardName: string;
        }): Promise<Question[]>;
        postQuestion({ question }: {
            boardName: string;
            question: QuestionDraft;
        }): Promise<Question>;
        deleteQuestion({ boardName, questionId }: {
            boardName: string;
            questionId: string;
        }): Promise<void>;
        likeQuestion({ like, boardName, questionId, accessToken }: {
            like: boolean;
            boardName: string;
            questionId: string;
            accessToken: string;
        }): Promise<number>;
    };
    paywallGuardian: PaywallGuardianTopic;
    loginPopupRoutine: LoginPopupRoutine;
    profileMagistrate: ProfileMagistrateTopic;
};
export declare const mockQuestions: Question[];
