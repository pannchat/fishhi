import useSWR from "swr";
import { getAquaplant } from "../../api";

export default function useAquaPlant() {
  const {data, error} = useSWR('aquaplant', getAquaplant);

  return {
    data
  }
}