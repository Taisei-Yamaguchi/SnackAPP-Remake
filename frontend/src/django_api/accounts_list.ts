export const accountsList = async () => {
    const response = await fetch(`http://localhost:8000/accounts/list/`, {
        method: 'GET',
        headers: {"Content-Type": "application/json"},
    });
    const data = await response.json();
    return data;
}
