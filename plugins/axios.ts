import axios from 'axios';
import { defineNuxtPlugin } from 'nuxt/app';
export default defineNuxtPlugin(async () => {

  const api = axios.create({
    baseURL: "https://api.codecalistenia.com/api/",
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })


  // // Request interceptor
  // api.interceptors.request.use(
  //   (config) => {
  //     // Get token from localStorage
  //     const token = localStorage.getItem('accessToken'); // localStorage

  //     if (token) {
  //       config.headers['Authorization'] = `Bearer ${token}`;
  //     }

  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );


  return {
    provide: {
      axios: api
    }
  }

})