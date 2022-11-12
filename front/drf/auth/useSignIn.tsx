import axios from 'axios';
import { useCallback, useEffect } from "react"
import { useRouter } from "next/router"
import { drfApiRoot } from "constants/drf"
import { useCookies } from 'react-cookie';
import { useRecoilValue } from "recoil"
import { todoListState } from "store/todo"
// import { GetJwtToken } from "./getJwtToken"
import GetJwtToken from "./getJwtToken"


type userInfo = {
  email: string
  // userName: string
  password: string
}


export const useSignIn = () => {
  const router = useRouter()
  // const getJWT = GetJwtToken()

  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accessToken, setAccessToken] = useCookies(['accessToken']);

  const signIn = useCallback(async (props: userInfo) => {
    const { email, password, } = props
    await axios
      .post(
        `${drfApiRoot}/auth/token/login/`,
        {
          email, password
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `JWT ${accessToken.accessToken}`
          }
        }
      ).then((res) => {
        setCookie("isLogin", true, { path: '/', maxAge: 10000000000000 })
        // getJWT({ email, password })
        // setCookie("isLogin", true,{path:'/',httpOnly:true})
        router.push("/user/")
        // console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        alert(err)
        console.error("failed to signIn by axios")
      })
  }, [])
  return signIn
}
export default useSignIn