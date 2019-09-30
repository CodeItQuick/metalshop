export declare function createMockAccessToken({ claims, expiresMilliseconds }?: {
    claims: {};
    expiresMilliseconds?: number;
}): Promise<string>;
export declare function createMockRefreshToken({ expiresMilliseconds }?: {
    expiresMilliseconds?: number;
}): Promise<string>;
