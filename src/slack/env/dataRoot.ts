import * as path from "path";

const dataRoot = process.env.DATA_ROOT ?? path.join("data");

export default dataRoot;
