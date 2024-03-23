import { BACKEND_ENDPOINT } from "@/config/envs";

export const accountsList = async () => {
    const response = await fetch(`${BACKEND_ENDPOINT}/accounts/list/`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    });
    const data = await response.json();
    return data;
}
