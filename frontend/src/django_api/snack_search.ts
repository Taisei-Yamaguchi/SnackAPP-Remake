import { BACKEND_ENDPOINT } from "@/config/envs";

export const snackSearch = async (query: string, token: string | undefined | null) => {
    const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
    };

    // if token exist, add Authorization
    if (token) {
        headers["Authorization"] = `Token ${token}`;
    }

    const response = await fetch(`${BACKEND_ENDPOINT}/snack/search/${query}`, {
        method: 'GET',
        headers: headers,
    });

    return response.json();
}
