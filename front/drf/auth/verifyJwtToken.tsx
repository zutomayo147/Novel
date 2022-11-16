import axios from 'axios';
import { useCookies } from 'react-cookie';
import { drfApiRoot } from "constants/drf"
// import { useRouter } from "next/router"
import { useCallback } from "react"
import { useRouter } from "next/router"

const useVerifyJwtToken = async () => {
  const [accessToken, setAccessToken] = useCookies(['accessToken']);
  const router = useRouter()

  const verifyJWT = useCallback(async () => {
    await axios
      .post(
        `${drfApiRoot}/auth/jwt/verify/`,
        {
          accessToken
        },
        {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'application/json',
          }
        }
      ).then(res => {
        alert("Valid accessToken")
        // setCookie('accessToken', res.data.access, { path: '/' });
        // setCookie('refreshtoken', res.data.refresh, { path: '/', httpOnly: true });
      }).catch(err => {
        alert("Invalid accessToken")
        router.push("/signIn")
        // router.push("/signIn/")
      })
  }, [])
}
export default useVerifyJwtToken