import { atom } from "recoil";

export const footerVisibleState = atom<boolean>({
  key: "footerVisibleState",
  default: true,
});
