import { atom } from "recoil";

export const navbarVisibleState = atom<boolean>({
  key: "navbarVisibleState",
  default: true,
});
