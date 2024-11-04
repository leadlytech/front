import { ZodObject, ZodRawShape, ZodUnion } from "zod";
import { EHttpMethods } from "./http.type";

export enum EResponseMessage {
    OK = "OK",
    UNAUTHORIZED = "UNAUTHORIZED",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    INVALID_DATA = "INVALID_DATA",
}

export interface IResponse<T = any> {
    success: boolean;
    statusCode: number;
    message: EResponseMessage | string;
    payload?: T;
}

export interface IAction<T extends ZodRawShape = any> {
    path: string;
    method: EHttpMethods;
    contentType?: string;
    schema?: ZodObject<T> | ZodUnion<any> | null;
    dispenseToken?: boolean;
}

export interface IApiActionConfig {
    data?: any;
    query?: { [key: string]: any };
    params?: { [key: string]: string };
    extraHeaders?: { [key: string]: string };
}
