import axios from 'axios';
import { useCallback } from "react"
import { useRouter } from "next/router"
import { drfApiRoot } from "constants/drf"
import { useCookies } from 'react-cookie';

// import { useSetRecoilState } from "recoil"

type userInfo = {
  // email: string
  userName: string
  password: string
}


export const useSignIn = () => {
  const router = useRouter()

  // TODO
  const [cookie, setCookie] = useCookies(['isLogin']);

  const signIn = useCallback(async (props: userInfo) => {
    // const { email, password, userName } = props
    const { password, userName } = props
    await axios
      .post(
        `${drfApiRoot}auth/token/login`,
        {
          // 'email': email,
          'password': password,
          'username': userName,
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
            // 'X-CSRFTOKEN': 'r6E3T8oqTuChTEGjCMakASZ6q430qlWS1GpZ0pr9lgX902WDt15i53NPThYLTBTv'
          }
        }
      ).then((res) => {
        // TODO
        setCookie("isLogin", true)
        // setCookie("isLogin", true,{path:'/',httpOnly:true})
        router.push("/user/")
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        alert(err)
        console.error("failed to signIn")
      })
      .catch((err) => {
        alert(err)
        console.error("failed to signIn")
      })
  }, [])
  return signIn
}
export default useSignIn