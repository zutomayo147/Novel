import { atom } from "recoil"
import { RecoilAtomKeys } from "./RecoilKeys"

export const univListState = atom({
  key: RecoilAtomKeys.UNIV_LIST_STATE,
  default: {
    name: "",
    address: "",
    area: "",
    school_color: "",
  },
})
