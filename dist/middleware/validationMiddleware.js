"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateData = void 0;
const zod_1 = require("zod");
// import { StatusCodes } from "http-status-codes";
function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res
                    //   .status(StatusCodes.BAD_REQUEST)
                    .status(403)
                    .json({ error: "Invalid data", details: errorMessages });
            }
            else {
                res
                    //   .status(StatusCodes.INTERNAL_SERVER_ERROR)
                    .status(500)
                    .json({ error: "Internal Server Error" });
            }
        }
    };
}
exports.validateData = validateData;
