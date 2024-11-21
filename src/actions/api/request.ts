/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

// import { apiActions, TApiActionsKeys } from "./actions";
import {
    EResponseMessage,
    IAction,
    IApiActionConfig,
    IResponse,
} from "@/models";
import { replacePlaceholders } from "@/utils";
import { apiActions, TApiActionsKeys } from "./actions";

interface IMakeApiRequest extends RequestInit {
    headers: {
        origin?: string;
        authorization?: string;
        "Content-Type"?: string;
        Accept?: string;
    };
}

export async function makeApiRequest<T = any>(
    actionKey: TApiActionsKeys,
    // action: IAction,
    config?: IApiActionConfig
): Promise<IResponse<T>> {
    try {
        console.log("###################################################");
        console.log("###################################################");
        // console.log(actionKey);
        // console.log(action);
        console.log(config);
        console.log("###################################################");

        const action = { ...apiActions[actionKey] } as IAction;

        const requestInit: IMakeApiRequest = {
            method: action.method,
            cache: "no-cache",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json, text/plain, */*",
                origin: process.env.ORIGIN,
            },
        };

        if (!action.dispenseToken) {
            const cookieStore = cookies();
            const authCookie = cookieStore.get("auth");

            if (!authCookie) {
                return {
                    success: false,
                    statusCode: 403,
                    message: EResponseMessage.INVALID_CREDENTIALS,
                };
            }

            const token = JSON.parse(authCookie.value).token;
            requestInit.headers["authorization"] = `Bearer ${token}`;
        }

        const query = config?.query;
        let queryString = "";

        if (query) {
            const queryArray: string[] = [];

            Object.keys(query).forEach((key) => {
                if (![null, undefined].includes(query[key])) {
                    queryArray.push(`${key}=${query[key]}`);
                }
            });
            queryString = queryArray.join("&");
        }

        if (config?.params) {
            action.path = replacePlaceholders(action.path, config.params);
        }

        if (config?.data) {
            requestInit.body = JSON.stringify(config.data);
        }

        const path = queryString
            ? `${action.path}?${queryString}`
            : action.path;

        const url = `${process.env.API_URL}${path}`;

        console.log(url);
        console.log(requestInit);

        const res = await fetch(url, requestInit);

        console.log("###################################################");
        console.log(res);

        let json = null;

        try {
            json = await res.json();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err: any) {}

        console.log(json);

        let message = "error";
        switch (res.status) {
            case 200:
                message = "ok";
                break;
            case 401:
                message = "Não autorizado";
                break;
            case 500:
                message = "Erro interno";
                break;
        }

        return {
            success: res.ok,
            statusCode: json?.message || res.status,
            message,
            payload: json,
        };
    } catch (err: any) {
        let message = err.message;
        switch (message) {
            case "fetch failed":
                message = "Falha na conexão";
                break;
        }

        return {
            success: false,
            statusCode: 500,
            message,
        };
    }
}
