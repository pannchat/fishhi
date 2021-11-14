import axios from "axios";


const AUTH_TOKEN = '727e64e274231becb6848cbcb7a740c1a7bea0f2';
const BASE_URL = 'http://54.180.156.194:8000';

axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use(async (config) => {
  if (!config.headers['Authorization']) {
    config.headers['Authorization'] = `TOKEN ${AUTH_TOKEN}`;
  }
  return config;
});


export async function getSuppliesProduct() {
  const { data } = await axios.get('https://fishhi.kr/supplies_product.json');
  
  return data;
}

export async function getFishListApi() {
  const {data} = await axios.get('/fish');

  return data;
}