"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updtInp = exports.createBlogInp = exports.SignInInp = exports.signUpInput = void 0;
const zod_1 = require("zod");
exports.signUpInput = zod_1.z.object({
    name: zod_1.z.string().optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6)
});
exports.SignInInp = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.createBlogInp = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
exports.updtInp = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    id: zod_1.z.string()
});
