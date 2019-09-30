import { promises } from "fs";
export const prepareWriteToken = (dist) => async (name, token) => promises.writeFile(`${dist}/${name}`, token, "utf8");
//# sourceMappingURL=write-token.js.map