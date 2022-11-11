import axios from 'axios';
import { useCallback } from "react"
import { useRouter } from "next/router"
import { drfApiRoot } from "constants/drf"
// import { useCookies } from 'react-cookie';
// import { useSetRecoilState } from "recoil"
// import { GetJwtToken } from "./getJwtToken"


// import { useSetRecoilState } from "recoil"

type userInfo = {
  email: string
  password: string
  userName: string
}

export const useSignUp = () => {
  const router = useRouter()

  const signUp = useCallback(async (props: userInfo) => {
    const { email, password, userName } = props
    // alert(email)
    // alert(password)
    // alert(userName)
    await axios
      .post(
        `${drfApiRoot}/auth/users/`,
        {
          // email, password, userName,
          userName, email, password
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      ).then((res) => {
        router.push("/")
        alert('created account')
        console.log(res.data)
      })
      .catch((err) => {
        alert(err)
        console.error("failed to create New Account by axios")
      })
  }, [])
  return signUp
}
export default useSignUp