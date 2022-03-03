import axios from "axios";
import { getParamsString } from "../shared/funtion";
import { IFishListResponse } from "../shared/hooks/useContents";
import { IGetSuppliesProductResponse } from "../shared/hooks/useSuppliesProduct";
import {
  IAquaplant,
  IAquaPlantRetriveData,
  IContentsParams,
  IFishRetriveData,
  ISuppliesItem,
  ISupplyRetriveData,
} from "../shared/interface";
const BASE_URL = "http://54.180.156.194:8000";
axios.defaults.baseURL = BASE_URL;

export async function getSuppliesProduct() {
  const { data } = await axios.get<IGetSuppliesProductResponse>("https://fishhi.kr/supplies_product.json");

  return data;
}

export async function getFishListApi(params?: IContentsParams) {
  const { data } = await axios.get<IFishListResponse>(`/fish/?${params ? getParamsString(params) : ""}`);

  return data;
}

export async function getFishRetriveApi(id: string) {
  const { data } = await axios.get<IFishRetriveData>(`/fish/${id}/`);
  return data;
}

interface ILoginParam {
  email: string;
  password: string;
}

export async function postUserLogin(value: ILoginParam) {
  const { data } = await axios.post("/users/login/", value);
}

export async function getAquaplantApi(params?: IContentsParams) {
  const { data } = await axios.get<IAquaplant[]>(`/aquaplant/?${params ? getParamsString(params) : ""}`);

  return data;
}

export async function getAquaplantRetriveApi(id: string) {
  const { data } = await axios.get<IAquaPlantRetriveData>(`/aquaplant/${id}/`);
  return data;
}

export async function getSuppliesCalculate(param?: IContentsParams) {
  const { data } = await axios.get(`/supplies/calculate/${param ? `?${getParamsString(param)}` : ""}`);
  return data;
}

export async function getSupplies(param?: IContentsParams) {
  const { data } = await axios.get<ISuppliesItem>(`/supplies/${param ? `?${getParamsString(param)}` : ""}`);
  return data;
}

export async function getSupplyRetriveApi(id: string) {
  const { data } = await axios.get<ISupplyRetriveData>(`/supplies/${id}/`);
  return data;
}
