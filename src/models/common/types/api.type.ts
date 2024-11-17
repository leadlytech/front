/* eslint-disable @typescript-eslint/no-explicit-any */
import { ZodObject, ZodRawShape, ZodTypeAny, ZodUnion } from "zod";
import { EHttpMethods } from "./http.type";

export enum EResponseMessage {
    OK = "OK",
    UNAUTHORIZED = "UNAUTHORIZED",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
    INVALID_DATA = "INVALID_DATA",
}

export interface IApiResponse<T = any> {
    statusCode: number;
    message?: string;
    payload?: T;
}

export interface IResponse<T = any> {
    success: boolean;
    statusCode: number;
    message: EResponseMessage | string;
    payload?: IApiResponse<T>;
}

export interface IAction<T extends ZodRawShape = any> {
    path: string;
    method: EHttpMethods;
    contentType?: string;
    schema?: ZodObject<T> | ZodUnion<Readonly<[ZodTypeAny]>> | null;
    dispenseToken?: boolean;
}

export interface IApiActionConfig<T = any> {
    data?: T;
    query?: { [key: string]: T };
    params?: { [key: string]: string };
    extraHeaders?: { [key: string]: string };
}
