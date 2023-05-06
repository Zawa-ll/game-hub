import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params: {
        key: '44847939248943958153f8437ade29c4'
    }
})
