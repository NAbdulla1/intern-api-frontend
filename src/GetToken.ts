const getStoredToken = () => {
    return localStorage.getItem('token') ?? '';
}
export default getStoredToken;