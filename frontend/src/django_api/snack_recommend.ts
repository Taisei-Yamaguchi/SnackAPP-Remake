import { BACKEND_ENDPOINT } from "@/config/envs";

export const snackRecommend = async (token: string | undefined | null) => {
    const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
    };

    // if token exist, add Authorization
    if (token) {
        headers["Authorization"] = `Token ${token}`;
    }

    const response = await fetch(`${BACKEND_ENDPOINT}/snack/recommend/`, {
        method: 'GET',
        headers: headers,
    });
    const data = await response.json();
    return data;
}
