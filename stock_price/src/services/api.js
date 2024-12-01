import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.alphavantage.co/query',
    params: {
        function: 'SMA',
        apikey: 'SUK9VPIQXGZWKPS2',
        outputsize: 'full'
    }
})

export default api;