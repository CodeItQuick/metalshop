export const sortLikes = (a, b) => {
    const aLikes = a.likeInfo ? a.likeInfo.likes : 0;
    const bLikes = b.likeInfo ? b.likeInfo.likes : 0;
    return aLikes > bLikes ? -1 : 1;
};
export const sortQuestions = (me, questions) => [...questions]
    .sort(sortLikes)
    .sort((a, b) => (a.author.userId === me.userId) ? -1 : 1);
export function ascertainOwnership(question, me) {
    const admin = (me && me.admin);
    const mine = me && (me.userId === question.author.userId);
    return {
        mine,
        authority: admin || mine
    };
}
export const authorFromUserAndProfile = ({ user, profile }) => ({
    userId: user ? user.userId : null,
    admin: (user && user.claims.admin),
    avatar: profile ? profile.avatar : "",
    nickname: profile ? profile.nickname : "You",
    premium: user ? user.claims.premium : false,
});
//# sourceMappingURL=helpers.js.map