import axios from 'axios';
import { useCallback } from "react"
import { useRouter } from "next/router"
import { drfApiRoot } from "constants/drf"
import { useCookies } from 'react-cookie';
// import { useSetRecoilState } from "recoil"
import { GetJwtToken } from "./getJwtToken"


// import { useSetRecoilState } from "recoil"

type userInfo = {
  email: string
  password: string
  userName: string
}

export const useSignUp = () => {
  const router = useRouter()
  const getJWT = GetJwtToken()
  const [accessToken, setAccessToken] = useCookies(['accessToken']);
  const [refreshToken, setRefreshToken] = useCookies(['refreshToken']);

  const signUp = useCallback(async (props: userInfo) => {
    const { email, password, userName } = props
    await axios
      .post(
        `${drfApiRoot}/auth/users/`,
        {
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
        getJWT({ email, password })
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