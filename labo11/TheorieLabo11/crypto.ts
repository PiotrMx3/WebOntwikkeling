import crypto from "crypto";

const token = crypto.randomBytes(128).toString("hex");

console.log(token);
