export const isAuthenticated = () => {
    if(getToken()){
        return true;
    }
    return false;
}

export const getToken = () => {
    return localStorage.getItem('token');
}