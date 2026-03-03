const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export async function getWatchList(token) {

    const requestOptions = {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        },
    };

    const response = await fetch(`${BACKEND_URL}/moviesToWatch`, requestOptions);

    if (response.status !== 200) {
        throw new Error("Unable to fetch watchlist");
    }

    const data = await response.json();
    return data;
}


