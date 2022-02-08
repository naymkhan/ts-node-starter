import validator from "./validator";
import asyncHandler from "./asyncHandler";
import errorHandler from "./errorHandler";
import notFound from "./notFound";

export { default as validator } from "./validator";
export { default as asyncHandler } from "./asyncHandler";
export { default as errorHandler } from "./errorHandler";
export { default as notFound } from "./notFound";

const index = { validator, asyncHandler, errorHandler, notFound };
export default index;
