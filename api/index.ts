import axios from "axios";
import { ISuppliesParams } from "../components/info/hooks/useGetSupplies";
import { getParamsString } from "../shared/funtion";
import { IFishListResponse } from "../shared/hooks/useContents";
import { IGetSuppliesProductResponse } from "../shared/hooks/useSuppliesProduct";
import { IAquaplant } from "../shared/interface";

const BASE_URL = "http://54.180.156.194:8000";
axios.defaults.baseURL = BASE_URL;

export async function getSuppliesProduct() {
  const { data } = await axios.get<IGetSuppliesProductResponse>("https://fishhi.kr/supplies_product.json");

  return data;
}

export async function getFishListApi() {
  const { data } = await axios.get<IFishListResponse>("/fish/");

  return data;
}

interface ILoginParam {
  email: string;
  password: string;
}

export async function postUserLogin(value: ILoginParam) {
  const { data } = await axios.post("/users/login/", value);
}

export async function getAquaplant() {
  const { data } = await axios.get<IAquaplant[]>("/aquaplant/");

  return data;
}

export async function getAquaplantDetail(id: string) {
  const { data } = await axios.get<IAquaplant>(`/aquaplant/${id}/`);
  return data;
}

export async function getSuppliesCalculate(param?: ISuppliesParams) {
  const { data } = await axios.get(`/supplies/calculate/${param ? `?${getParamsString(param)}` : ""}`);
  return data;
}

export async function getSupplies(param?: ISuppliesParams) {
  const { data } = await axios.get(`/supplies/${param ? `?${getParamsString(param)}` : ""}`);
  return data;
}
