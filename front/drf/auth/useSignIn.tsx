import axios from 'axios';
import { useCallback } from "react"
import { useRouter } from "next/router"
import { drfApiRoot } from "constants/drf"
import { useCookies } from 'react-cookie';
// import { useSetRecoilState } from "recoil"
import { useRecoilValue } from "recoil"
import { todoListState } from "store/todo"
// import { GetJwtToken } from "./getJwtToken"
import GetJwtToken from "./getJwtToken"


// import { useSetRecoilState } from "recoil"

type userInfo = {
  // email: string
  userName: string
  password: string
}


export const useSignIn = () => {
  const router = useRouter()
  const getJWT = GetJwtToken()
  // const todoList = useRecoilValue(todoListState);
  // console.log(todoList);

  // TODO
  // const [cookie, setCookie] = useCookies(['isLogin']);
  const [cookie, setCookie] = useCookies(['isLogin']);
  const [accsesToken, setAccessToken] = useCookies(['accsesToken']);

  const signIn = useCallback(async (props: userInfo) => {
    const { password, userName } = { ...props }
    console.log(props)
    await axios
      .post(
        `${drfApiRoot}/auth/token/login`,
        {
          // 'email': email,
          'password': password,
          'username': userName,
          // [...props]

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
        setCookie("isLogin", true, { path: '/', maxAge: 10000000000000 })
        getJWT({ password, userName })
        // setCookie("isLogin", true,{path:'/',httpOnly:true})
        router.push("/user/")
        // console.log(res.data)
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