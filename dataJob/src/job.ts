import { populate } from "./config/Data";

require("./config/Database");

populate().then(() => console.log("acabou"));
