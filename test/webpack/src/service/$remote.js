export default {
    install(iCrush) {
        iCrush.prototype.$remote = {
            "get": (url, callback, errorback, conf) => {
                console.log('get', url, callback, errorback, conf);
            },
            "post": (url, param, callback, errorback, conf) => {
                console.log('post', url, param, callback, errorback, conf);
            },
        };
    },

};