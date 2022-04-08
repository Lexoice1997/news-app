import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'f54f9f9fbef5439fbe2a7c6d5b9addb5', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
