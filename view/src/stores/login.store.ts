import { writable } from "svelte/store";

function userLogin() {
    const { subscribe, update } = writable(false);
    return {
        subscribe,
        login: () => update(n => n = true),
        logout: () => update(n => n = false),
    };
}

export const user = userLogin();