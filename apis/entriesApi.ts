import axios from 'axios';

const entriesApi= axios.create({
    baseURL:'/api',
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
})

export default entriesApi;