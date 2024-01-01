import axios from 'axios';
import Cookies from 'js-cookie';





export const Axios = axios.create({
  baseURL: 'http://216.219.83.182/Alexon_Management/public/api',
  headers: {
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${Cookies.get('token') && JSON.parse(Cookies.get('token'))['user']['token']}`
  }
});
console.log();



 export async function makeRequest(url, method, data) {
  try {
    const response = await Axios({
      method,
      url,
      data,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

// Example usage:
// const todo = await makeRequest('https://jsonplaceholder.typicode.com/todos/1', 'get');
// console.log(todo);