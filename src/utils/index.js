export const getUserInfo = () => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        return null;
    }

    const userInfoRaw = token.split(".")[1];
    const userInfoProcessed = userInfoRaw.replace("-", "+").replace("_", "/");

    return JSON.parse(window.atob(userInfoProcessed));
}

export const getAuthToken = () => {
    return sessionStorage.getItem("jwt");
}