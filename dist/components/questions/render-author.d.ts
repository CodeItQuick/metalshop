import { LikeInfo, QuestionAuthor } from "../../interfaces.js";
export declare function renderAuthor({ time, author, likeInfo, handleLikeClick, handleUnlikeClick, }: {
    time: number;
    author: QuestionAuthor;
    handleLikeClick: (event: MouseEvent) => void;
    handleUnlikeClick: (event: MouseEvent) => void;
    likeInfo?: LikeInfo;
}): import("lit-element").TemplateResult;
