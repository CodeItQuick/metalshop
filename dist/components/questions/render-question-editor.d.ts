import { QuestionAuthor, QuestionValidation } from "../../interfaces.js";
export declare function renderQuestionEditor({ expand, draftText, validation, handlePostClick, maxCharacterLimit, handleTextAreaChange, author, }: {
    expand: boolean;
    draftText: string;
    maxCharacterLimit: number;
    validation: QuestionValidation;
    handlePostClick: (event: MouseEvent) => void;
    handleTextAreaChange: (event: Event) => void;
    author?: QuestionAuthor;
}): import("lit-element").TemplateResult;
