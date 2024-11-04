"use server";

import {
    RequestCookie,
    ResponseCookie,
} from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export async function createCookie(
    key: string,
    value: string,
    options?: Partial<ResponseCookie>
): Promise<void> {
    const cookieStore = cookies();
    cookieStore.set(key, value, {
        httpOnly: true,
        ...options,
    });
}

export async function hasCookie(key: string): Promise<boolean> {
    const cookieStore = cookies();
    return cookieStore.has(key);
}

export async function getCookie(
    key: string
): Promise<RequestCookie | undefined> {
    const cookieStore = cookies();
    return cookieStore.get(key);
}

export async function removeCookie(key: string): Promise<void> {
    const cookieStore = cookies();
    cookieStore.delete(key);
}
