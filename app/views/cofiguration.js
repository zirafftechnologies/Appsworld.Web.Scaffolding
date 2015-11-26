getUserInfo = function () {
    return JSON.parse(window.localStorage.getItem('TokenManager.token'));
}