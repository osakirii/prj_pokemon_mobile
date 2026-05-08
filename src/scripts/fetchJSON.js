export async function fetchJSON(url) {
    const response = await fetch(url);
    if (!response.ok) {
        const err = new Error(`HTTP error ${response.status}`);
        err.status = response.status;
        throw err;
    }
    const jsonData = await response.json();
    return jsonData;
}