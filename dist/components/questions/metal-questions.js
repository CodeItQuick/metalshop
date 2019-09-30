var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, property, html, css } from "lit-element";
import { mixinModelSubscription } from "../../framework/mixin-model-subscription.js";
import { mixinLoadable, LoadableState } from "../../framework/mixin-loadable.js";
import { styles } from "./metal-questions-styles.js";
import { renderQuestion } from "./render-question.js";
import { renderQuestionEditor } from "./render-question-editor.js";
import { sortQuestions, authorFromUserAndProfile } from "./helpers.js";
const Component = mixinLoadable(mixinModelSubscription(LitElement));
export class MetalQuestions extends Component {
    constructor() {
        super(...arguments);
        this.draftText = "";
        this.minCharacterLimit = 10;
        this.maxCharacterLimit = 240;
        this.adminMode = false;
        this.loadingMessage = "loading questions board...";
        this.errorMessage = "questions board error";
        this._handleTextAreaChange = (event) => {
            const target = event.target;
            this.draftText = target.value;
        };
        this._warnUnauthenticatedUser = () => {
            const { user } = this.model.reader.state;
            let warned = false;
            if (!user) {
                alert("you must be logged in to complete that action");
                warned = true;
            }
            return warned;
        };
        this._handlePostClick = async (event) => {
            if (this._warnUnauthenticatedUser())
                return;
            const { ["board-name"]: boardName } = this;
            const { bureau } = this.model;
            const question = this._getQuestionDraft();
            await bureau.postQuestion({ boardName, question });
            this.draftText = "";
        };
        this._prepareHandleDeleteClick = (questionId) => async () => {
            if (this._warnUnauthenticatedUser())
                return;
            const { ["board-name"]: boardName } = this;
            const { bureau } = this.model;
            await bureau.deleteQuestion({ boardName, questionId });
        };
        this._prepareHandleLikeClick = ({ like, questionId }) => async (event) => {
            if (this._warnUnauthenticatedUser())
                return;
            const { ["board-name"]: boardName } = this;
            await this.model.bureau.likeQuestion({
                like,
                boardName,
                questionId,
            });
        };
    }
    static get styles() { return [super.styles || css ``, styles]; }
    firstUpdated() {
        this["initially-hidden"] = false;
        this._downloadQuestions();
    }
    updated(changedProperties) {
        if (changedProperties.has("board-name")) {
            this._downloadQuestions();
        }
    }
    async _downloadQuestions() {
        try {
            const { ["board-name"]: boardName } = this;
            this.loadableState = LoadableState.Loading;
            if (!boardName)
                throw new Error(`questions-board requires attribute [board-name]`);
            await this.model.bureau.fetchQuestions({ boardName });
            this.loadableState = LoadableState.Ready;
        }
        catch (error) {
            this.loadableState = LoadableState.Error;
            console.error(error);
        }
    }
    _getQuestionDraft() {
        const { draftText: content } = this;
        const { user, profile } = this.model.reader.state;
        const author = authorFromUserAndProfile({ user, profile });
        const time = Date.now();
        const valid = (author && content);
        return valid
            ? { time, author, content }
            : null;
    }
    _validatePost(author) {
        const { draftText, minCharacterLimit: min, maxCharacterLimit: max } = this;
        const { length } = draftText;
        const tooLittle = length < min;
        const tooBig = length > max;
        const { premium } = author;
        const { message, angry } = premium
            ? length > 0
                ? tooLittle
                    ? { message: "Not enough characters to post", angry: true }
                    : tooBig
                        ? { message: "Too many characters to post", angry: true }
                        : { message: "", angry: false }
                : { message: "Nothing to post", angry: false }
            : { message: "You must become premium to post", angry: false };
        const postable = !message;
        return { postable, message, angry };
    }
    _getBoard() {
        const { ["board-name"]: boardName } = this;
        const { boards } = this.model.reader.state;
        const board = boards[boardName];
        if (!board)
            throw new Error(`questions board "${boardName}" not found`);
        return board;
    }
    renderReady() {
        const { draftText, maxCharacterLimit, _handlePostClick: handlePostClick, _handleTextAreaChange: handleTextAreaChange, _prepareHandleLikeClick: prepareHandleLikeClick, _prepareHandleDeleteClick: prepareHandleDeleteClick, } = this;
        const { questions } = this._getBoard();
        const { user, profile } = this.model.reader.state;
        const me = authorFromUserAndProfile({ user, profile });
        const validation = this._validatePost(me);
        const expand = draftText.length > 0;
        return html `
			<metal-admin-only class="coolbuttonarea" block header>
				<button>Purge all questions</button>
			</metal-admin-only>
			<div>
				<slot name="post">
					<h2>Post your own question</h2>
				</slot>
				${renderQuestionEditor({
            expand,
            draftText,
            author: me,
            validation,
            handlePostClick,
            maxCharacterLimit,
            handleTextAreaChange
        })}
			</div>
			<div>
				<slot name="rate">
					<h2>Rate questions</h2>
				</slot>
				<ol class="questions">
					${sortQuestions(me, questions).map(question => html `
						<li>
							${renderQuestion({
            me,
            question,
            prepareHandleLikeClick,
            prepareHandleDeleteClick,
        })}
						</li>
					`)}
				</ol>
			</div>
		`;
    }
}
__decorate([
    property({ type: String, reflect: true })
], MetalQuestions.prototype, "board-name", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], MetalQuestions.prototype, "initially-hidden", void 0);
__decorate([
    property({ type: String })
], MetalQuestions.prototype, "draftText", void 0);
__decorate([
    property({ type: Number })
], MetalQuestions.prototype, "minCharacterLimit", void 0);
__decorate([
    property({ type: Number })
], MetalQuestions.prototype, "maxCharacterLimit", void 0);
__decorate([
    property({ type: Boolean })
], MetalQuestions.prototype, "adminMode", void 0);
//# sourceMappingURL=metal-questions.js.map