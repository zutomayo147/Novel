import { useCallback } from "react"
import { useRouter } from "next/router"
import axios from 'axios';
import { drfApiRoot } from 'constants/drf'

type userInfo = {
  email: string
  userName: string
  password: string
}

const useSignUp = () => {
  const router = useRouter()
  const signUp = useCallback(async (props: userInfo) => {
    const { email, password, userName } = props
    await axios
      .post(
        `${drfApiRoot}auth/users/`,
        {
          'email': email,
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
        router.push("/about")
        console.log(res.data)
      })
      .catch(err => {
        console.log(err)
        alert(err)
        console.error("failed to create New Account")
      })
      .catch((err) => {
        alert(err)
        console.error("failed to create New Account")
      })
  }, [])
  return signUp
}
export default useSignUp