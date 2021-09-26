import axios from "axios";

export async function getSuppliesProduct() {
  const { data } = await axios.get('https://fishhi.kr/supplies_product.json');
  
  return data;
}