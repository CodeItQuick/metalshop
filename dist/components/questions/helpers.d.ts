import { User, Profile } from "authoritarian/dist/interfaces.js";
import { Question, QuestionAuthor } from "../../interfaces.js";
export declare const sortLikes: (a: Question, b: Question) => 1 | -1;
export declare const sortQuestions: (me: QuestionAuthor, questions: Question[]) => Question[];
export declare function ascertainOwnership(question: Question, me: QuestionAuthor): {
    mine: boolean;
    authority: boolean;
};
export declare const authorFromUserAndProfile: ({ user, profile }: {
    user: User;
    profile: Profile;
}) => QuestionAuthor;
