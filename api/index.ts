import axios from "axios";

const BASE_URL = 'http://54.180.156.194:8000';
axios.defaults.baseURL = BASE_URL;


export async function getSuppliesProduct() {
  const { data } = await axios.get('https://fishhi.kr/supplies_product.json');
  
  return data;
}

export async function getFishListApi() {
  const { data } = await axios.get('/fish/');

  return data;
}

interface ILoginParam {
  email: string;
  password: string;
}

export async function postUserLogin(value: ILoginParam) {
  const { data } = await axios.post('/users/login/', value);
  console.log(data);
}