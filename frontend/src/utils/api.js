import axios from 'axios';

const API=axios.create({
  baseURL:'http://localhost:5000/api',
});
//adding auth tokens to request
API.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token');
  if(token){
    config.headers.Authorization=`Bearer ${token}`
  }
  return config;
});

export default{
  getRandomMovie:()=> API.get('/movie'),

  getRandomBooks:()=> API.get('/books'),
  searchBooks:(query)=> API.get(`/books/search?q=${query}`),

  getSpaceImage:()=> API.get('/space'),

  login:(credentials)=>API.post('/auth/login',credentials),
  signup:(credentials)=>API.post('/auth/signup',credentials),
};